const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = {
    name: { type: String, required: true, index: true },
    email: { type: String, required: true },
    password: { type: String, required: true, min: 6, max: 20 },
    phone: { type: Number, required: true },
    isPrivate: { type: Boolean, default: false },
    city: { type: String, required: false },
    about: { type: String, required: false },
    hobby: { type: String, required: false },
    status: { type: String, required: false },
    modes : {
        reveal: { type: Boolean, default: true },
        open: { type: Boolean, default: false },
    }
};

const schemaOptions = { toObject: { virtuals: true }, toJSON: { virtuals: true }, timestamps: true };
const userSchemaModel = new Schema(userSchema, schemaOptions);

module.exports = mongoose.model('Users', userSchemaModel, 'users');
