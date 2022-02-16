const User = require("../models/User");
const bcrypt = require("bcrypt");

async function register(username, password, email) {
    password = await bcrypt.hash(password, 10);
    console.log(password)

}

module.exports = {
    register,
}