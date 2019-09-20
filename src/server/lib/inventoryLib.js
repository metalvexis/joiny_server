import { guests, tourPackages, purchases } from '/server/schemas';

export const inventoryLib = {
  createTourPackage(type, body){
    /*
    body: {
      "name" :"test another package",
      "price" : 20000,
      "details": "This is a sample package.",
      "agencyId": "asdfasdf"
    }
    */

    return new Promise((resolve, reject) => {
      try{
        let dummyPackage = new tourPackages({
          agencyId: body.agencyId,
          name: body.name,
          price: body.price,
          details: body.details,
          departureDate: body.departureDate || '',
          packageType: type,
          pax: body.pax
        });

        dummyPackage.save((err, tourPackage) => {
          if (err) {
            reject(err);
          }
          console.log('Package created');
          resolve(tourPackage);
        });  
      }catch(err){
        reject(err);
      }
    });
  },

  updateTourPackage(type, body){
    /*
    body: {
      "name" :"test another package",
      "price" : 20000,
      "details": "This is a sample package.",
      "agencyId": "asdfasdf"
    }
    */

    return new Promise((resolve, reject) => {
      try{
        let outdatedPkg = new tourPackages.findOne({
          _id: body._id,
        });

        let updatedPkg = Object.assign(outdatedPkg, {
          // agencyId: body.agencyId,
          name: body.name,
          price: body.price,
          details: body.details,
          departureDate: body.departureDate || '',
          packageType: type,
          pax: body.pax
        });

        updatedPkg.save((err, pkg) => {
          if (err) {
            reject(err);
          }
          console.log('Package updated');
          resolve(pkg);
        });  
      }catch(err){
        reject(err);
      }
    });
  },

  purchaseTourPackage({guestId, tourPackageId}){
    /*
    body: {
      "guestId": "01234",
	    "tourPackageId": "12345"
    }
    */
    return new Promise(async (resolve, reject) => {
      try{
        let guest = await guests.findOne({ _id: guestId }).exec();
        let pkg = await tourPackages.findOne({ _id: tourPackageId }).exec();

        let purchase = new purchases({
          guestId: guest._id, tourPackageId: pkg._id
        });

        purchase.save((err, purchase)=>{
          if(err){
            reject(err);
          }
          console.log(`Package ${tourPackageId} purchased by ${guestId}`);
          resolve(purchase);
        });
      }catch(err){
        reject(err);
      }
    });
  }
};