const bcrypt = require('bcrypt');
require('dotenv').config();

async function createHashedPassword(password) {
  const saltkey = 10;
  const salt = await bcrypt.genSalt(saltkey);
  return bcrypt.hash(password, salt);
}

module.exports = {
  createHashedPassword,
};
