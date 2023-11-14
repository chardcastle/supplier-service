import { Router } from "express";
import Debug from "debug";
import { apiSuccess, apiError, normaliseItemsById } from "../helpers/apiResponses.js";
import {
    list,
    viewById,
    getCreateForm,
    createSupplier,
    updateSupplierById,
    destroyById,
} from "./supplier.controller.js";

const router = Router();
const debug = Debug("ctl");

router.get("/list", list);

router.get("/view/:id", viewById);

router.get("/create", getCreateForm);

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
