const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, min: 6, max: 20 },
    phone: { type: Number, required: false },
};

const schemaOptions = { toObject: { virtuals: true }, toJSON: { virtuals: true }, timestamps: true };
const userSchemaModel = new Schema(userSchema, schemaOptions);

module.exports = mongoose.model('Users', userSchemaModel, 'users');
