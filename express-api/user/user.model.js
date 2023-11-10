import mongoose from "mongoose";
import _ from "lodash";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

UserSchema.statics = {
    /**
     * @param {string} username
     * @param {string} password
     * @returns {object}
     */
    validateLoginData({ username, password }) {
        let errors = {};
        !username && (errors.username = "Username is required.");
        !password && (errors.password = "Password is required.");

        if (_.isEmpty(errors)) {
            return { valid: true, errors: null };
        }

        return { valid: false, errors };
    },
}

//
// Pre-save middleware to hash the user's password before saving
UserSchema.pre("save", function (next) {
    const user = this;

    if (!user.isModified("password")) {
        return next();
    }

    const saltRounds = 10;
    bcrypt
        .hash(user.password, saltRounds)
        .then(hash => {
            user.password = hash;
            next();
        })
        .catch(err => next(err.message));
});

const User = mongoose.model("User", UserSchema);

export default User;
