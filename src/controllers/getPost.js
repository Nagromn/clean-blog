const BlogPost = require('../models/BlogPost');

module.exports = async (req, res) => {
    const blogPost = await BlogPost.findById(req.params.id);
    res.render('base', { header: "layouts/header-post", title: "Post", content: "pages/post", blogPost});
}