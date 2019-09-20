import express from 'express';
import { chatLogs } from '/server/schemas';
import { mwVerifyToken } from '/server/middleware/mwVerifyToken.js';

let apiChat = express.Router();

apiChat.use( mwVerifyToken );

apiChat.get('/allChat', (req, res) => {
  chatLogs.find({},(err, chat)=>{
    res.json({chatLogs: chat});
  });
});

apiChat.post('/sendMessage', async (req, res, next) => {
  let { body } = req;
  let { agencyId, guestId, sender, message } = body;
  
  let msg = {
    sender, message
  };

  let chat = await chatLogs.findOne({
    agencyId, guestId
  });

  if( chat ){
    chat.log.push(msg);
    chat.save((err, chat)=>{
      if(err){
        return next(err);
      }
      console.log('Chat updated');
      res.sendStatus(200);
    });
  }else{
    let initChat = new chatLogs({
      agencyId, guestId, log: []
    });
    
    initChat.log.push(msg);

    initChat.save((err, chat)=>{
      if(err){
        return next(err);
      }
      console.log('Chat created');
      res.json({chatLog:chat});
    });
  }

});

export default apiChat;