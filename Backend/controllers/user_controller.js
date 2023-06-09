const { MissingParamError, HttpStatusError, httpErrorStatusCodes,  } = require('../utils/error');
const _ = require('underscore');
const userRepo = require('../repos/user_repo');
const genericDtl = require('../dtl/generic');
const { getUserDto } = require('../dtl/user');

async function updateUserById(req, res, next) {
    console.log('controller', 'updateUserById, userId: ',req.params, JSON.stringify(req.body));
  
    const { userId } = req.params;
    const model = req.body;
    try {
      if (!userId) throw new MissingParamError('userId');
       await userRepo.updateUser(userId, model);
      return res.send(genericDtl.getResponseDto({}));

    } catch (err) {
      console.log(`Error in updating user: ${JSON.stringify(err)}`);
      return next(err);
    }
}

async function deleteUserById(req, res, next) {
    console.log('controller', 'deleteUserById, userId: ',req.params);
  
    const { userId } = req.params;
    try {
      if (!userId) throw new MissingParamError('userId');
      const savedChat = await userRepo.deleteUserById(userId);
      return res.send(genericDtl.getResponseDto(savedChat));

    } catch (err) {
      console.log(`Error in deleting user: ${JSON.stringify(err)}`);
      return next(err);
    }
}

async function getUserById(req, res, next) {
    console.log('controller', 'getUserById, userId: ',req.params);
  
    const { userId } = req.params;
    try {
      if (!userId) throw new MissingParamError('userId');
      const user = await userRepo.getUserById(userId);
      if (_.isEmpty(user)) throw new HttpStatusError(httpErrorStatusCodes.NOT_FOUND, `No user Found for this usedId: ${userId}`);
      if (user.isPrivate) throw new HttpStatusError(httpErrorStatusCodes.UNAUTHORIZED,  'Private Account');
      delete user.password;
      return res.send(genericDtl.getResponseDto(user));

    } catch (err) {
      console.log(`Error in getting user: ${JSON.stringify(err)}`);
      return next(err);
    }
}

async function searchUsersBySearchString(req, res, next) {
  console.log('controller', 'searchUsersBySearchString',req.params);

  const {  searchString } = req.params;
  try {
    if (!searchString) return  res.send(genericDtl.getResponseDto({}));
    let users = await userRepo.getUsersByName(searchString);
    if (_.isEmpty(users))  users = await userRepo.getUserByEmail(searchString);
    if (_.isEmpty(users))  users = await userRepo.getUserByPhone(searchString);

    if (_.isEmpty(users)) throw new HttpStatusError(httpErrorStatusCodes.NOT_FOUND, `No user Found for this searchString: ${searchString}`);
    if (!Array.isArray(users)) users = [users];
   const updatedUsers =  getUserDto(users);
    return res.send(genericDtl.getResponseDto(updatedUsers));

  } catch (err) {
    console.log(`Error in searching users: ${JSON.stringify(err)}`);
    return next(err);
  }
}

async function changeModeForUser(req, res, next) {
  console.log('controller', 'changeModeForUser, userId: ',req.params, JSON.stringify(req.body));

  const { userId } = req.params;
  const { reveal, open } = req.body;
  const model = {
    modes: { reveal, open },
  };
  try {
    if (!userId) throw new MissingParamError('userId');
     await userRepo.updateUser(userId, model);
    return res.send(genericDtl.getResponseDto({}));

  } catch (err) {
    console.log(`Error in updating user: ${JSON.stringify(err)}`);
    return next(err);
  }
}

module.exports = {
    updateUserById,
    deleteUserById,
    getUserById,
    searchUsersBySearchString,
    changeModeForUser,
  };