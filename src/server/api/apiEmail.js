import express from 'express';
import { emailLib } from '/server/lib/emailLib.js';
import { guests, travelAgencies } from '/server/schemas';

let apiEmail = express.Router();

apiEmail.get('/verifyEmailTrans', async (req, res, next) => {
  try{
    let response = await emailLib.verifyTransport();
    res.json({emailTransport: response});
  }catch(err){
    return next( err );
  }
});

apiEmail.get('/testEmail', async (req, res, next) => {
  try{
    let response = await emailLib.sendEmail();
    res.json({emailStatus: response});
  }catch(err){
    return next( err );
  }
});

apiEmail.post('/sendVeriCode/guest', async (req, res, next) => {
  try{
    let { body } = req;
    let { guestId } = body;

    let guest = await guests.findOne({_id: guestId}).exec();
    
    if(guest){
      let response = await emailLib.sendAcctVeriCode({ userId: guest._id, to: guest.email, veriCode: guest.veriCode});
      return res.json({emailStatus: response});
    }
    return next( new Error('GUEST_NOT_EXIST') );
  }catch(err){
    return next( err );
  }
});

apiEmail.post('/sendVeriCode/travelAgency', async (req, res, next) => {
  try{
    let { body } = req;
    let { travelAgencyId } = body;

    let agency = await travelAgencies.findOne({_id: travelAgencyId}).exec();

    if(agency){
      let response = await emailLib.sendAcctVeriCode({ userId: agency._id, to: agency.email, veriCode: agency.veriCode});
      return res.json({emailStatus: response});
    }
    return next( new Error('AGENCY_NOT_EXIST') );
  }catch(err){
    return next( err );
  }
});

export default apiEmail;