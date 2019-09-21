import mongoose from 'mongoose';
//const mongodbUri = `mongodb://${config.db.address}:${config.db.port}/${config.db.name}`
// const mongodbUri = `mongodb://developer:developer1@ds059712.mlab.com:59712/catalyst`;
let mongodbUri = '';
const dbConnection = mongoose.connection;

function connectToDb(){
  return new Promise( (resolve, reject)=>{
    let { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS } = process.env;
    let credentials = `${DB_USER}:${DB_PASS}@`;
    mongodbUri = `mongodb://${credentials}${DB_HOST}:${DB_PORT}/${DB_NAME}`;

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
  connectToDb
};
