const Post = require("../models/Post");

async function create(post) {
    await Post.create(post);
}

async function getAllPosts() {
    return await Post.find().lean();
}

async function getPostById(id) {
    return await Post.findById(id).populate("author");
}

async function deleteById(id) {
    return await Post.findByIdAndDelete(id);
}

async function editPost(id, post) {
    return await Post.findByIdAndUpdate(id, post)
}
module.exports = {
    create,
    getAllPosts,
    getPostById,
    deleteById,
    editPost
}