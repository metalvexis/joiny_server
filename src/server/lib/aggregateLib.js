import { tourPackages } from '/server/schemas';
import { find } from 'lodash';

async function getAllPkgListing() {
  return new Promise(async (resolve, reject) => {
    try {
      let listing = await tourPackages.aggregate([
        {

          // converts string field to objectid
          $addFields: {
            travelAgencyId: {
              $convert: {
                input: '$agencyId',
                to: 'objectId',
                onError: 'Cannot convert $agencyId to objectId'
              }
            },
            tourPackageId: {
              $convert: {
                input: '$_id',
                to: 'string',
                onError: 'Cannot convert $agencyId to string'
              }
            }
          }
        },

        {
          $lookup: {
            from: 'travelagencies',
            localField: 'travelAgencyId',
            foreignField: '_id',
            as: 'travelAgency'
          }
        },
        { $unwind: '$travelAgency' },
        {
          $lookup: {
            from: 'purchases',
            localField: 'tourPackageId',
            foreignField: 'tourPackageId',
            as: 'purchases'
          }
        },
        {
          $sort: { 'lastUpdate':-1 }
        }
      ]);

      let joiners = await tourPackages.aggregate([
        {

          // converts string field to objectid
          $addFields: {
            tourPackageId: {
              $convert: {
                input: '$_id',
                to: 'string',
                onError: 'Cannot convert $agencyId to string'
              }
            }
          }
        },
        {
          $lookup: {
            from: 'purchases',
            localField: 'tourPackageId',
            foreignField: 'tourPackageId',
            as: 'guestPurchases'
          }
        },
        { $unwind: '$guestPurchases' },

        {
          $addFields: {
            guestPurchaseId: {
              $convert: {
                input: '$guestPurchases.guestId',
                to: 'objectId',
                onError: 'Cannot convert $agencyId to objectId'
              }
            }
          }
        },

        {
          $lookup: {
            from: 'guests',
            localField: 'guestPurchaseId',
            foreignField: '_id',
            as: 'joiner'
          }
        },

        { $unwind: '$joiner' },
        {
          $group: {
            _id: '$_id',
            joiners: { $push: '$joiner' }
          }
        }
      ]);
      
      let withJoiners = listing.map( pkg=>{
        let matchedPkg = find( joiners, {_id: pkg._id} );
        
        if(matchedPkg){
          pkg.joiners = matchedPkg.joiners;
        }
        
        return pkg;
      } );

      resolve(withJoiners);
    } catch (err) {
      reject(err);
    }

  });
}

export const aggregateLib = {
  getAllPkgListing
};