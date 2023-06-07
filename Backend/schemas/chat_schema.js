const mongoose = require('mongoose');

const { Schema } = mongoose;

const chatSchema = {
   members: [{ type: Schema.ObjectId, ref: 'Users' }], 
};

const schemaOptions = { toObject: { virtuals: true }, toJSON: { virtuals: true }, timestamps: true };
const chatSchemaModel = new Schema(chatSchema, schemaOptions);

module.exports = mongoose.model('Chats', chatSchemaModel, 'chats');
