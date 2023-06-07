const mongoose = require('mongoose');

const { Schema } = mongoose;

const messageSchema = {
   chatId: { type: Schema.ObjectId, ref: 'chats', required: true, index: true }, 
   sender: { type: Schema.ObjectId, ref: 'Users', required: true, index: true }, 
   text: { type: String},
   isArchived: { type: Boolean, default: false },
};

const schemaOptions = { toObject: { virtuals: true }, toJSON: { virtuals: true }, timestamps: true };
const messageSchemaModel = new Schema(messageSchema, schemaOptions);

module.exports = mongoose.model('Messages', messageSchemaModel, 'messages');
