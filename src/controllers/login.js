const router = require("express").Router();
const authService = require("../services/auth");

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", async (req, res) => {
    try {
        const token = await authService.login(req.body.email, req.body.password);
        res.cookie("app-token", token, { httpOnly: true });
        res.redirect("/");

    } catch (err) {
        console.log(err.message);
        res.render("/login");
    }
});

module.exports = router;
