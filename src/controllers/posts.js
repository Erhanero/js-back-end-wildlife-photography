const router = require("express").Router();
const postService = require("../services/post");
const mapErrors = require("../utils/mapErrors");
const { isUser, isGuest } = require("../middlewares/guards");


router.get("/create", isUser, (req, res) => {
    res.render("create");
});

router.post("/create", isUser, async (req, res) => {
    try {
        await postService.create({
            title: req.body.title,
            keyword: request.body.keyword,
            location: request.body.location,
            date: request.body.date,
            imageUrl: request.body.imageUrl,
            description: request.body.descriptio,
            author: req.user._id,
        })
        res.redirect("/allPosts");
    } catch (err) {
        const errors = mapErrors(err);
        res.render("create", { errors });
    }
});

router.get("/allPosts", async (req, res) => {
    try {
        const posts = await postService.getAllPosts();
        res.render("all-posts", { posts })

    } catch (err) {
        const errors = mapErrors(err);
        res.render("all-posts", { errors })
    }
});

module.exports = router;