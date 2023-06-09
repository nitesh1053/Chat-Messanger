const _ = require('underscore');
const userRepo = require('../repos/user_repo');
const encryptionUtils = require('../utils/encryption');
const genericDtl = require('../dtl/generic');

async function checkAndSignUpForUser(model) {
    const { name, email, password, phone,isPrivate } = model;
  
    const checkSignUpDetailsResponse = await checkSignUpDetails({ name, email, phone, password });
    if (!checkSignUpDetailsResponse.success) {
      return checkSignUpDetailsResponse;
    }
  
    const hashedPassword = await encryptionUtils.createHashedPassword(password);
    const user = await userRepo.createUser({ name, email, phone, hashedPassword, isPrivate });
  
    return genericDtl.getResponseDto({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
  }

  async function checkSignUpDetails(model) {
    const { email, phone } = model;
  
    const [userWithPhone, userWithEmail] = await Promise.all([
      userRepo.getUserByPhone(phone),
      userRepo.getUserByEmail(email),
    ]);

    if(!_.isEmpty(userWithPhone)) {
        return genericDtl.getResponseDto(null, 'User already exist with this phone');
    }
    if(!_.isEmpty(userWithEmail)) {
        return genericDtl.getResponseDto(null, 'User already exist with this email');
    }
  
  
    return genericDtl.getResponseDto();
  }

  module.exports = {
    checkAndSignUpForUser,
  }