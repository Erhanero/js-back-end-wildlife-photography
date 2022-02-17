const router = require("express").Router();
const homeController = require("./controllers/home");
const registerController = require("./controllers/register");
const loginController = require("./controllers/login");
const postsController = require("./controllers/posts");

router.use(homeController);
router.use(registerController);
router.use(loginController);
router.use(postsController);

router.get("*", (req, res) => {
    res.render("404")
})
module.exports = router;
