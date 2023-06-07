const db = require('../schemas/user_schema');
const encryptionUtils = require('../utils/encryption');

async function createUser(email) {
    return db.findOne({ email }).lean();
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

async function getUserByIDAndChangePassword(adminUserID, newPassword) {
    const encryptedPassword = await encryptionUtils.createHashedPassword(newPassword);
    const filter = { _id: adminUserID };
    const update = {
      password: encryptedPassword,
      $unset: { resetPasswordToken: '' },
    };
    const options = { new: true };
  
    const result = await db.findOneAndUpdate(filter, update, options).lean();
    return result;
  }
  

module.exports = {
    getUserByEmail,
    createUser,
    getUserByPhone,
    getUserById,
    
};
