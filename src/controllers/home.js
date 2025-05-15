const BlogPost = require('../models/BlogPost');

module.exports = async (req, res) => {
    const blogPosts = await BlogPost.find({}).populate('userId');
    const previewLength = 100;
    const previewPosts = blogPosts.map(post => {
    const text = post.body;
        return {
            ...post.toObject(),
            preview: text.length > previewLength
            ? text.slice(0, previewLength) + '…'
            : text
        };
    });
    res.render('base', { header: "layouts/header", title: "Home", content: "pages/index", blogPosts: previewPosts });
}