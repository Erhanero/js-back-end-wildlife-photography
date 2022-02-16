const router = require("express").Router();
const authService = require("../services/auth");
const jwt = require("jsonwebtoken");

router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register", async (req, res) => {

    try {
        if (req.body.password != req.body.repeatPassword) {
            throw new Error("Passwords don't match!")
        }
        const token = await authService.register(req.body);

        res.cookie("app-token", token, { httpOnly: true });
        res.redirect("/");

    } catch (err) {
        console.log(err.message);
        res.render("register");
    }
})

module.exports = router;