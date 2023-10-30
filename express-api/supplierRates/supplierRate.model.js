const mongoose = require("mongoose");

const supplierRateSchema = new mongoose.Schema({
    SupplierRateId: {
        type: Number,
        required: true,
        unique: true,
    },
    SupplierId: {
        type: Number,
        required: true,
    },
    Rate: {
        type: Number,
        required: true,
    },
    RateStartDate: {
        type: Date,
        required: true,
    },
    RateEndDate: {
        type: Date,
        default: null,
    },
    CreatedByUser: {
        type: String,
        required: true
    },
    CreatedOn: {
        type: Date,
        required: true,
        default: Date.now()
    },
});

const SupplierRateModel = mongoose.model("SupplierRate", supplierRateSchema);

module.exports = SupplierRateModel;
