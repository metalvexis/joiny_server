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

router.use('/auth', apiAuth);

router.use('/tourPackages', apiTourPackages);

router.use('/guests', apiGuests);

router.use('/travelAgencies', apiTravelAgencies);

router.use('/chat', apiChatLogs);

router.use('/purchases', apiPurchases);

router.use('/checkout', apiCheckout);

router.use('/email', apiEmail);

export default router;