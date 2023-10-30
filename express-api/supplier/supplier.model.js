const mongoose = require("mongoose");

const SupplierSchema = new mongoose.Schema({
    SupplierId: {
        type: Number,
        required: true,
    },
    Name: {
        type: String,
        required: true,
        maxlength: 450,
    },
    Address: {
        type: String,
        maxlength: 450,
    },
    CreatedByUser: {
        type: String,
        required: true,
        maxlength: 450,
    },
    CreatedOn: {
        type: Date,
        required: true,
    },
});

const SupplierModel = mongoose.model("Supplier", SupplierSchema);

module.exports = SupplierModel;
