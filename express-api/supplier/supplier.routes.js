import { Router } from "express";
import Debug from "debug";
import { apiSuccess, apiError, normaliseItemsById } from "../helpers/apiResponses.js";
import {
    getSuppliers,
    getSupplierById,
    createSupplier,
    updateSupplierById,
    destroyById,
} from "./supplier.controller.js";

const router = Router();
const debug = Debug("ctl");

router.get("/list", async (req, res) => {
    const suppliers = await getSuppliers();

    return res.status(200).json(apiSuccess(200, normaliseItemsById(suppliers)));
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
    return res.render("supplier-create");
});

router.post("/create",async (req, res) => {
    const supplierData = { ...req.body, CreatedOn: Date.now() };

    try {
        const { Name } = await createSupplier(supplierData);

        return res.status(201).json(apiSuccess(201, { message: `Created supplier: ${Name}` }));
    } catch (errors) {
        return res.status(422).json(apiError(422, {
            message: "Oops",
            errors: normaliseItemsById(errors)
        }));
    }
});

router.put("/update/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await updateSupplierById(id, req.body);

        return res.status(200).json(apiSuccess(200, { message: `Updated supplier (id): ${id}` }));
    } catch (errors) {
        return res.status(422).json(apiError(422, {
            message: `Unable to update supplier (id): ${id}`,
            errors: normaliseItemsById(errors)
        }));
    }
});

router.delete("/view/:id", async (req, res) => {
    const { id } = req.params;
    await destroyById(id);

    const softlyDeletedHTTPResponseCode = 202;
    return res.status(softlyDeletedHTTPResponseCode).end();
});

export default router;
