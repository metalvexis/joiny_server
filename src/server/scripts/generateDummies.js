import faker from 'faker';
import { dbConnection, connectToDb } from '/server/db.js';
import { travelAgencies, guests, tourPackages, purchases } from '../schemas';
import { accountLib } from '../lib/accountLib.js';
import { inventoryLib } from '../lib/inventoryLib.js';

faker.locale = 'en';
faker.seed(123);

connectToDb();

dbConnection.once('open', async()=>{
  console.log('Mongoose connection opened');

  let sampleSize = 10;
  let promises = [];

  // create 10 Guest
  // create 10 TravelAgencies
  for (let index = 0; index < sampleSize; index++) {
    let email = faker.internet.email();
    let promisedGuest = accountLib.createGuest({
      email,
      username: email.split('@')[0],
      password: '123', 
      firstName: faker.name.findName(),
      lastName: faker.name.lastName(), 
      middleName: faker.name.lastName(), 
      contact: faker.phone.phoneNumberFormat()
    });

    promises.push(promisedGuest);

    let promisedAgency = accountLib.createTravelAgency({
      name: faker.company.companyName(), 
      address: 'testAddress', 
      email: faker.internet.email(), 
      contact: faker.phone.phoneNumberFormat(), 
      password: '123'
    });

    promises.push(promisedAgency);

  }
  
  await Promise.all( promises );
  let allGuest = await guests.find({}).exec();
  let allAgency = await travelAgencies.find({}).exec();

  let promisedPackages = allAgency.map(agency => {
    let batchPkg = [];
    for (let index = 0; index < 3; index++) {
      let pkg = inventoryLib.createTourPackage( 'joiner', {
        'name' : faker.address.city(),
        'price' : faker.finance.amount(),
        'details': 'Laborum reprehenderit deserunt Lorem non velit cupidatat dolore cillum ad anim amet.',
        'departureDate': faker.date.future(),
        'agencyId': agency._id,
        'pax': Math.floor(Math.random() * 20) + 10
      });

      batchPkg.push(pkg);
    }
    return Promise.all(batchPkg);
    
  });
  
  await Promise.all( promisedPackages );

  let pkgs = await tourPackages.find({}).exec();

  let promisedPurchases = allGuest.map(guest=>{
    let promisedPurchaseBatch = allAgency.map( async (agency) => {
      let pkgs = await tourPackages.find({agencyId: agency._id}).exec();
      let randomPkgIndx = Math.floor(Math.random() * pkgs.length);

      let promisedPurchase = inventoryLib.purchaseTourPackage({
        guestId: guest._id,
        tourPackageId: pkgs[ randomPkgIndx ]._id
      });

      return promisedPurchase;
    });

    return Promise.all( promisedPurchaseBatch );
  });

  await Promise.all( promisedPurchases );

  let prchs = await purchases.find({}).exec();

  console.log({tourPackages: pkgs.length, travelAgencies: allAgency.length, guests: allGuest.length, purchases: prchs.length});


  process.exit(0);
});




