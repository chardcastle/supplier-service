/**
 * This (JavaScript) file provides initial data for the mongo instance
 *
 * This is run on the first instance of the attached volume being created. To re-run, delete the existing docker volume!
 * The JavaScript object within the container is not in scope of a code editor. This is why inspections can be ignored.
 */
/* eslint-disable no-undef */
// noinspection JSUnresolvedReference
console.log("Init custom DB instructions 🚀");

db = new Mongo().getDB("admin");

db.createUser({
    user: "supplier_service_user",
    pwd: "supersecure",
    roles: [{ role: "readWrite", db: "supplier_service" }],
});

db = new Mongo().getDB("supplier_service");

db.users.insertOne({ username:"foo", password:"bar123" });

db.suppliers.insertMany([
    {
        SupplierId: 1,
        Name: "Chris",
        Address: "Suffolk",
        CreatedByUser: "Alan",
        CreatedOn: Date.now(),
    },
]);

db.supplier_rates.insertMany([
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
]);

console.log("Finished custom DB instructions ✅");
