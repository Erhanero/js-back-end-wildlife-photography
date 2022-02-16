const User = require("../models/User");
const bcrypt = require("bcrypt");

async function register({ firstName, lastName, email, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword)

    await User.create({ firstName, lastName, email, hashedPassword });
}

module.exports = {
    register,
}