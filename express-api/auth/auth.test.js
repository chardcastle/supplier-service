import { jest } from "@jest/globals";
import express from "express";
const app = express();
import request from "supertest";
import authRoutes from "./auth.routes.js";
import { apiError, apiSuccess, normaliseItemsById } from "../helpers/apiResponses.js";
import mongoose from "mongoose";
import Debug from "debug";
const debug = Debug("clt");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

    it("should complete login with valid submitted data to get a JWT token", async () => {
        const { status, body: { data: { token } } } = await request(app)
            .post("/test-route/login")
            .set("Accept", "application/json")
            .send({ username: "foo", password: "supersecure"})
            .expect("content-type", /json/);

        expect(status).toEqual(200);
        expect(token).toMatch(/Bearer (.*)/);
    });
});

describe("Authenticated routes", () => {

});
// it can grant authentication to a user
// it can deny authentication to a user


