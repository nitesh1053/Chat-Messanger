
const express = require('express');

const router = express.Router();

// const auth = require("../middlewares/auth");
const userController = require('../controllers/user_controller');

router.put('/:userId', userController.updateUserById);
router.delete('/:userId', userController.deleteUserById);
router.get('/:userId',  userController.getUserById);

module.exports = router;

