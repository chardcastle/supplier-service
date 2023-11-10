import * as jose from "jose";
import bcrypt from "bcryptjs";
import User from "../user/user.model.js";
import { apiSuccess, apiError } from "../helpers/apiResponses.js";
import Debug from "debug";
const debug = Debug("ctl");

const invalidCredentialsMessage = "Incorrect username and or password combination";

export const login = async (req, res) => {
    try {
        const {valid, errors} = User.validateLoginData(req.body);
        if (!valid) {
            debug("Invalid auth request payload");
            return res.status(400).json(apiError(400, {errors}));
        }

        const {username: submittedUsername, password: submittedPassword} = req.body;
        const matchedUser = await User.findOne({username: submittedUsername});

        if (null === matchedUser) {
            debug("Unable to find user by given username");
            return res.status(401).json(apiError(401, {message: invalidCredentialsMessage}));
        }

        const {_id: id, username, password} = matchedUser;

        const isMatch = await bcrypt.compare(submittedPassword, password);
        if (!isMatch) {
            debug("Password mismatch");
            return res.status(401).json(apiError(401, {message: invalidCredentialsMessage}));
        }

        const jwtPayload = {id: String(id), username};
        const secretSigningKey = new TextEncoder().encode(
            process.env.JWT_SECRET
        );
        try {
            // const expiryTime = Math.floor(Date.now() / 1000) + 60 * 60; // Expiration Time (1 hour)
            const token = await new jose.SignJWT(jwtPayload)
                .setProtectedHeader({ alg: "HS256" })
                .setIssuer('supplier_service_api')
                .setAudience('supplier_service_app')
                .setExpirationTime("2m")
                .sign(secretSigningKey);

            return res.status(200).json(apiSuccess(200, { username, token: `Bearer ${token}` }));
        } catch (error) {
            return res
                .status(500)
                .json(apiError(500, { message: "Unable to create JWT token" }));
        }
    } catch (err) {
        return res.status(500).json(apiError(500, { message: err.message }));
    }
};
