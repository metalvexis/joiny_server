import express from 'express';
import { guests } from '/server/schemas';
import { authPass } from '/server/lib/authPass.js';
import { mwLoader } from '/server/middleware/mwLoader.js';
import { mwVerifyToken } from '/server/middleware/mwVerifyToken.js';
import { accountLib } from '/server/lib/accountLib.js';
import { emailLib } from '/server/lib/emailLib.js';

let apiGuests = express.Router();

apiGuests.use( mwLoader.skip( mwVerifyToken, '/createAccount' ) );

apiGuests.get('/allGuests', (req, res) => {
  guests.find({},(err, accts)=>{
    res.json({guests: accts});
  });
});

apiGuests.get('/getAcct', (req, res) => {
  let { guestId } = req.query;
  console.log(`queryAcct ${guestId}`);
  guests.findOne({_id:guestId},(err, accts)=>{
    res.json({guest: accts});
  });
});

apiGuests.post('/createAccount', async (req, res, next) => {
  let { body } = req;
  
  let { password, email='', firstName='', lastName='', middleName='', contact=''  } = body;

  let emailExists = await guests.findOne({email: email}).exec();

  if( emailExists ) return next( new Error('EMAIL_EXISTS'));

  // get the string prior the '@' symbol
  let username = email.split('@')[0];
  
  try{
    let acct = await accountLib.createGuest({
      password, email, username,
      firstName, lastName, middleName, contact
    });

    let emailResponse = await emailLib.sendAcctVeriCode({ userId: acct._id, to: acct.email, veriCode: acct.veriCode });

    console.log({emailResponse});
    
    res.json({guest:acct});
  }catch(err){
    return next( err );
  }

});

apiGuests.post('/updateAccount', async (req, res, next) => {
  let { body } = req;

  let { username, password, email='', firstName='', lastName='', middleName='', contact=''  } = body;

  let isMatch = await authPass.authenticateUser(username,password,'guest');
  
  if(isMatch){
    let guest = await guests.findOne({username});
    let updatedFields = {email, firstName, lastName, middleName, contact};
    Object.assign(guest, updatedFields);

    guest.save((err, acct)=>{
      if(err){
        return next(err);
      }else{
        console.log('Guest Account Updated');
        res.json({guest: acct});
      }
    });
  }else{
    return next( new Error('USER_UNAUTHENTICATED') );
  } 
});

apiGuests.post('/authenticate', async (req, res, next) => {
  res.sendStatus(403);
});
export default apiGuests;

