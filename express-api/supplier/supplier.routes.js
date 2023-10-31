const express = require("express");
const debug = require("debug")("ctl");
const router = express.Router();

const {
    getSuppliers,
    getSupplierById,
    createSupplier,
    updateSupplierById,
    destroyById,
} = require("./supplier.controller");

router.get("/list", async (req, res) => {
    const suppliers =  await getSuppliers();

    // TODO Return normalised json { 1: { id: 1 }, 2: { id: 2 } }
    res.status(200).json(suppliers);
});

router.get("/view/:id", async (req, res) => {
    const { id } = req.params;
    const supplier =  await getSupplierById(id);

    res.status(200).json(supplier);
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

router.delete("/view/:id", async (req, res) => {
    const { id } = req.params;
    await destroyById(id);

    const softlyDeletedHTTPResponseCode = 202;
    res.status(softlyDeletedHTTPResponseCode).end();
});

module.exports = router;
