import express from "express";
const app = express();
import { jest } from '@jest/globals';
import request from "supertest";
import SupplierModel from "./supplier.model";
import supplierRoutes from "./supplier.routes";
import { apiError, apiSuccess, normaliseItemsById } from "../helpers/apiResponses.js";

const mockSuppliers = require("./__mocks__/mockSuppliers");
jest.mock("./supplier.model");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/test-route", supplierRoutes);

describe("GET /test-route/list", () => {
    it("should complete successfully", async() => {

        const { status, body } = await request(app)
            .get("/test-route/list")
            .set("Accept", "application/json")
            .expect("content-type", /json/);

        expect(body).toEqual(apiSuccess(200, normaliseItemsById(mockSuppliers)));
        expect(status).toBe(200);
    });
});

describe("GET /test-route/view/:id", () => {
    it("should complete successfully", async() => {
        const expectedSupplier = mockSuppliers[0];
        const findByIdSpy = jest.spyOn(SupplierModel, "findById");

        const { id } = expectedSupplier;
        const { status, body } = await request(app)
            .get(`/test-route/view/${id}`)
            .set("Accept", "application/json")
            .expect("content-type", /json/);

        expect(body).toEqual(expectedSupplier);
        expect(status).toBe(200);
        expect(findByIdSpy).toHaveBeenCalledWith(String(id));
        expect(findByIdSpy).toHaveBeenCalledTimes(1);
        findByIdSpy.mockRestore();
    });

    it("should gracefully use apiError if not found", async () => {
        const mockedFindById = jest.spyOn(SupplierModel, "findById");
        mockedFindById.mockImplementation(() => null);
        const { status, body } = await request(app)
            .get("/test-route/view/999")
            .set("Accept", "application/json")
            .expect("content-type", /json/);

        expect(mockedFindById).toHaveBeenCalledWith(String(999));
        expect(mockedFindById).toHaveBeenCalledTimes(1);
        mockedFindById.mockRestore();

        expect(body).toEqual(apiError(404, { message: "Unable to find supplier with id 999" }));
        expect(status).toBe(404);
    });
});

describe("POST /test-route/create", () => {
    it ("should complete successfully", async () => {
        const newSupplier = {
            Name: "Test User",
            SupplierId: 1,
            CreatedByUser: "Chris",
            Address: "Street",
        };
        const { Name: expectedName } = newSupplier;

        const { status, text } = await request(app)
            .post("/test-route/create")
            .send(newSupplier)
            .expect("Content-Type", /html/);

        expect(status).toBe(201);
        expect(text).toEqual(`Created supplier: ${expectedName}`);
    });

    // it ("should gracefully fail", async () => {
    //     const newSupplier = {
    //         Name: "Test User",
    //     };
    //     const { Name: expectedName } = newSupplier;
    //
    //     const { status, text } = await request(app)
    //         .post("/test-route/create")
    //         .send(newSupplier)
    //         .expect("Content-Type", /html/);
    //
    //     expect(status).toBe(201);
    //     expect(text).toEqual(`Created supplier: ${expectedName}`);
    // });
});

describe("PUT /test-route/update/:id", () => {
    it("should complete successfully", async () => {
        const supplierAmends = {
            Name: "Amended supplier name",
        };

        const [existingUser] = mockSuppliers;
        const { id } = existingUser;

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
        const findByIdAndUpdateSpy = jest.spyOn(SupplierModel, "findByIdAndUpdate");

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

