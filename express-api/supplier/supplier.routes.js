import express from "express";
import Debug from "debug";
const router = express.Router();

const debug = Debug("ctl");

import {
    getSuppliers,
    getSupplierById,
    createSupplier,
    updateSupplierById,
    destroyById,
} from "./supplier.controller.js";
import { apiSuccess, apiError, normaliseItemsById } from "../helpers/apiResponses.js";

router.get("/list", async (req, res) => {
    const suppliers =  await getSuppliers();

    res.status(200).json(apiSuccess(200, normaliseItemsById(suppliers)));
});

router.get("/view/:id", async (req, res) => {
    const { id } = req.params;

    return getSupplierById(id)
        .then((supplier) => {
            debug("success supplier", supplier);
            return res.status(200).json(apiSuccess(200, supplier ));
        })
        .catch(err => {
            debug("error", err.message);
            return res.status(404)
                .json(apiError(404, { message: `Unable to find supplier with id ${id}`}));
        });
});

router.get("/create", (req, res) => {
    res.render("supplier-create");
});

router.post("/create",async (req, res) => {
    if (req.body === undefined) {
        res.status(422).end();
    }

    const supplierData = { ...req.body, CreatedOn: Date.now() };
    const { Name } = supplierData;
    await createSupplier(supplierData);
    debug(`Returning "Created supplier: ${Name}"`);

    res.set(
        {"Content-Type": "text/html"}
    ).status(201).end(`Created supplier: ${Name}`);
});

router.put("/update/:id",async (req, res) => {
    const { id } = req.params;

    if (req.body === undefined) {
        res.status(422).end();
    }

    const supplierData = { ...req.body, CreatedOn: Date.now() };
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

export default router;
