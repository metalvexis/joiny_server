import jwt from 'jsonwebtoken';
const secretKey = '_secret_token_key_'; // TODO: use env var for security

function verifyToken( token ){
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decodedToken) => {
      
      if (err || !decodedToken){
        return reject(err);
      }

      resolve(true);
    });
  });
}

function decodeToken() {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decodedToken) => {
      
      if (err){
        return reject(err);
      }

      resolve(!!decodedToken);
    });
  });
}

function createToken( data ){
  let token = jwt.sign({
    data
  }, 
  secretKey, 
  {
    algorithm: 'HS256'
  });
  return token;
}


export const authJwt =  {
  verifyToken,
  decodeToken,
  createToken
};