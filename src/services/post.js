const Post = require("../models/Post");

async function create(post) {
    await Post.create(post);
}

async function getAllPosts() {
    return await Post.find().lean();
}

module.exports = {
    create,
    getAllPosts
}