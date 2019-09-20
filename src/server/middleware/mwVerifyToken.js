import { authJwt } from '/server/lib/authJwt.js';

export const mwVerifyToken = async ( req, res, next ) => {
  return next(); // ignore token for now

  let authField = req.header('Authorization');

  if(authField){
    let token = authField.split(' ')[1];
    try{
      let isTokenValid = await authJwt.verifyToken(token);
      if(isTokenValid){
        next();
      }
    }catch(err){
      next(err);
    }
  }else{
    next( new Error('INVALID_TOKEN' ));
  }
};
