const { MissingParamError, ResourceNotFoundError, HttpStatusError, httpErrorStatusCodes,  } = require('../utils/error');
const _ = require('underscore');
const chatRepo = require('../repos/chat_repo');
const genericDtl = require('../dtl/generic');

async function addChat(req, res, next) {
    console.log('controller', 'addChat', JSON.stringify(req.body));
  
    const { senderId, recieverId } = req.body;
    try {
      if (!senderId) throw new MissingParamError('senderId');
      if (!recieverId) throw new MissingParamError('recieverId');
      const members = [ senderId, recieverId];
      const savedChat = await chatRepo.addChat({ members });
      return res.send(genericDtl.getResponseDto(savedChat));

    } catch (err) {
      console.log(`Error in adding Chat: ${JSON.stringify(err)}`);
      return next(err);
    }
}
async function getChatByUserId(req, res, next) {
    console.log('controller', 'getChatForUsers', JSON.stringify(req.params));
  
    const { userId } = req.params;
    try {
      if (!userId) throw new MissingParamError('userId');
      const savedChat = await chatRepo.getChatByUserId(userId);

      if (_.isEmpty(savedChat)) throw new ResourceNotFoundError({
        resource: 'chat', type: ResourceNotFoundError.types.DATABASE_DOCUMENT, id: { userId },
      });

      return res.send(genericDtl.getResponseDto(savedChat));

    } catch (err) {
      console.log(`Error in gettting Chat for usedId: ${JSON.stringify(err)}`);
      return next(err);
    }
}

async function getChatForUsers(req, res, next) {
    console.log('controller', 'getChatForUsers', JSON.stringify(req.params));
  
    const { firstUserId, secondUserId } = req.params;
    try {
      if (!firstUserId) throw new MissingParamError('firstUserId');
      if (!secondUserId) throw new MissingParamError('secondUserId');
       const userIds = [ firstUserId, secondUserId];

       const savedChat = await chatRepo.getChatByUserIds(userIds);

       if (_.isEmpty(savedChat)) throw new HttpStatusError(httpErrorStatusCodes.NOT_FOUND, `No chat Found for these usedIds: ${firstUserId}, ${secondUserId}`);
 
       return res.send(genericDtl.getResponseDto(savedChat));

    } catch (err) {
      console.log(`Error in getting Chat for userIds: ${JSON.stringify(err)}`);
      return next(err);
    }
}

module.exports = {
    addChat,
    getChatByUserId,
    getChatForUsers,
}