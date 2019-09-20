import { guests } from '/server/schemas';
import { travelAgencies } from '/server/schemas';
import bcrypt from 'bcrypt';
const saltRounds = 10;

function generateHash(myPlaintextPassword){
  return new Promise((resolve, reject) => {
    bcrypt.hash(myPlaintextPassword, saltRounds, (err, encrypted)=>{
      if(err){
        reject(err);
      }else{
        resolve(encrypted);
      }
    });
  });
}

function compareHash(myPlaintextPassword, storedHash){
  return new Promise((resolve, reject) => {
    bcrypt.compare(myPlaintextPassword, storedHash, function(err, isSame) {
      if(err){
        reject(err);
      }else{
        resolve(isSame);
      }
    });
  });
}

async function authGuest(id, password){
  let user = await guests.findOne({
    $or:[
      { username: id },
      { email: id }
    ]
  });

  return authenticateUser(user, password);
}

async function authTravelAgency(id, password){
  let user = await travelAgencies.findOne({ email: id });

  return authenticateUser(user, password);
}

async function verifyGuest(_id, veriCode){
  let user = await guests.findOne({_id});

  return verifyUser( user, veriCode );
}

async function verifyTravelAgency(_id, veriCode){
  let user = await travelAgencies.findOne({ _id });

  return verifyUser( user, veriCode ) 
}

export const authPass = {
  generateHash,
  compareHash,
  authGuest,
  authTravelAgency,
  verifyGuest,
  verifyTravelAgency
};

async function authenticateUser(user, password){
  if( user ){
    try{
      let isMatch = await compareHash(password, user.password);
      if(isMatch){
        return user;
      }else{
        throw new Error('PASSWORD_MISMATCH');
      }
    }catch(err){
      throw err;
    }
  }

  throw new Error('USER_NOT_FOUND');
}

async function verifyUser(user, veriCode){

  let isVerified = veriCode === user.veriCode;

  if( isVerified ) user.isVerified = true;

  try{
    await user.save();
    return isVerified;
  }catch(err){
    throw( err );
  }

}