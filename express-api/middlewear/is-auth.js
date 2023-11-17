import passport from "passport";
import { apiError } from "../helpers/apiResponses.js";

export default (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (error, jwt_payload) => {
        if (!req.get("Authorization")) {
            return res.status(400).json(apiError(401, { message: "An authentication token was not found in your request" }));
        }

        if (false === jwt_payload) {
            return res.status(401).json(apiError(401, { message: "Authentication failed" }));
        }

        if (error) {
            return next(error);
        }

        next();
    })(req, res);
};
