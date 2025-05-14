const BlogPost = require('../models/BlogPost');

module.exports = async (req, res) => {
    const blogPosts = await BlogPost.find({});
    console.log(blogPosts);
    res.render('base', { header: "layouts/header", title: "Home", content: "pages/index", blogPosts });
}