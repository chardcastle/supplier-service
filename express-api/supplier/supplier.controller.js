import SupplierModel, { SupplierSchema } from "./supplier.model.js";
import mongoose from "mongoose";
import {apiError, apiSuccess, formattedValidationErrors, normaliseItemsById} from "../helpers/apiResponses.js";
import Debug from "debug";
const debug = Debug("ctl");

const list = async (req, res) => {
    const suppliers = await SupplierModel.find({ DeletedOn: null });

    return res.status(200).json(apiSuccess(200, normaliseItemsById(suppliers)));
};

const viewById = async (req, res) => {
    const { id } = req.params;

    debug("Searching for", id)
    try {
        const supplier = await mongoose.model("Supplier", SupplierSchema).findById(id);
        debug("success supplier", supplier);

        return res.status(200).json(apiSuccess(200, supplier ));
    } catch (err) {
        debug("error", err.message);
        return res.status(404)
            .json(apiError(404, { message: `${err.message} with _id: ${id}`}));
    }
}

const getCreateForm = async (req, res) => {
    return res.render("supplier-create");
}

const createSupplier = async(data) => {
    const NewSupplier = mongoose.connection.model("Supplier", SupplierSchema);

    try {
        const supplier = new NewSupplier(data);
        await supplier.save();

        return data;
    } catch (error) {
        return Promise.reject(formattedValidationErrors(error));
    }
};

const updateSupplierById = async(id, data) => {
    try {
        const supplier = await SupplierModel.findByIdAndUpdate(id, data);
        debug("Updated supplier with", { supplier, id });

        if (!supplier) {
            debug("Supplier not found");
            return null;
        }
        debug("Updated supplier:", supplier);

        return supplier;
    } catch (error) {
        debug("Error updating user:", error);

        throw error;
    }
};

const destroyById = async(id) => {
    return updateSupplierById(id, { DeletedOn: Date.now() });
};

export { list, viewById, getCreateForm, createSupplier, updateSupplierById, destroyById };
