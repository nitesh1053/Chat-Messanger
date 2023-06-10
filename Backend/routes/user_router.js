
const express = require('express');

const router = express.Router();

const auth = require("../middlewares/auth");
const userController = require('../controllers/user_controller');

router.put('/:userId', auth, userController.updateUserById);
router.delete('/:userId', auth, userController.deleteUserById);
router.get('/:userId',auth,  userController.getUserById);
router.get('/:userId/:searchString',auth,  userController.searchUsersBySearchString);
router.put('/mode/:userId', auth, userController.changeModeForUser);

module.exports = router;

