const mongoose = require("mongoose");
const Supplier = require("./src/models/Supplier.js");
const SupplierRate = require("./src/models/SupplierRate.js");
const User = require("./src/models/User.js");
const { fakerEN: faker } = require("@faker-js/faker");

const mongoURI = process.env.MONGO_URI;
console.log("URI is", mongoURI);

// Create an empty array to store objects
const seedUsers = [];

// Create objects and add them to the array
for (let c = 0; c < 5; c++) {
    const obj = {
        username: faker.internet.userName(),
        password: faker.internet.password()
    };
    seedUsers.push(obj);
}

// Create an empty array to store objects
const seedSuppliers = [];

// Create objects and add them to the array
for (let c = 0; c < 3; c++) {
    const obj = {
        Name: faker.company.name(),
        SupplierId: c,
        Address: faker.location.streetAddress(),
        CreatedBy: {
            User: "Foo",
            CreatedOn:  Date.parse("07/30/2021")
        }
    };
    seedSuppliers.push(obj);
}

const seedSupplierRates = [
    {
        SupplierId: 1,
        Number: 10,
        Rate: 10,
        RateStartDate: Date.parse("1 Jan 2015"),
        RateEndDate: Date.parse("31 Mar 2015")
    },
    {
        SupplierId: 1,
        Number: 20,
        Rate: 20,
        RateStartDate: Date.parse("1 Apr 2015"),
        RateEndDate: Date.parse("1 May 2015")
    },
    {
        SupplierId: 1,
        Number: 10,
        Rate: 10,
        RateStartDate: Date.parse("30 May 2015"),
        RateEndDate: Date.parse("25 Jul 2015")
    },
    {
        SupplierId: 1,
        Number: 25,
        Rate: 25,
        RateStartDate: Date.parse("1 Oct 2015"),
        RateEndDate: undefined
    },
    {
        SupplierId: 2,
        Number: 100,
        Rate: 100,
        RateStartDate: Date.parse("1 Nov 2016"),
        RateEndDate: undefined
    },
    {
        SupplierId: 3,
        Number: 30,
        Rate: 30,
        RateStartDate: Date.parse("1 Dec 2016"),
        RateEndDate: Date.parse("1 Jan 2017")
    },
    {
        SupplierId: 3,
        Number: 30,
        Rate: 30,
        RateStartDate: Date.parse("2 Jan 2017"),
        RateEndDate: undefined
    }
];

// Connect to the MongoDB database and ingest data
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', async () => {
    console.log("Connected to MongoDB");

    console.log("Creating users");
    seedUsers.forEach((seedUser) => {
        const user = new User(seedUser);
        user.save()
            .then(savedUser => {
                console.log("Saved user:", savedUser.username);
            })
            .catch(error => {
                console.error("Error saving User:", error);
            });
    });

    console.log("Creating suppliers");
    seedSuppliers.forEach((seedSupplier) => {
        const supplierData = { ...seedSupplier, CreatedByUser: "Foo", CreatedOn: Date.now() }
        const supplier = new Supplier(supplierData);
        supplier.save()
            .then(seedSupplier => {
                console.log("Saved supplier:", seedSupplier._id);
            })
            .catch(error => {
                console.error("Error saving supplier:", error);
            });
    });

    console.log("Creating supplier rates");
    seedSupplierRates.forEach((seedSupplierRate, c) => {
        const supplierRateData = { ...seedSupplierRate, CreatedByUser: "Foo", CreatedOn: Date.now(), SupplierRateId: c + 1 };
        const supplierRate = new SupplierRate(supplierRateData);
        supplierRate.save()
            .then(seedSupplierRate => {
                console.log("Saved supplier:", seedSupplierRate.rate);
            })
            .catch(error => {
                console.error("Error saving supplier:", error);
            });
    });

    await mongoose.connection.close();
    console.log("Finished");
})

