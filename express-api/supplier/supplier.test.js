import { jest } from "@jest/globals";
import { MongoClient } from "mongodb";
import express from "express";
const app = express();
import request from "supertest";
import SupplierModel from "./supplier.model";
import supplierRoutes from "./supplier.routes";
import { apiError, apiSuccess, normaliseItemsById } from "../helpers/apiResponses.js";
import mongoose from "mongoose";
import Debug from "debug";


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/test-route", supplierRoutes);

let connection;
let db;
// const client = new MongoClient(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGO_URI);
    db = await connection.db();
});

afterAll(async () => {
    await connection.close();
});

describe("GET /test-route/list", () => {
    let findSpy;

    beforeEach(() => {
        findSpy = jest.spyOn(SupplierModel, "find");
    });

    afterEach(() => {
        findSpy.mockRestore();
    });

    it("should complete successfully", async() => {
        findSpy.mockImplementation(() => ([
            { id: 1, name: "Mocked supplier 1" },
            { id: 2, name: "Mocked supplier 2" },
        ]));

        const { status, body } = await request(app)
            .get("/test-route/list")
            .set("Accept", "application/json")
            .expect("content-type", /json/);

        expect(body).toEqual(
            apiSuccess(
                200,
                normaliseItemsById([
                    { id: 1, name: "Mocked supplier 1" },
                    { id: 2, name: "Mocked supplier 2" },
                ])
            )
        );
        expect(status).toBe(200);
        expect(findSpy).toHaveBeenCalledTimes(1);
    });
});

describe("GET /test-route/view/:id", () => {
    let findByIdSpy;

    beforeEach(() => {
        findByIdSpy = jest.spyOn(SupplierModel, "findById");
    });

    afterEach(() => {
        findByIdSpy.mockRestore();
    });

    it("should complete successfully", async() => {
        findByIdSpy.mockImplementation(() => ({ id: 1, name: "Mocked supplier 1" }));

        const { status, body } = await request(app)
            .get(`/test-route/view/1`)
            .set("Accept", "application/json")
            .expect("content-type", /json/);

        expect(body).toEqual(apiSuccess(200, { id: 1, name: "Mocked supplier 1" }));
        expect(status).toBe(200);
        expect(findByIdSpy).toHaveBeenCalledWith(String(1));
        expect(findByIdSpy).toHaveBeenCalledTimes(1);
    });

    it("should gracefully use apiError if not found", async () => {
        findByIdSpy.mockImplementation(() => null);

        const { status, body } = await request(app)
            .get("/test-route/view/999")
            .set("Accept", "application/json")
            .expect("content-type", /json/);

        expect(findByIdSpy).toHaveBeenCalledWith(String(999));
        expect(findByIdSpy).toHaveBeenCalledTimes(1);

        expect(body).toEqual(apiError(404, { message: "Unable to find supplier with id 999" }));
        expect(status).toBe(404);
    });
});

describe("POST /test-route/create", () => {
    let createSpy;

    beforeEach(() => {
        createSpy = jest.spyOn(SupplierModel, "create");
    });

    afterEach(() => {
        createSpy.mockRestore();
    });

    it ("should complete successfully", async () => {
        // expect(connection.db.readyState).toBe(1);

        const newSupplier = {
            Name: "Test person",
            SupplierId: 1,
            CreatedByUser: "Chris",
            Address: "Street",
        };
        const { Name: expectedName } = newSupplier;

        // const preSaveMock = jest.fn(function (next) {
        //     // Mock the pre-save logic here
        //     // For example, you can just call next() to simulate successful save
        //     // next();
        //     next();
        // });
        //
        // // Replace the original pre middleware with the mock function
        // jest.spyOn(SupplierModel.schema, 'pre').mockImplementationOnce(function (event, middleware) {
        //     if (event === 'save') {
        //         // Call the mock function for the 'save' event
        //         middleware.call(this, preSaveMock);
        //     }
        // });


        const { status, body: { data: { message } } } = await request(app)
            .post("/test-route/create")
            .send(newSupplier)
            .expect("Content-Type", /json/);

        expect(message).toEqual(`Created supplier: ${expectedName}`);
        expect(status).toBe(201);
    });

    it ("should gracefully fail", async () => {
        // expect(db.readyState).toBe(1);

        const incompletePayload = {
            Name: "Test User",
            SupplierId: 666,
            CreatedByUser: "Chris",
        };

        const { status, body: { data: { errors } } } = await request(app)
            .post("/test-route/create")
            .send(incompletePayload)
            .expect("Content-Type", /json/);

        expect(errors).toEqual({
            Address: {
                field: "Address",
                id: "Address",
                message: "Address is missing"
            }
        });
        expect(status).toBe(422);
    });
});

describe("PUT /test-route/update/:id", () => {
    it("should complete successfully", async () => {
        const findByIdAndUpdateSpy = jest.spyOn(SupplierModel, "findByIdAndUpdate")
            .mockImplementation(() => ({ _id: 1 }));

        const supplierAmends = {
            Name: "Amended supplier name",
        };

        const { id } = 1;
        const { status } = await request(app)
            .put(`/test-route/update/${id}`)
            .send(supplierAmends);

        expect(status).toBe(204);
    });
});

describe("DELETE supplier/:id", () => {
    beforeAll(() => {
        jest.useFakeTimers("modern");
        jest.setSystemTime(new Date("2023-10-31"));
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it("should complete successfully", async () => {
        // noinspection JSCheckFunctionSignatures
        const findByIdAndUpdateSpy = jest.spyOn(SupplierModel, "findByIdAndUpdate")
            .mockImplementation(() => ({ _id: 1 }));

        const entityId = 1;
        const { status } = await request(app)
            .delete(`/test-route/view/${entityId}`);

        expect(findByIdAndUpdateSpy).toHaveBeenCalledWith(
            String(entityId),
            { DeletedOn: new Date("2023-10-31").getTime() }
        );

        // findByIdAndUpdateSpy.mockRestore();
        expect(status).toBe(202);
    });
});

