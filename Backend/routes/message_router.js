
const express = require('express');

const router = express.Router();

// const auth = require("../middlewares/auth");
const messageController = require('../controllers/message_controller');

router.post('/', messageController.addMessage);
router.get('/:chatId', messageController.getMessageByChatId);

module.exports = router;

