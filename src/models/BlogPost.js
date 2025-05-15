const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    body: {
        type: String,
        required: [true, 'Description is required']
    },
    // username: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    datePosted: {
        type: Date,
        default: new Date(),
    },
    image: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const BlogPost = mongoose.model('BlogPost', BlogPostSchema);
module.exports = BlogPost;