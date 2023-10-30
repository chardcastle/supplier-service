const express = require("express");
const app = express();
const request = require("supertest");

const supplierRoutes = require("./supplier.routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', supplierRoutes);

const mockUsers = [
    { id: 1, name: 'Mocked User 1' },
    { id: 2, name: 'Mocked User 2' },
];

jest.mock('./supplier.controller', () => {
    return {
        ...jest.requireActual('./supplier.controller'), // Use the actual implementation
        getSuppliers: (req, res) => mockUsers,
        createSupplier: () => true,
    };
});

describe('GET Suppliers', () => {
    it('should return mocked data', async() => {
        const { status, body } = await request(app)
            .get("/api/list")
            .set("Accept", "application/json")
            .expect('content-type', /json/);

        expect(body).toEqual(mockUsers);
        expect(status).toBe(200);
    });
});

describe("POST", () => {
    it ("POST /api/create", async () => {

        const newUser = {
            Name: 'Test User',
            SupplierId: 1,
            CreatedByUser: "Chris",
            Address: "Street",
        };
        const { status, response, body } = await request(app)
            .post("/api/create")
            .send(newUser);

        expect(status).toBe(201);
        expect(response).toEqual(newUser);
    });
});
