const User = require("../models/User");
const bcrypt = require('bcrypt');

module.exports = {
    createRegisterForm: (req, res) => {
        res.render('base', { header: "layouts/header", title: "New User", content: "pages/auth/register" });
    },

    storeUser: async (req, res, err) => {
        try {
            await User.create(req.body);
            res.redirect('/auth/login');
        } catch (err) {
            console.error(err);
            res.redirect('/auth/register');
        }
    },
    
    createLoginForm: (req, res) => {
        res.render('base', { header: "layouts/header", title: "Login", content: "pages/auth/login" });
    },
    
    loginUser: async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username: username })
            if (user) {
                bcrypt.compare(password, user.password, (err, same) => {
                    if (same) {
                        req.session.userId = user._id;
                        res.redirect('/');
                    } else {
                        res.redirect('/auth/login');
                    }
                });
            } else {
                res.redirect('/auth/login');
            }
        } catch (error) {
            console.error('Connection error :', error);
            return res.status(500).send('Server error');
        }
    }
}
