const mockSuppliers = [
    { id: 1, name: "Mocked supplier 1" },
    { id: 2, name: "Mocked supplier 2" },
];

const SupplierModelMock = {
    __esModule: true, // Use it when dealing with esModules
    default: jest.requireActual('./supplier.model'),
    find: () => mockSuppliers,
    create: () => mockSuppliers[0],
    findByIdAndUpdate: () => true,
    findById: () =>  mockSuppliers[0],
};

export default SupplierModelMock;
