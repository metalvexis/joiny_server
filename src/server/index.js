import path from 'path';
import express from 'express';
import api from '/server/api/';
import { connectToSandboxDb, connectToLocalDb } from '/server/db.js';
import { mwErrorLogger } from '/server/middleware/mwErrorLogger.js';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import morgan from 'morgan';

import dotenv from 'dotenv';
dotenv.config();

const HTMLPathDir = path.join(__dirname,'..','client');
const HTMLPathFile = path.join(HTMLPathDir,'index.html');

let jsonParser = bodyParser.json();
let urlencodedParser = bodyParser.urlencoded({ extended: false });

const app = express();
const serverPort = 3000;

if(process.env.ENV === 'prod'){
  connectToSandboxDb()
    .then(()=>{
      startApp();
    })
    .catch(err=>{
      throw err;
    });
}else{
  connectToLocalDb()
    .then(()=>{
      startApp();
    })
    .catch(err=>{
      throw err;
    });
}

function startApp(){
  app.use( [
    jsonParser,
    urlencodedParser, 
    methodOverride()
  ] );

  // log format - :method :url :status :res[content-length] - :response-time ms
  // app.use(morgan('tiny'));
  
  app.use(morgan(':date[iso] :status :url'));
  // app.use(morgan('{ "Date": ":date[iso]" METHOD: :method  URL: :url STAT: :status RESPONSE: :res[content-length] - TIME: :response-time ms }'));

  app.use(express.static(HTMLPathDir));

  // app.get('/home', (req, res) => {
  //   res.sendFile(HTMLPathFile);
  // });

  app.use('/api', api);

  app.get('/*', (req, res) => res.sendFile(HTMLPathFile) );

  app.use( mwErrorLogger ); 

  app.listen(serverPort, () => console.log(`Listening on port: ${serverPort}`));
} 