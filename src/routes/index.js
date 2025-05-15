const express = require('express');
const router = express.Router();

// Controllers
const homeController = require('../controllers/home');
const newPostController = require('../controllers/newPost');
const getPostController = require('../controllers/getPost');
const storePostController = require('../controllers/storePost');
const authController = require('../controllers/auth');

// Middleware
const validateMiddleware = require('../middleware/validateMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('../middleware/redirectIfAuthenticatedMiddleware');

// Routes
router.get('/', homeController);
router.get('/contact', (req, res) => {
    res.render('base', { header: "layouts/header-contact", title: "Contact", content: "pages/contact" });
});
router.get('/about', (req, res) => {
    res.render('base', { header: "layouts/header-about", title: "About", content: "pages/about" });
});
router.get('/post/new', authMiddleware, newPostController);
router.get('/post/:id', getPostController);
router.post('/post/store', validateMiddleware, storePostController);
router.get('/auth/register', redirectIfAuthenticatedMiddleware, authController.createRegisterForm);
router.post('/auth/store', redirectIfAuthenticatedMiddleware, authController.storeUser);
router.get('/auth/login', redirectIfAuthenticatedMiddleware, authController.createLoginForm);
router.post('/auth/login', redirectIfAuthenticatedMiddleware, authController.loginUser);
router.get('/auth/logout', authController.logOut);

module.exports = router;
