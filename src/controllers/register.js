const router = require("express").Router();
const authService = require("../services/auth");
const jwt = require("jsonwebtoken");
const mapErrors = require("../utils/mapErrors");
const { isGuest } = require("../middlewares/guards");

router.get("/register", isGuest, (req, res) => {
    res.render("register");
});

router.post("/register", isGuest, async (req, res) => {

    try {
        if (req.body.password.trim() == "") {
            throw new Error("Password is required")

        } else if (req.body.password != req.body.repeatPassword) {
            throw new Error("Passwords don't match!")
        }
        const token = await authService.register(req.body);

        res.cookie("app-token", token, { httpOnly: true });
        res.redirect("/");

    } catch (err) {
        const errors = mapErrors(err);
        res.render("register", { data: req.body, errors });
    }
})

module.exports = router;