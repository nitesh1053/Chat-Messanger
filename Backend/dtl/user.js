const _ = require('underscore');

function getUserDto(users) {
 const updatedUsers = _.map(users, user => {
     return {
        name: user.name,
        _id: user._id,
     }
 });
 return updatedUsers;
}


module.exports = {
    getUserDto,
};
