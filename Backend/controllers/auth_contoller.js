
const { MissingParamError  } = require('../utils/error');
const userService = require('../services/user_service');
const authHelper = require('../helpers/auth_helper');
const _ = require('underscore');

async function loginUser(req, res, next) {
  const reqBodyForLog = Object.assign({}, req.body);
  delete reqBodyForLog.password;
  console.log('controller', 'loginForAdmin', JSON.stringify(reqBodyForLog));

  const model = req.body;
  try {
    if (!model.email) throw new MissingParamError('email');
    if (!model.password) throw new MissingParamError('password');

    const loginData = {
      email: model.email,
      password: model.password,
    };

    const loginRes = await userService.loginForUser(loginData);
    return res.send(loginRes);
  } catch (err) {
    console.log(`Error in loginForAdmin: ${JSON.stringify(err)}`);
    return next(err);
  }
}


async function userSignup(req, res, next) {
  console.log(`Signup request: ${JSON.stringify(req.body)}`);
  // const { email} = req.params;
  const { name, email, phone, password } = req.body;
  try {

    if (!name) throw new MissingParamError('name');
    if (!email) throw new MissingParamError('email');
    if (!phone) throw new MissingParamError('phone');
    if (!password) throw new MissingParamError('password');

    const signUpResponse = await authHelper.checkAndSignUpForUser({ name, email, phone, password });
    return res.send(signUpResponse);
  } catch (err) {
    console.log(`Error in signing up: ${JSON.stringify(req.body)}. Err: ${err.stack}`);
    return next(err);
  }
}

async function changePassword(req, res, next) {
  console.log('controller', 'changePasswordForAdmin', JSON.stringify(_.omit(req.body, ['currentPassword', 'newPassword'])));
  const { currentPassword, newPassword, userId } = req.body;
  try {
    if (!currentPassword) throw new MissingParamError('currentPassword');
    if (!newPassword) throw new MissingParamError('newPassword');
    if (!userId) throw new MissingParamError('userId');

    const response = await userService.checkAndChangePasswordForUser(userId, currentPassword, newPassword);
    return res.send(response);
  } catch (err) {
    console.log(`Error in handling change password request for adminUser. Err: ${err}`);
    return next(err);
  }
}

module.exports = {
  loginUser,
  userSignup,
  changePassword,
};
