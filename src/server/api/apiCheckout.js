import express from 'express';
import { tourPackages, guests } from '/server/schemas';
import { inventoryLib } from '/server/lib/inventoryLib.js';



let apiCheckout = express.Router();

apiCheckout.get('/success/:guestId/:tourPackageId', async (req, res, next) => {
  let { guestId, tourPackageId } = req.params;
  console.log(`PAYMENT FOR ${guestId} ${tourPackageId}`);

  let guest = await guests.findOne({ _id: guestId }).exec();
  let pkg = await tourPackages.findOne({ _id: tourPackageId }).exec();

  if( guest && pkg ){
    let purchaseResponse = await inventoryLib.purchaseTourPackage({ guestId, tourPackageId });
    return res.redirect(`/app/checkout/success/${guestId}/${tourPackageId}`);
  }

  return res.redirect(`/app/checkout/failure/${guestId}/${tourPackageId}`);
  
  
});

apiCheckout.get('/failure/:guestId/:tourPackageId', (req, res) => {
  // res.json({ checkoutStatus: 'fail' });
  return res.redirect(`/app/checkout/failure/${guestId}/${tourPackageId}`);
});

apiCheckout.get('/cancel/:guestId/:tourPackageId', (req, res) => {
  // res.json({ checkoutStatus: 'cancel' });
  return res.redirect(`/app/checkout/failure/${guestId}/${tourPackageId}`);
});
export default apiCheckout;

