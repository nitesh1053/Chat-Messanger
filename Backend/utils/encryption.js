const bcrypt = require('bcrypt');
require('dotenv').config();

async function createHashedPassword(password) {
  const salt = await bcrypt.genSalt(process.env.SALT_WORK_FACTOR);
  return bcrypt.hash(password, salt);
}

module.exports = {
  createHashedPassword,
};
