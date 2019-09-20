import express from 'express';
import { travelAgencies } from '/server/schemas';
import { mwLoader } from '/server/middleware/mwLoader.js';
import { mwVerifyToken } from '/server/middleware/mwVerifyToken.js';
import { accountLib } from '/server/lib/accountLib.js';

let apiTravelAgencies = express.Router();

apiTravelAgencies.use( mwLoader.skip( mwVerifyToken, '/createTravelAgency' ) );

apiTravelAgencies.get('/allTravelAgencies', (req, res) => {
  travelAgencies.find({},(err, agencies)=>{
    res.json({travelAgencies: agencies});
  });
});

apiTravelAgencies.post('/createTravelAgency', async (req, res, next) => {
  let { body } = req;
  let { name='', address='', email='', contact='', password='' } = body;

  try{
    let agency = await accountLib.createTravelAgency({
      name, address, email, contact, password
    });
    res.json({travelAgency:agency});
  }catch(err){
    return next(err);
  }
});

export default apiTravelAgencies;

