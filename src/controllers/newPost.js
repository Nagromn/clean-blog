module.exports = async (req, res) => {
    let title = "";
    let body = "";
    const data = req.flash('data')[0];

    if(typeof data != 'undefined') {
        title = data.title;
        body = data.body;
    }

    res.render('base', {
        header: "layouts/header",
        title: "New Post",
        content: "pages/create",
        errors: req.flash('validationErrors'), title: title, body: body }
    );
}
