const router = require("express").Router();
const homeController = require("./controllers/home");
const registerController = require("./controllers/register");

router.use(homeController);
router.use(registerController);

module.exports = router;
