const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const res = require("express/lib/response");


async function register({ firstName, lastName, email, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const existing = await User.findOne({ email });

    if (existing) {
        throw new Error("Email is existing");
    }

    const user = await User.create({ firstName, lastName, email, hashedPassword });
    return createToken(user);

}

async function login(email, password) {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("Username or password is invalid!")
    }

    const isValid = await bcrypt.compare(password, user.hashedPassword);
    if (!isValid) {
        throw new Error("Username or password is invalid!");

    }

    return createToken(user);

}

function createToken(user) {

    const secretToken = "DNKJ4H5N269D34EH4JDK3";
    const payload = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    }

    const token = jwt.sign(payload, secretToken);
    return token;
}

module.exports = {
    register,
    login
}