import express from "express";
import request from "supertest";
import authRoutes from "./auth.routes.js";
import mongoose from "mongoose";
import Debug from "debug";
import passport from "passport";
import passportConfig from "../config/passport.js";

const app = express();
const debug = Debug("clt");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
passportConfig(passport);

app.use("/test-route", authRoutes);

beforeAll(async () => {
    mongoose.Promise = Promise;
    await mongoose.connect(process.env.MONGO_URI)
        .then(() => debug("connected"))
        .catch(e => debug(`Oh no, unable to connect to database, using ${process.env.MONGO_URI}! 🚨`, e));

    expect(mongoose.connection.readyState).toBe(1);
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("User authentication", () => {
    it("should gracefully fail when login data is not submitted", async () => {
        const { status, body:  { data: { errors } } } = await request(app)
            .post("/test-route/login")
            .set("Accept", "application/json")
            .send({})
            .expect("content-type", /json/);

        expect(status).toEqual(400);
        expect(errors).toEqual({
            username: "Username is required.",
            password: "Password is required.",
        });
    });

    it("should gracefully handle incorrect username submission", async () => {
        const { status, body:  { data: { message } } } = await request(app)
            .post("/test-route/login")
            .set("Accept", "application/json")
            .send({ username: "unknown", password: "wrong" })
            .expect("content-type", /json/);

        expect(status).toEqual(401);
        expect(message).toEqual("Incorrect username and or password combination");
    });

    it ("should complete login with valid submitted data to get a JWT token", async () => {
        const { status, body: { data: { authToken, refreshToken } } } = await request(app)
            .post("/test-route/login")
            .set("Accept", "application/json")
            .send({ username: "foo", password: "supersecure"})
            .expect("content-type", /json/);

        expect(status).toEqual(200);
        expect(authToken).toMatch(/Bearer (.*)/);
        expect(refreshToken).toMatch(/Bearer (.*)/);
    });
});

describe("Authenticated routes", () => {
    it("should grant access to public URL", async () => {
        const { status, body: { data: { message } } } = await request(app)
            .get("/test-route/public")
            .expect("content-type", /json/);

        expect(status).toEqual(200);
        expect(message).toEqual("Hello world!");
    });

    it("should deny access to private endpoint without a token", async () => {
        const { status, body: { data: { message } } } = await request(app)
            .get("/test-route/private")
            .expect("content-type", /json/);

        expect(status).toEqual(400);
        expect(message).toEqual("An authentication token was not found in your request");
    });

    it("should not accept any old string as auth token to private endpoint", async () => {
        const { status, body: { data: { message } } } = await request(app)
            .get("/test-route/private")
            .set('Authorization', Buffer.from("Not a real token").toString('base64'))
            .expect("content-type", /json/);

        expect(status).toEqual(401);
        expect(message).toEqual("Authentication failed");
    });

    it("should grant access to private endpoint", async () => {
        const { body: { data: { authToken } } } = await request(app)
            .post("/test-route/login")
            .send({ username: "foo", password: "supersecure"})

        const { status, body: { data: { message } } } = await request(app)
            .get("/test-route/private")
            .set('Authorization', `${authToken}`);

        expect(message).toEqual("This is a private welcome message from an authenticated request");
        expect(status).toEqual(200);
    });
});
