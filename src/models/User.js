const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    hashedPassword: {
        type: String,
        required: true,
    }
});

userSchema.index({ email: 1 }, {
    unique: true,
    collation: {
        locale: "en",
        strength: 2
    }
});



const User = mongoose.model("User", userSchema);

module.exports = User;
