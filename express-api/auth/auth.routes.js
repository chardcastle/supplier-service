import { Router } from "express";
import { login } from "./auth.controller.js";
import { apiSuccess } from "../helpers/apiResponses.js";
import isAuth from "../middlewear/is-auth.js";

const router = Router();

router.post("/login", login);

router.get("/private", isAuth, (req, res) => {
    return res.status(200)
        .json(apiSuccess(
            200,
            { message: "This is a private welcome message from an authenticated request" }
        ));
});

router.get("/public", async (req, res) => {
    return res.status(200)
        .json(apiSuccess(
            200,
            { message: "Hello world!" }
        ));
});

export default router;
