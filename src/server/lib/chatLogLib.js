import { travelAgencies, guests, chatLogs } from '/server/schemas';

async function sendMessage({chatId, guestId, agencyId, message}){
  let sender = '';
  
  if( guestId ){
    sender = guestId;
  }else if( agencyId ){
    sender = agencyId;
  }

  let log = {
    sender, message
  };
  
  let chat = await chatLogs.findOne({
    chatId
  });

  if( chat ){
    chat.log.push(log);

    return new Promise((resolve,reject)=>{
      chat.save((err, chat)=>{
        if(err){
          reject(err);
        }else{
          resolve(chat);
        }
      });
    });

  }else{
    let initChat = new chatLogs({
      log: []
    });
    
    initChat.log.push(log);

    return new Promise((resolve,reject)=>{
      initChat.save((err, chat)=>{
        if(err){
          reject(err);
        }else{
          resolve(chat);
        }
      });  
    });
  }
}

export const chatLogLib = {
  sendMessage
};