import SupplierModel, { SupplierSchema } from "./supplier.model.js";
import mongoose from "mongoose";
import { formattedValidationErrors } from "../helpers/apiResponses.js";
import Debug from "debug";
const debug = Debug("ctl");

const getSuppliers = async () => {
    return SupplierModel.find({ DeletedOn: null });
};

const getSupplierById = async(id) => {
    const supplier = await SupplierModel.findById(id);
    if (null === supplier) {
        throw new Error("Not found");
    }

    return supplier;
};

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

export { getSuppliers, getSupplierById, createSupplier, updateSupplierById, destroyById };
