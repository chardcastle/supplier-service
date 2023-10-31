const mongoose = require("mongoose");
const SupplierModel = require("./supplier.model");
const debug = require("debug")("ctl");

const getSuppliers = async () => {
    debug("Fetching suppliers");

    // const model = mongoose.model('Supplier');
    return SupplierModel.find({ DeletedOn: null, new: true });
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
        const supplier = await SupplierModel.findByIdAndUpdate(id, data, { new: true });
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
    return updateSupplierById(id, { DeletedOn: Date.now() })
}

module.exports = { getSuppliers, getSupplierById, createSupplier, updateSupplierById, destroyById };
