const port = 3001;
const express = require("express");
const app = express();
const util = require('node:util');
const cors = require("cors");
app.use(cors());

const debug = require("debug");
debug('supplier_service:index');

const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

app.use(express.json()); // For parsing JSON
app.use(express.urlencoded({ extended: true })); //

const mongoose = require("mongoose");
const mongoUri = process.env.MONGO_URI;
mongoose.Promise = Promise;

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => debug('connected'))
.catch(e => debug("Oh no, unable to connect to database! 🚨", e));

mongoose.connection.on('error', () => {
    throw new Error(`There was a connection error trying to use: ${mongoUri}`);
});

mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
});

const supplierRoutes = require("./supplier/supplier.routes.js")
app.use('/suppliers', supplierRoutes);

app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

if (!module.parent) {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
}
