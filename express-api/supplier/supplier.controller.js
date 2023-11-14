import SupplierModel, { SupplierSchema } from "./supplier.model.js";
import mongoose from "mongoose";
import {apiError, apiSuccess, formattedValidationErrors, normaliseItemsById} from "../helpers/apiResponses.js";
import Debug from "debug";
const debug = Debug("ctl");

const getList = async (req, res) => {
    const suppliers = await SupplierModel.find({ DeletedOn: null });

    return res.status(200).json(apiSuccess(200, normaliseItemsById(suppliers)));
};

const getViewById = async (req, res) => {
    const { id } = req.params;

    debug("Searching for", id)
    try {
        const supplier = await mongoose.model("Supplier", SupplierSchema).findById(id);
        debug("success suppliers", supplier);

        return res.status(200).json(apiSuccess(200, supplier ));
    } catch (err) {
        debug("error", err.message);
        return res.status(404)
            .json(apiError(404, { message: `${err.message} with _id: ${id}`}));
    }
}

const getCreateForm = async (req, res) => {
    return res.render("suppliers-create");
}

const postCreate = async (req, res) => {
    const supplierData = { ...req.body, CreatedOn: Date.now() };

    try {
        const NewSupplier = mongoose.connection.model("Supplier", SupplierSchema);
        const supplier = new NewSupplier(supplierData);
        await supplier.save()

        const { Name } = supplier;
        return res.status(201).json(apiSuccess(201, { message: `Created supplier: ${Name}` }));
    } catch (errors) {
        return res.status(422).json(apiError(422, {
            message: "Unable to create suppliers",
            errors: normaliseItemsById(formattedValidationErrors(errors))
        }));
    }
}

const putUpdate = async (req, res) => {
    const { body, params: { id } } = req;

    try {
        const supplier = await SupplierModel.findByIdAndUpdate(id, body);
        if (!supplier) {
            debug("Supplier not found");
            return null;
        }
        debug("Updated suppliers with", { supplier, id });

        return res.status(200).json(apiSuccess(200, { message: `Updated supplier (id): ${id}` }));
    } catch (errors) {
        return res.status(422).json(apiError(422, {
            message: `Unable to update supplier (id): ${id}`,
            errors: normaliseItemsById(errors)
        }));
    }
}

const deleteEntityId = async (req, res) => {
    const { id } = req.params;

    await SupplierModel.findByIdAndUpdate(id, { DeletedOn: Date.now() });

    const softlyDeletedHTTPResponseCode = 202;
    return res.status(softlyDeletedHTTPResponseCode).end();
}

export { getList, getViewById, getCreateForm, postCreate, putUpdate, deleteEntityId };
