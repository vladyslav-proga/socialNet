const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

// -- http://localhost:5000/auth/signup
router.post('/signup', authController.signUp);

// -- http://localhost:5000/auth/signin
router.post('/signin', authController.signIn);

module.exports = router;
