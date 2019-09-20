import express from 'express';
import { paymaya, buildCheckout, sendCheckoutRequest } from '/server/lib/paymayaLib.js';
import { tourPackages, guests } from '/server/schemas';
import { mwVerifyToken } from '/server/middleware/mwVerifyToken.js';
import { inventoryLib } from '/server/lib/inventoryLib.js';
import { aggregateLib } from '/server/lib/aggregateLib.js';

let apiTourPackages = express.Router();

// apiTourPackages.use( mwVerifyToken );

apiTourPackages.get('/allTourPackages', (req, res) => {
  tourPackages.find({},(err, packages)=>{
    res.json({tourPackages: packages});
  });
});

apiTourPackages.post('/createRegularPackage', async (req, res, next) => {
  let { body } = req;
  try{
    let tourPackage = await inventoryLib.createTourPackage( 'regular', body );
    res.json({ tourPackage });
  }catch(err){
    return next(err);
  }
});

apiTourPackages.post('/createJoinerPackage', async (req, res, next) => {
  let { body } = req;
  try{
    let tourPackage = await inventoryLib.createTourPackage( 'joiner', body );
    res.json({ tourPackage });
  }catch(err){
    return next(err);
  }
  
});

apiTourPackages.post('/updateRegularPackage', async (req, res, next) => {
  let { body } = req;
  try{
    let tourPackage = await inventoryLib.updateTourPackage( 'regular', body );
    res.json({ tourPackage });
  }catch(err){
    return next(err);
  }
  
});

apiTourPackages.post('/updateJoinerPackage', async (req, res, next) => {
  let { body } = req;
  try{
    let tourPackage = await inventoryLib.updateTourPackage( 'joiner', body );
    res.json({ tourPackage });
  }catch(err){
    return next(err);
  }
  
});

apiTourPackages.post('/purchasePackage', async (req, res, next) => {
  let { body } = req;
  let { guestId, tourPackageId } = body;
  let isValid = !!guestId && !!tourPackageId;
  console.log({body, isValid});
  if( isValid ){
    try{
      let purchaseResponse = await inventoryLib.purchaseTourPackage({ guestId, tourPackageId });
      return res.json({purchaseResponse});
    }catch(e){
      return next(e);
    }
    
  }else{
    return next( new Error('PURCHASE_REQ_INVALID') );
  }
  
});

apiTourPackages.post('/checkoutPackage', async (req, res, next) => {
  let { body } = req;
  let { guestId, tourPackageId } = body;
  let isValid = !!guestId && !!tourPackageId;
  console.log({body, isValid});
  if( isValid ){
    try{
      let guest = await guests.findOne({ _id: guestId }).exec();
      let pkg = await tourPackages.findOne({ _id: tourPackageId }).exec();

      if( guest && pkg ){
        console.log('Purchase valid');

        let checkout = buildCheckout({guest, pkg});
        let checkoutResponse = await sendCheckoutRequest({checkout});
        console.log({checkoutResponse});
        return res.json({checkoutResponse});
      }else{
        return next( new Error('CHECKOUT_FAILED') );
      }
    }catch(e){
      return next(e);
    }
    
  }else{
    return next( new Error('CHECKOUT_REQ_INVALID') );
  }
  
});

apiTourPackages.get('/allListing', async (req, res) => {
  try{
    let listing = await aggregateLib.getAllPkgListing();
    res.json({ packageListing: listing });
  } catch( err ){
    return res.next( err );
  }
});

export default apiTourPackages;