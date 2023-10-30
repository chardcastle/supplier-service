const mongoose = require("mongoose");
const SupplierModel = require("./supplier.model");
const debug = require("debug")("ctl");

const getSuppliers = async () => {
    debug("Fetching suppliers");

    const model = mongoose.model('Supplier');
    return model.find({});
};

const createSupplier = async(data) => {
    debug("Creating with", data);

    const model = new SupplierModel(data);
    await model.save();
};


module.exports = { getSuppliers, createSupplier };
