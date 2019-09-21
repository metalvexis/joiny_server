import { connectToDb } from '/server/db.js';
import { startApp } from '/server/app.js';
import { initPaymaya } from '/server/lib/paymayaLib.js';
import dotenv from 'dotenv';

console.log(`Running Env: ${process.env.NODE_ENV}`);

if(process.env.NODE_ENV !== 'production'){
  console.log('Load local env');
  let env = dotenv.config();
 
  if(env.error){
    console.error(env.error);
  }
}

connectToDb();

initPaymaya();

startApp();
