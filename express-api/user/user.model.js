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
    if (!user.isModified("password")) return next();

    // Generate a salt and hash the password with 10 rounds of salt
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

const User = mongoose.model("User", UserSchema);

export default User;
