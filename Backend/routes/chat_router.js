
const express = require('express');

const router = express.Router();

// const auth = require("../middlewares/auth");
const chatController = require('../controllers/chat_controller');

router.post('/', chatController.addChat );
router.get('/:userId', chatController.getChatByUserId);
router.get('/:firstUserId/:secondUserId', chatController.getChatForUsers);

module.exports = router;

