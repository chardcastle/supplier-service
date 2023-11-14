const mongoose = require("mongoose");
const SupplierRateModel = require("./supplierRate.model");
const debug = require("debug")("ctl");

const getSupplierRates = async () => {
    debug("Fetching suppliers rates");

    const model = mongoose.model("SupplierRate");
    return model.find({});
};

const createSupplierRate = async(data) => {
    debug("Creating with", data);

    const model = new SupplierRateModel(data);
    await model.save();
};

module.exports = { getSupplierRates, createSupplierRate };
