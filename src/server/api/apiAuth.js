import express from 'express';
import { authPass } from '/server/lib/authPass.js';
import { authJwt } from '/server/lib/authJwt.js';

let apiAuth = express.Router();

/* ACCOUNT AUTHENTICATION */
apiAuth.post('/guest', async (req, res, next) => {
  let { body } = req;

  let { username, password } = body;

  try{
    let user = await authPass.authGuest(username,password);

    if( user ){
      let token = authJwt.createToken(user._id);

      // console.log(`token: ${token}`);

      res.send({user});
    }else{
      return next( new Error('CRED_MISMATCH') );
    }

    
  }catch(err){
    return next(err);
  }
});

apiAuth.post('/travelAgency', async (req, res, next) => {
  let { body } = req;

  let { username, password } = body;

  try{
    let user = await authPass.authTravelAgency(username,password);
    
    if( user ){
      let token = authJwt.createToken(user._id);

      // console.log(`token: ${token}`);

      res.send({user});
    }else{
      return next( new Error('CRED_MISMATCH') );
    }
    
  }catch(err){
    return next(err);
  }
});

/* ACCOUNT VERIFICATION */
apiAuth.post('/verify/guest', async (req, res, next) => {
  let { body } = req;

  let { guestId, veriCode } = body;

  try{
    let isVerified = await authPass.verifyGuest(guestId, veriCode);

    res.send({isVerified});    
  }catch(err){
    return next(err);
  }
});

apiAuth.post('/verify/travelAgency', async (req, res, next) => {
  let { body } = req;

  let { travelAgencyId, veriCode } = body;

  try{
    let isVerified = await authPass.verifyTravelAgency(travelAgencyId, veriCode);

    res.send({isVerified});    
  }catch(err){
    return next(err);
  }
});

export default apiAuth;