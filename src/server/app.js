import express from 'express';
import api from '/server/api/';
import { mwErrorLogger } from '/server/middleware/mwErrorLogger.js';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import morgan from 'morgan';

const app = express();
const serverPort = process.env.PORT || 3000;

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// const HTMLPathDir = path.join(__dirname,'..','client'); // DOES NOT SERVE CLIENT
// const HTMLPathFile = path.join(HTMLPathDir,'index.html'); // DOES NOT SERVE CLIENT

function startApp(){
  app.use( [
    jsonParser,
    urlencodedParser,
    methodOverride()
  ] );

  if(process.env.NODE_ENV === 'production'){
    app.use(morgan('combined'));
  }else{
    app.use(morgan('dev'));
  }
  
  // app.use(express.static(HTMLPathDir)); // DOES NOT SERVE CLIENT

  app.use('/', api);

  app.get('/_health', (req, res) => res.send('OK'));

  app.use( mwErrorLogger ); // Errors sink

  app.listen(serverPort, () => console.log(`Listening on port: ${serverPort}`));
}

export {
  startApp
};