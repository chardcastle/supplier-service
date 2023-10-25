const SupplierRatesModel= require("../models/SupplierRate.js");
const mongoose = require("mongoose");

const getSupplierRates = async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const model = mongoose.model('SupplierRates');
    return model.find({}).exec();
};

const createSupplierRate = async(data) => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const supplierRate = new SupplierRateModel(data);

    // Save the document to the database
    await supplierRate.save()

    // Close the MongoDB connection (optional)
    mongoose.connection.close();
};

module.exports = { getSupplierRates, createSupplierRate };
