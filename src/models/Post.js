const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: [6, "Title should be at least 6 characters"]
    },
    keyword: {
        type: String,
        required: true,
        minlength: [6, "Keyword should be at least 6 characters"]

    },
    location: {
        type: String,
        required: true,
        maxLength: [15, "Location should be a maximum 15 characters"]

    },
    date: {
        type: String,
        required: true,
        validate: {
            validator(value) {
                return /[0-9]{2}.[0-9]{2}.[0-9]{4}/.test(value)
            }, message: "The Date should be exactly 10 characters. Example:'02.02.2021'"
        }
    },
    imageUrl: {
        type: String,
        required: true,
        validator: {
            validate(value) {
                return /^https?:\/\//.test(value);
            }
        }, message: "Image url should start with http:// or https://."
    },
    description: {
        type: String,
        required: true,
        minlength: [8, "Description should be a minimum of 8 characters long"]
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    votes: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User"
        }
    ],
    rating: {
        type: Number,
        deault: 0
    }

});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;