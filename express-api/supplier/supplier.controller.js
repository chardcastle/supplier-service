import SupplierModel from "./supplier.model.js";
import Debug from "debug";
const debug = Debug("ctl");

const getSuppliers = async () => {
    debug("Fetching suppliers");

    return SupplierModel.find({ DeletedOn: null });
};

const getSupplierById = async(id) => {
    return SupplierModel.findById(id);
};

const createSupplier = async(data) => {
    debug("Creating with", data);

    return SupplierModel.create(data);
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
