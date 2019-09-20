import mongoose from 'mongoose';
import config from '../../config/dev.json';
//const mongodbUri = `mongodb://${config.db.address}:${config.db.port}/${config.db.name}`
// const mongodbUri = `mongodb://developer:developer1@ds059712.mlab.com:59712/catalyst`;
let mongodbUri = '';
const dbConnection = mongoose.connection;

let connectToSandboxDb = () => {
  return new Promise( (resolve, reject)=>{

    if( !config ){
      console.error('Missing config file.');
    }

    let { DB_ADDRESS, DB_PORT, DB_NAME, DB_USER, DB_PASS } = process.env;
    // let { address, port, name, user, pwd } = config.db[dbLocation];
    let credentials = `${DB_USER}:${DB_PASS}@`;
    mongodbUri = `mongodb://${credentials}${DB_ADDRESS}:${DB_PORT}/${DB_NAME}`;

    console.log(`db uri: ${mongodbUri}`);

    mongoose.connect( mongodbUri, {
      keepAlive: true,
      reconnectTries: Number.MAX_VALUE,
      useNewUrlParser: true
    });

    dbConnection.on('error',()=>{
      reject( new Error('cannot connect to DB') );
    });

    dbConnection.once('open',()=>{
      resolve(dbConnection);
    });
  });
};

let connectToLocalDb = () => {
  return connectToDb( 'localhost' );
};

function connectToDb( dbLocation ){
  return new Promise( (resolve, reject)=>{

    if( !config ){
      throw new Error('Missing config file');
      // console.error('.');
    }

    let { address, port, name, user, pwd } = config.db[dbLocation];
    let credentials = user?`${user}:${pwd}@`:'';
    mongodbUri = `mongodb://${credentials}${address}:${port}/${name}`;

    console.log(`db uri: ${mongodbUri}`);

    mongoose.connect( mongodbUri, {
      keepAlive: true,
      reconnectTries: Number.MAX_VALUE,
      useNewUrlParser: true
    });

    dbConnection.on('error',()=>{
      reject( new Error('cannot connect to DB') );
    });

    dbConnection.once('open',()=>{
      console.log('Connected');
      resolve(dbConnection);
    });
  });
}

export { 
  dbConnection, 
  connectToSandboxDb, 
  connectToLocalDb 
};
