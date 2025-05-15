const User = require("../models/User");

module.exports = async (req, res, next) => {
    try {
        if (!req.session.userId) {
            return res.redirect('/auth/login');
        }

        const user = await User.findById(req.session.userId);
        if (!user) {
            return res.redirect('/auth/login');
        }

        next();
    } catch (err) {
        console.error("Middleware error :", err);
        res.status(500).send("Server error");
    }
}