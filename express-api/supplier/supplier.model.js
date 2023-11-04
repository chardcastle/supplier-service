import mongoose from "mongoose";
// import { object, string, number, date, InferType } from "yup";
//
// const SupplierValidationSchema = object().shape({
//     SupplierId: yup.number().required('SupplierId is required'),
//     Name: yup.string().required('Name is required').max(450, 'Name must be at most 450 characters'),
//     Address: yup.string().max(450, 'Address must be at most 450 characters'),
//     CreatedByUser: yup.string().required('CreatedByUser is required').max(450, 'CreatedByUser must be at most 450 characters'),
//     CreatedOn: yup.date().required('CreatedOn is required'),
//     DeletedOn: yup.date(),
// });



// {
// Name: 'Test User',
// SupplierId: 1,
// CreatedByUser: 'Chris',
// Address: 'Street',
// CreatedOn: 1699029964117,
// DeletedOn: 1699029964126
// }

const SupplierSchema = new mongoose.Schema({
    SupplierId: {
        type: Number,
        required:[true, "Provide a supplier ID (number)"],
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

/**
 * Statics
 */
// SupplierSchema.statics = {
//     validateSupplier: (submittedData) => {
//         return SupplierValidationSchema.validate(submittedData)
//     },
// };

// Pre-save middleware to validate the document before saving
// SupplierSchema.pre('save', async function (next) {
//     try {
//         await SupplierValidationSchema.validate(this.toObject(), { abortEarly: false });
//         next();
//     } catch (validationError) {
//         const errors = validationError.inner.map((error) => ({
//             field: error.path,
//             message: error.message,
//         }));
//         next(new Error('Validation failed'));
//     }
// });


const SupplierModel = mongoose.model("Supplier", SupplierSchema);

export default SupplierModel;
