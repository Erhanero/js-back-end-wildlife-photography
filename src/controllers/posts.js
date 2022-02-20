const router = require("express").Router();
const postService = require("../services/post");
const mapErrors = require("../utils/mapErrors");
const { isUser, isGuest } = require("../middlewares/guards");


router.get("/create", isUser, (req, res) => {
    res.render("create");
});

router.post("/create", isUser, async (req, res) => {
    try {
        const { title, keyword, location, date, imageUrl, description } = req.body;
        await postService.create({ title, keyword, location, date, imageUrl, description, author: req.user._id });
        res.redirect("/allPosts");

    } catch (err) {
        const errors = mapErrors(err);
        res.render("create", { errors });
    }
});

router.get("/allPosts", async (req, res) => {
    try {
        let posts = await postService.getAllPosts();

        res.render("all-posts", { posts })

    } catch (err) {
        const errors = mapErrors(err);
        res.render("all-posts", { errors })
    }
});

router.get("/details/:postId", async (req, res) => {

    let post = await postService.getPostById(req.params.postId);
    const isAuthor = req.user && post.author._id == req.user._id;
    const isVoted = req.user && postService.isVoted(post, req.user);
    const allVoteUsers = req.user && postService.voteUsers(post);

    post = post.toObject();
    res.render("details", { post, isAuthor, isVoted, allVoteUsers });
});

router.get("/delete/:postId", isUser, async (req, res) => {
    await postService.deleteById(req.params.postId);
    res.redirect("/allPosts");
});

router.get("/edit/:postId", isUser, async (req, res) => {
    let post = await postService.getPostById(req.params.postId);
    post = post.toObject();
    res.render("edit", { ...post })
});

router.post("/edit/:postId", isUser, async (req, res) => {
    const { title, keyword, location, date, imageUrl, description } = req.body;
    await postService.editPost(req.params.postId, { title, keyword, location, date, imageUrl, description });
    res.redirect(`/details/${req.params.postId}`);


});

router.get("/up-vote/:postId", isUser, async (req, res) => {
    await postService.upVote(req.params.postId, req.user);

    res.redirect(`/details/${req.params.postId}`);

});

router.get("/down-vote/:postId", isUser, async (req, res) => {
    await postService.downVote(req.params.postId, req.user);

    res.redirect(`/details/${req.params.postId}`);
});

router.get("/my-posts", isUser, async (req, res) => {
    const myPosts = await postService.myPosts(req.user._id);
    console.log(myPosts)
    res.render("my-posts", { myPosts })
})

module.exports = router;