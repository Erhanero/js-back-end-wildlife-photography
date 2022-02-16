const router = require("express").Router();
const authService = require("../services/auth");

router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register", async (req, res) => {
    console.log(req.body);
    await authService.register()

})

module.exports = router;