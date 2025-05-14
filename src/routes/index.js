const express = require('express');
const router = express.Router();

// Controllers
const homeController = require('../controllers/home');
const newPostController = require('../controllers/newPost');
const getPostController = require('../controllers/getPost');
const storePostController = require('../controllers/storePost');
const listPostController = require('../controllers/listPost');
const authController = require('../controllers/auth');

// Middleware
const validateMiddleware = require('../middleware/validateMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

// Routes
router.get('/', homeController);
router.get('/post/new', authMiddleware, newPostController);
router.get('/post/:id', getPostController);
router.post('/post/store', validateMiddleware, storePostController);
router.get('/list', listPostController);
router.get('/auth/register', authController.createRegisterForm);
router.post('/auth/store', authController.storeUser);
router.get('/auth/login', authController.createLoginForm);
router.post('/auth/login', authController.loginUser);

module.exports = router;
