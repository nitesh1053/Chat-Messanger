
const express = require('express');

const router = express.Router();

const auth = require("../middlewares/auth");
const messageController = require('../controllers/message_controller');

router.post('/', auth, messageController.addMessage);
router.get('/:chatId', auth, messageController.getMessageByChatId);

module.exports = router;

