const port = 3001;
import express from 'express';
import { inspect } from 'util';
import cors from 'cors';
import Debug from "debug";
const debug = Debug("ctl");
import supplierRoutes from "./supplier/supplier.routes.js";
import mongoose from "mongoose";

const app = express();
app.use(cors());

debug("supplier_service:index");
app.set("view engine", "ejs");
app.set("views", `${process.cwd()}/views`);

app.get('/', (req, res) => {
    res.render("home");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //

const mongoUri = process.env.MONGO_URI;
mongoose.Promise = Promise;

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => debug("connected"))
.catch(e => debug(`Oh no, unable to connect to database, using ${mongoUri}! 🚨`, e));

mongoose.set("debug", (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, inspect(query, false, 20), doc);
});

app.use("/suppliers", supplierRoutes);

app.use((req, res) => {
    res.status(404).send("Sorry can't find that!");
});

app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

if (!app.listening) {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
}
