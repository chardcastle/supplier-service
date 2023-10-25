const express = require("express");
const cors = require('cors');
const app = express();
const port = 3001;
const path = require("path");

const { getSuppliers, createSupplier } = require("./src/controllers/Suppliers.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));
const bodyParser = require('body-parser')
const multer = require("multer");
const upload = multer(); // for parsing multipart/form-data


app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get("/suppliers", async (req, res) => {
    const suppliers =  await getSuppliers();

    res.send(suppliers);
});

app.post("/suppliers", upload.array(), async (req, res) => {
    // const postData = req.body;
    // res.send(`${JSON.stringify(req.body)}`);
    const supplierData = { ...req.body, CreatedOn: Date.now() }
    await createSupplier(supplierData);
    res.status(200).send('Created supplier successfully');
});

app.get("/suppliers/create", (req, res) => {
    res.render("create-supplier");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});
