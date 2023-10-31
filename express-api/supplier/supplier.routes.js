const express = require("express");
const debug = require("debug")("ctl");
const router = express.Router();

const { getSuppliers, createSupplier, updateSupplierById, destroyById } = require("./supplier.controller");
const path = require("path");

router.get("/list", async (req, res) => {
    const suppliers =  await getSuppliers();

    res.json(suppliers);
});

router.get("/create", (req, res) => {
    res.render("supplier-create");
});

router.post("/create",async (req, res) => {
    if (req.body === undefined) {
        res.status(422).end();
    }

    const supplierData = { ...req.body, CreatedOn: Date.now() }
    const { Name } = supplierData;
    await createSupplier(supplierData);
    debug(`Returning "Created supplier: ${Name}"`);
    res.set(
        {'Content-Type': 'text/html'}
    ).status(201).end(`Created supplier: ${Name}`);
});

router.put("/update/:id",async (req, res) => {
    const { id } = req.params;

    if (req.body === undefined) {
        res.status(422).end();
    }

    const supplierData = { ...req.body, CreatedOn: Date.now() }
    const { Name } = supplierData;
    await updateSupplierById(id, supplierData);
    res.status(204).send(`Created supplier: ${Name}`);
});

router.get("/view/:id", async (req, res) => {
    const { id } = req.params;

    return fetchById()
});

router.delete("/view/:id", async (req, res) => {
    const { id } = req.params;
    await destroyById(id);

    const softlyDeletedHTTPResponseCode = 202;
    res.status(softlyDeletedHTTPResponseCode).end();
});

module.exports = router;
