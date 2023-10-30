const express = require("express");
const debug = require("debug")("ctl");
const router = express.Router();

const { getSuppliers, createSupplier } = require("./supplier.controller");
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
    res.status(201).send(`Created supplier: ${Name}`);
});

module.exports = router;
