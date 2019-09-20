import express from 'express';
import { purchases } from '/server/schemas';

let apiPurchases = express.Router();


apiPurchases.get('/allPurchases', (req, res) => {
  purchases.find({},(err, agencies)=>{
    res.json({purchases: agencies});
  });
});


export default apiPurchases;

