import express from 'express';

import apiTourPackages from '/server/api/apiTourPackages.js';
import apiChatLogs from '/server/api/apiChatLogs.js';
import apiGuests from '/server/api/apiGuests.js';
import apiTravelAgencies from '/server/api/apiTravelAgencies.js';
import apiAuth from '/server/api/apiAuth.js';
import apiPurchases from '/server/api/apiPurchases.js';
import apiCheckout from '/server/api/apiCheckout.js';
import apiEmail from '/server/api/apiEmail.js';
let router = express.Router();

router.get('/', (req, res) => res.send(
  'WELCOME TO CATALYST API <br><br> '+
  'API Doc: https://github.com/metalvexis/joiny_server#api<br><br> '+
  'Programmer: James Paulo J. Saballegue<br> '+
  'Contact: jp.saballegue@gmail.com'));

router.use('/auth', apiAuth);

router.use('/tourPackages', apiTourPackages);

router.use('/guests', apiGuests);

router.use('/travelAgencies', apiTravelAgencies);

router.use('/chat', apiChatLogs);

router.use('/purchases', apiPurchases);

router.use('/checkout', apiCheckout);

router.use('/email', apiEmail);

export default router;