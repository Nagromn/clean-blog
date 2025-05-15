const BlogPost = require('../models/BlogPost');
const path = require('path');

module.exports = async (req, res) => {
    let image = req.files.image;
    image.mv(path.resolve(__dirname, '..', '..', 'uploads', 'img', image.name), async (err) => {
        if(err !== undefined) {
            console.log(err);
            const validationErrors = Object.keys(err.errors).map(key => err.errors[key].message);
            req.flash('validationErrors', validationErrors);
            req.flash('data', req.body);
            const { title, body } = req.body;
            res.status(400).render('base', { header: "layouts/header", title: "New Post", content: "pages/create", errors: req.flash('validationErrors'), title, body });
        } else {
            await BlogPost.create({
                ...req.body,
                image: '/uploads/img/' + image.name,
                userId: req.session.userId
            });
            res.redirect('/');
        }
    });
}