const User = require("../models/User");
const bcrypt = require('bcrypt');

module.exports = {
    createRegisterForm: (req, res) => {
        let username = "";
        let password = "";
        const data = req.flash('data')[0];

        if(typeof data != 'undefined') {
            username = data.username;
            password = data.password;
        }

        res.render('base', { header: "layouts/header", title: "New User", content: "pages/auth/register", errors: req.flash('validationErrors'), username: username, password: password });
    },

    storeUser: async (req, res, err) => {
        try {
            await User.create(req.body);
            return res.redirect('/auth/login');
        } catch (err) {
            const validationErrors = Object.keys(err.errors).map(key => err.errors[key].message);
            req.flash('validationErrors', validationErrors);
            req.flash('data', req.body);
            
            const { username } = req.body;

            res.status(400).render('base', { header: "layouts/header", title: "New User", content: "pages/auth/register", errors: req.flash('validationErrors'), username, password: '' });
        }
    },
    
    createLoginForm: (req, res) => {
        let username = "";
        let password = "";
        const data = req.flash('data')[0];

        if(typeof data != 'undefined') {
            username = data.username;
            password = data.password;
        }

        res.render('base', { header: "layouts/header", title: "Login", content: "pages/auth/login", errors: req.flash('validationErrors'), username: username, password: password });
    },
    
    loginUser: async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username });

            if (!user) {
                return res.status(400).render('base', {
                    header: "layouts/header",
                    title: "Login",
                    content: "pages/auth/login",
                    errors: ['Invalid credentials'],
                    username,
                    password: ''
                });
            }

            const same = await bcrypt.compare(password, user.password);

            if (!same) {
                return res.status(400).render('base', {
                        header: "layouts/header",
                        title: "Login",
                        content: "pages/auth/login",
                        errors: ['Invalid credentials'],
                        username,
                        password: ''
                });
            }

            req.session.userId = user._id;
            const redirectTo = req.session.returnTo || '/';
            delete req.session.returnTo;
            return res.redirect(redirectTo);

        } catch (err) {
            const validationErrors = Object.keys(err.errors).map(key => err.errors[key].message);
            req.session.validationErrors = validationErrors;
            req.flash('data', req.body);
            
            const { username } = req.body;

            res.status(400).render('base', { header: "layouts/header", title: "New User", content: "pages/auth/login", errors: req.flash('validationErrors'), username, password: '' });
        }
    },

    logOut: (req, res) => {
        req.session.destroy(err => {
            if (err) {
                console.error('Logout error :', err);
                return res.status(500).send('Session error');
            }
            res.redirect('/');
        });
    }
}
