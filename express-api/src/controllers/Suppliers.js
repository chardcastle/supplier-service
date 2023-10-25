const SupplierModel= require("../models/Supplier.js");
const mongoose = require("mongoose");

const getSuppliers = async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const model = mongoose.model('Supplier');
    return model.find({}).exec();
};

const createSupplier = async(data) => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const supplier = new SupplierModel(data);

    // Save the document to the database
    await supplier.save()

    // Close the MongoDB connection (optional)
    mongoose.connection.close();
};

module.exports = { getSuppliers, createSupplier };
