import mongoose from "mongoose";

export const SupplierSchema = new mongoose.Schema({
    SupplierId: {
        type: Number,
        required:[true, "Provide a suppliers ID (number)"],
    },
    Name: {
        type: String,
        required: [true, "Name is missing"],
        maxlength: 450,
    },
    Address: {
        type: String,
        required: [true, "Address is missing"],
        maxlength: 450,
    },
    CreatedByUser: {
        type: String,
        required: [true, "Created by whom?"],
        maxlength: 450,
    },
    CreatedOn: {
        type: Date,
        required: true,
    },
    DeletedOn: {
        type: Date
    },
});

// SupplierSchema.pre('findOne', (next) => {
//     return next(new Error("error is hererererere"))
// });

SupplierSchema.post('findOne', (doc) => {
    if (null === doc) {
        throw new Error(`Unable to find supplier`);
    }
});

const SupplierModel = mongoose.model("Supplier", SupplierSchema);

export default SupplierModel;
