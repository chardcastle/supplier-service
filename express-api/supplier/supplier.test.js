import { jest } from "@jest/globals";
import express from "express";
const app = express();
import request from "supertest";
import SupplierModel from "./supplier.model";
import supplierRoutes from "./supplier.routes";
import { apiError, apiSuccess, normaliseItemsById } from "../helpers/apiResponses.js";
import mongoose from "mongoose";
import Debug from "debug";
const debug = Debug("clt");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/test-route", supplierRoutes);

const mongoUri = process.env.MONGO_URI;

beforeAll(async () => {
    mongoose.Promise = Promise;
    await mongoose.connect(mongoUri)
        .then(() => debug("connected"))
        .catch(e => debug(`Oh no, unable to connect to database, using ${mongoUri}! 🚨`, e));

    expect(mongoose.connection.readyState).toBe(1);
});

afterAll(async () => {
    await mongoose.connection.close();
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
        findSpy.mockResolvedValue([
            { id: 1, name: "Mocked supplier 1" },
            { id: 2, name: "Mocked supplier 2" },
        ]);

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

    it("should fail gracefully", async() => {
        findSpy.mockResolvedValue([]);

        const { status, body } = await request(app)
            .get("/test-route/list")
            .set("Accept", "application/json")
            .expect("content-type", /json/);

        expect(body).toEqual(apiSuccess(200, {}));
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
        findByIdSpy.mockResolvedValue({ id: 1, name: "Mocked supplier 1" });

        const { status, body } = await request(app)
            .get(`/test-route/view/1`)
            .set("Accept", "application/json")
            .expect("content-type", /json/);

        expect(body).toEqual(apiSuccess(200, { id: 1, name: "Mocked supplier 1" }));
        expect(status).toBe(200);
        expect(findByIdSpy).toHaveBeenCalledWith(String(1));
        expect(findByIdSpy).toHaveBeenCalledTimes(1);
    });

    it("should fail gracefully use apiError when not found", async () => {
        findByIdSpy.mockRejectedValue(new Error("Didn't find"));

        const headlessId = new mongoose.Types.ObjectId();
        const { status, body } = await request(app)
            .get(`/test-route/view/${headlessId}`)
            .set("Accept", "application/json")
            .expect("content-type", /json/);

        expect(body).toEqual(apiError(404, { message: `Didn't find with _id: ${headlessId}` }));
        expect(findByIdSpy).toHaveBeenCalledWith(String(headlessId));
        expect(findByIdSpy).toHaveBeenCalledTimes(1);
        expect(status).toBe(404);
    });
});

describe("POST /test-route/create", () => {
    it ("should complete successfully", async () => {
        const newSupplier = {
            Name: "Test person",
            SupplierId: 1,
            CreatedByUser: "Chris",
            Address: "Street",
        };
        const { Name: expectedName } = newSupplier;

        const { status, body: { data: { message } } } = await request(app)
            .post("/test-route/create")
            .send(newSupplier)
            .expect("Content-Type", /json/);

        expect(status).toBe(201);
        expect(message).toEqual(`Created supplier: ${expectedName}`);
    });

    it ("should fail gracefully", async () => {
        const incompletePayload = {
            Name: "Test User",
            SupplierId: 666,
            CreatedByUser: "Chris",
        };

        const { status, body: { data: { errors } } } = await request(app)
            .post("/test-route/create")
            .send(incompletePayload)
            .expect("Content-Type", /json/);

        expect(status).toBe(422);
        expect(errors).toEqual({
            Address: {
                field: "Address",
                id: "Address",
                message: "Address is missing"
            }
        });
    });
});

describe("PUT /test-route/update/:id", () => {
    let findByIdAndUpdateSpy;
    const supplierAmends = {
        Name: "Amended suppliers name",
    };

    beforeEach(() => {
        findByIdAndUpdateSpy = jest.spyOn(SupplierModel, "findByIdAndUpdate");
    });

    afterEach(() => {
        findByIdAndUpdateSpy.mockRestore();
    });

    it("should complete successfully", async () => {
        findByIdAndUpdateSpy.mockResolvedValue({ _id: 1 });

        const { status, body: { data: { message } } } = await request(app)
            .put("/test-route/update/1")
            .send(supplierAmends)
            .expect("Content-Type", /json/);

        expect(status).toBe(200);
        expect(findByIdAndUpdateSpy).toHaveBeenCalledTimes(1);
        expect(findByIdAndUpdateSpy).toHaveBeenCalledWith(String(1), supplierAmends);
        expect(message).toEqual("Updated supplier (id): 1");
    });

    it("should fail gracefully", async () => {
        findByIdAndUpdateSpy.mockRejectedValue({});

        const { status, body: { data: { message } } } = await request(app)
            .put("/test-route/update/1")
            .send(supplierAmends)
            .expect("Content-Type", /json/);

        expect(status).toBe(422);
        expect(findByIdAndUpdateSpy).toHaveBeenCalledTimes(1);
        expect(findByIdAndUpdateSpy).toHaveBeenCalledWith(String(1), supplierAmends);
        expect(message).toEqual("Unable to update supplier (id): 1");
    });
});

describe("DELETE suppliers/:id", () => {
    beforeAll(() => {
        jest.useFakeTimers();
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

        findByIdAndUpdateSpy.mockRestore();
        expect(status).toBe(202);
    });
});

