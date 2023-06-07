const { MissingParamError, HttpStatusError, httpErrorStatusCodes,  } = require('../utils/error');
const _ = require('underscore');
const messageRepo = require('../repos/message_repo');
const genericDtl = require('../dtl/generic');

async function addMessage(req, res, next) {
    console.log('controller', 'addMessage', JSON.stringify(req.body));
  
    const { text, userId, chatId  } = req.body;
    try {
      if (!userId) throw new MissingParamError('userId');
      if (!chatId) throw new MissingParamError('chatId');
      
      const savedMessage = await messageRepo.addMessage({ text, userId, chatId  });
      return res.send(genericDtl.getResponseDto(savedMessage));

    } catch (err) {
      console.log(`Error in adding Chat: ${JSON.stringify(err)}`);
      return next(err);
    }
}
async function getMessageByChatId(req, res, next) {
    console.log('controller', 'getMessageByChatId', JSON.stringify(req.params));
  
    const { chatId } = req.params;
    try {
        const savedMessage = await messageRepo.getMessageByChatId(chatId);
        if (_.isEmpty(savedMessage)) throw new HttpStatusError(httpErrorStatusCodes.NOT_FOUND, `No messages Found for this chatId: ${chatId}`);

      return res.send(genericDtl.getResponseDto(savedMessage));
   } catch (err) {
      console.log(`Error in gettting messages for chatId: ${JSON.stringify(err)}`);
      return next(err);
    }
}

module.exports = {
    addMessage,
    getMessageByChatId,
}