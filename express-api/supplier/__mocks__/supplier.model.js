const mockSuppliers = require("./mockSuppliers");

const SupplierModelMock = {
    find: (req, res) => mockSuppliers,
    create: () => mockSuppliers[0],
    findByIdAndUpdate: () => true,
    findById: () =>  mockSuppliers[0],
};

module.exports = SupplierModelMock;