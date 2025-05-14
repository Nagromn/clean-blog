module.exports = (req, res) => {
    if(req.session.userId) {
        return res.render('post/new');
    }

    res.redirect('/auth/login');
}