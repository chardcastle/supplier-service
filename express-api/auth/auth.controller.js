import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../user/user.model.js";
import { apiSuccess, apiError } from "../helpers/apiResponses.js";
import Debug from "debug";
const debug = Debug("ctl");

export const login = async (req, res) => {
    try {
        const { valid, errors } = User.validateLoginData(req.body);
        if (!valid) {
            debug("Invalid auth request payload");
            return res.status(400).json(apiError(400, { errors }));
        }

        const { username: submittedUsername, password: submittedPassword } = req.body;

        const { _id: id, username, password } = await User.findOne({ username: submittedUsername });
        if (!id) {
            debug("Unable to find user by given username");
            return res.status(404).json(apiError(404, { username: "Username doesn't exist in database." }));
        }

        const isMatch = await bcrypt.compare(submittedPassword, password);
        if (!isMatch) {
            debug("Password mismatch");
            return res.status(401).json(apiError(401, { msg: "Username or password doesn't match." }));
        }

        debug("Creating JWT token");
        const jwtPayload = { id, username };

        // Sign Token with payload
        jwt.sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: 36000 }, (err, token) => {
            if (err) {
                return res
                    .status(400)
                    .json(apiError(400, { msg: "Something went wrong, try again later." }));
            }

            debug(`Returning token for successful request: ${token}`);
            return res.status(200).json(apiSuccess(200, { token: `Bearer ${token}` }));
        });
    } catch (err) {
        return res.status(500).json(apiError(500, { err }));
    }
};
