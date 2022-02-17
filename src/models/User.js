const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: [3, "The first name should be at least 3 characters long"],
        validate: {
            validator(value) {
                return /^[a-zA-z]+$/.test(value);
            }, message: "First name may contain only english letters"
        }
    },
    lastName: {
        type: String,
        required: true,
        minlength: [5, "The last name should be at least 5 characters long"],
        validate: {
            validator(value) {
                return /^[a-zA-z]+$/.test(value);
            }, message: "Last name may contain only english letters"
        }
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator(value) {
                return /[a-z]+@[a-z]+.[a-z]+/.test(value);
            }, message: "Invalid email"
        }
    },
    hashedPassword: {
        type: String,
        required: true,

    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
