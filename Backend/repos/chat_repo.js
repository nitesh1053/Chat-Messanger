const db = require('../schemas/chat_schema');

async function addChat(chatData) {
    return db.create(chatData);
}

async function getChatByUserId(userId) {
   return db.find({ members: { $in: [userId] }}).lean();
}

async function getChatByUserIds(userIds) {
   return db.findOne({ members: { $all: userIds } }).lean();
 }

 module.exports= {
    addChat,
    getChatByUserId,
    getChatByUserIds,
 }