module.exports = async (req, res) => {
    res.render('base', {
        header: "layouts/header",
        title: "New Post",
        content: "pages/create"
    });
}
