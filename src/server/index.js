import express from 'express';
import api from '/server/api/';
import { connectToDb } from '/server/db.js';
import { mwErrorLogger } from '/server/middleware/mwErrorLogger.js';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import morgan from 'morgan';
import dotenv from 'dotenv';

console.log(`Running Env: ${process.env.NODE_ENV}`)

if(process.env.NODE_ENV !== 'production'){
  dotenv.config();
}

// const HTMLPathDir = path.join(__dirname,'..','client'); // DOES NOT SERVE CLIENT
// const HTMLPathFile = path.join(HTMLPathDir,'index.html'); // DOES NOT SERVE CLIENT

let jsonParser = bodyParser.json();
let urlencodedParser = bodyParser.urlencoded({ extended: false });

const app = express();
const serverPort = process.env.PORT || 3000;

connectToDb()
  .then(()=>{
    startApp();
  })
  .catch(err=>{
    throw err;
  });

function startApp(){
  app.use( [
    jsonParser,
    urlencodedParser,
    methodOverride()
  ] );

  // log format - :method :url :status :res[content-length] - :response-time ms
  // app.use(morgan('tiny'));

  app.use(morgan(':date[iso] :status :url'));

  // app.use(express.static(HTMLPathDir)); // DOES NOT SERVE CLIENT

  app.use('/api', api);

  app.get('/_health', (req, res) => res.send('OK'));

  app.use( mwErrorLogger );

  app.listen(serverPort, () => console.log(`Listening on port: ${serverPort}`));
}