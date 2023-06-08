const _ = require('underscore');
const bcrypt = require('bcrypt');
const userRepo = require('../repos/user_repo');
const genericDtl = require('../dtl/generic');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function loginForUser(loginData) {
    const user = await userRepo.getUserByEmail(loginData.email);
    if (_.isEmpty(user)) return genericDtl.getResponseDto(null, 'Unregistered User');
  
    const isPasswordMatched = bcrypt.compareSync(loginData.password, user.password);
    if (!isPasswordMatched) return genericDtl.getResponseDto(null, 'Incorrect Password');
   const secret = (process.env.SECRET);
    const token = await jwt.sign({ id: user._id }, secret);

    const LogggedInUserData =  {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        token,
      };
    return genericDtl.getResponseDto(LogggedInUserData);
  }

  async function checkAndChangePasswordForUser(userId, currentPassword, newPassword) {
    const user = await userRepo.getUserById(userId);
    if (_.isEmpty(user)) return genericDtl.getResponseDto(null, ` User does not exist for userId: ${userId}`);
  
    const isPasswordMatched = bcrypt.compareSync(currentPassword, user.password);
    if (!isPasswordMatched) return genericDtl.getResponseDto(null, 'Incorrect currentPassword provided');
  
    await userRepo.getUserByIDAndChangePassword(user._id, newPassword);
    return genericDtl.getResponseDto();
  }
  

  module.exports = {
    loginForUser,
    checkAndChangePasswordForUser,
  }