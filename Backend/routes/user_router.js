
const express = require('express');

const router = express.Router();

// const auth = require("../middlewares/auth");
const authController = require('../controllers/auth_contoller');

router.post('/signup', authController.userSignup);
router.post('/login', authController.loginUser);
router.post('/change-password',  authController.changePassword);
// router.post('/forgot-password', auth, authController.forgotPassword);

module.exports = router;

