import SupplierModel, { SupplierSchema } from "./supplier.model.js";
import Debug from "debug";
import mongoose from "mongoose";
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
        const { errors } = error;

        const validationErrors = [].concat(Object.keys(errors)).map((key) => {
            const errorObj = error.errors[key];
            return {
                id: key,
                field: key,
                message: errorObj.message,
            };
        });

        return Promise.reject(validationErrors);
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
