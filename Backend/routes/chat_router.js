
const express = require('express');

const router = express.Router();

const auth = require("../middlewares/auth");
const chatController = require('../controllers/chat_controller');

router.post('/', auth, chatController.addChat );
router.get('/:userId', auth, chatController.getChatByUserId);
router.get('/:firstUserId/:secondUserId', auth, chatController.getChatForUsers);

module.exports = router;

