const _ = require('underscore');

function getResponseDto(data, reason, errors) {
  const response = { success: true };

  if (reason) {
    response.success = false;
    response.reason = reason;
  }
  if (!_.isEmpty(errors)) {
    // if (!Array.isArray(errors)) throw new Error('Errors need to be an Array');
    response.success = false;
    response.errors = errors;
  }
  if (data) response.data = data;
  return response;
}


module.exports = {
  getResponseDto,
};
