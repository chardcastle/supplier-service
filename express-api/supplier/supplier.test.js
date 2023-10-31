const express = require("express");
const debug = require("debug")("ctl");
const app = express();
const request = require("supertest");
const SupplierModel = require("./supplier.model");
const supplierRoutes = require("./supplier.routes");

const mockSuppliers = require("./__mocks__/mockSuppliers");
jest.mock('./supplier.model');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', supplierRoutes);

describe('GET Suppliers', () => {
    it('should return mocked data', async() => {

        const { status, body } = await request(app)
            .get("/api/list")
            .set("Accept", "application/json")
            .expect('content-type', /json/);

        expect(body).toEqual(mockSuppliers);
        expect(status).toBe(200);
    });
});

describe("POST", () => {
    it ("POST /api/create", async () => {
        const newUser = {
            Name: 'Test User',
            // SupplierId: 1,
            CreatedByUser: "Chris",
            Address: "Street",
        };
        const { Name: expectedName } = newUser;

        const { status, text } = await request(app)
            .post("/api/create")
            .send(newUser)
            .expect('Content-Type', /html/);

        expect(status).toBe(201);
        expect(text).toEqual(`Created supplier: ${expectedName}`);
    });
});

describe("PUT supplier/update/:id", () => {
    it("should complete successfully", async () => {
        const supplierAmends = {
            Name: 'Amended supplier name',
        };

        const [existingUser] = mockSuppliers;
        const { id } = existingUser;

        const { status } = await request(app)
            .put(`/api/update/${id}`)
            .send(supplierAmends);

        expect(status).toBe(204);
    });
});

describe("DELETE supplier/:id", () => {
    beforeAll(() => {
        jest.useFakeTimers("modern")
        jest.setSystemTime(new Date("2023-10-31"))
    })

    afterAll(() => {
        jest.useRealTimers()
    })

    it("should complete successfully", async () => {
        // noinspection JSCheckFunctionSignatures
        const findByIdAndUpdateSpy = jest.spyOn(SupplierModel, "findByIdAndUpdate");

        const entityId = 1
        const { status } = await request(app)
            .delete(`/api/view/${entityId}`);

        expect(findByIdAndUpdateSpy).toHaveBeenCalledWith(
            String(entityId),
            { DeletedOn: new Date('2023-10-31').getTime() },
            { new: true }
        );

        findByIdAndUpdateSpy.mockRestore();
        expect(status).toBe(202);
    });
});

