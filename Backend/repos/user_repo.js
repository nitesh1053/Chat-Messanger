const db = require('../schemas/user_schema');
const encryptionUtils = require('../utils/encryption');

async function createUser(model) {
    const { name, email, phone, hashedPassword } = model;

    return db.create({
      name, email, phone, password: hashedPassword,
    });
}

async function getUserByEmail(email) {
    return db.findOne({ email }).lean();
}

async function getUserByPhone(phone) {
    return db.findOne({ phone }).lean();
}

async function getUserById(userId) {
    return db.findById(userId).lean();
}

async function getUserByIDAndChangePassword(userId, newPassword) {
    const encryptedPassword = await encryptionUtils.createHashedPassword(newPassword);
    const filter = { _id: userId };
    const update = {
      password: encryptedPassword,
      $unset: { resetPasswordToken: '' },
    };
    const options = { new: true };
  
    const result = await db.findOneAndUpdate(filter, update, options).lean();
    return result;
}

async function updateUser(userId, data) {
    const result = await db.findOneAndUpdate({_id: userId}, data , { new: true }).lean();
    return result;
}

async function deleteUserById(userId) {
   return db.findByIdAndDelete(userId).lean();
}


module.exports = {
    getUserByEmail,
    createUser,
    getUserByPhone,
    getUserById,
    getUserByIDAndChangePassword,
    updateUser,
    deleteUserById,
};
