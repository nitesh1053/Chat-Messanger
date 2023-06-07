const db = require('../schemas/message_schema');

async function addMessage(model) {
    const { text, userId, chatId  } = model;
    return db.create({ chatId, text, sender: userId });
}

async function getMessageByChatId(chatId) {
   return db.find({ chatId }).lean();
}

 module.exports= {
    addMessage,
    getMessageByChatId,
 }