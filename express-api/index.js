const port = 3001;

import express from "express";
import { inspect } from "util";
import cors from "cors";
import is404 from "./middlewear/is-404.js";
import Debug from "debug";
import supplierRoutes from "./supplier/supplier.routes.js";
import authRoutes from "./auth/auth.routes.js";
import mongoose from "mongoose";
import passport from "passport";
import passportConfig from "./config/passport.js";

const debug = Debug("ctl");
const app = express();
app.use(cors());

debug("supplier_service:index");
app.set("view engine", "ejs");
app.set("views", `${process.cwd()}/views`);

const mongoUri = process.env.MONGO_URI;
mongoose.Promise = Promise;

mongoose.connect(mongoUri)
    .then(() => debug("connected"))
    .catch(e => debug(`Failed to use ${mongoUri} as mongoDB connection string`, e));

mongoose.set("debug", (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, inspect(query, false, 20), doc);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
passportConfig(passport);

app.get('/', (req, res) => {
    res.render("home");
});

app.use("/auth", authRoutes);
app.use("/suppliers", supplierRoutes);

app.use((req, res) => {
    res.status(404).send("Sorry can't find that!");
});

app.use(is404);

app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

if (!app.listening) {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
}
