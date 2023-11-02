import express from "express";
const app = express();
import { jest } from '@jest/globals';
import request from "supertest";
import SupplierModel from "./supplier.model";
import supplierRoutes from "./supplier.routes";

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

        expect(body).toEqual(mockSuppliers);
        expect(status).toBe(200);
    });
});

describe("GET /test-route/view/:id", () => {
    it("should complete successfully", async() => {
        const expectedSupplier = mockSuppliers[0];
        const { id } = expectedSupplier;
        const { status, body } = await request(app)
            .get(`/test-route/view/${id}`)
            .set("Accept", "application/json")
            .expect("content-type", /json/);

        expect(body).toEqual(expectedSupplier);
        expect(status).toBe(200);
    });
});

describe("POST /test-route/create", () => {
    it ("should complete successfully", async () => {
        const newUser = {
            Name: "Test User",
            // SupplierId: 1,
            CreatedByUser: "Chris",
            Address: "Street",
        };
        const { Name: expectedName } = newUser;

        const { status, text } = await request(app)
            .post("/test-route/create")
            .send(newUser)
            .expect("Content-Type", /html/);

        expect(status).toBe(201);
        expect(text).toEqual(`Created supplier: ${expectedName}`);
    });
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

