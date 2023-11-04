import SupplierModel from "./supplier.model.js";
import Debug from "debug";
import mongoose from "mongoose";
const debug = Debug("ctl");

const getSuppliers = async () => {
    debug("Fetching suppliers");
    debug("2 DB status", mongoose.connection.readyState);
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
    // data.DeletedOn = Date.now();
    debug("B DB status", mongoose.connection.readyState);
    const submittedSupplier = new SupplierModel(data);

    try {
        await submittedSupplier.save();
        return Promise.resolve(submittedSupplier);
    } catch (error) {
        debug("Request data", data);
        debug("Error saving 🚨", error);

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
    // debug("C DB status", mongoose.connection.readyState);
    // return submittedSupplier.save()
    //     .then(res => {
    //         debug("Save ✅", res);
    //         return res;
    //     }).catch(error => {
    //         debug("Error saving 🚨", error);
    //         return error.errors;
    //     });
};

const updateSupplierById = async(id, data) => {
    try {
        // TODO Add validation
        const supplier = await SupplierModel.findByIdAndUpdate(id, data);
        debug("Updated supplier with", { supplier, id, data });
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
