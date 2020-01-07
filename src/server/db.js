import mongoose from 'mongoose';
let mongodbUri = '';
const dbConnection = mongoose.connection;

function connectToDb(){
  return new Promise( async (resolve, reject)=>{
    let { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS } = process.env;
    let credentials = `${DB_USER}:${DB_PASS}@`;

    mongodbUri = `mongodb://${credentials}${DB_HOST}:${DB_PORT}/${DB_NAME}`;
    
    mongoose.connect( mongodbUri, {
      keepAlive: true,
      reconnectTries: Number.MAX_VALUE,
      useNewUrlParser: true
    }).catch( err=>{
      console.error(err);
      reject(err);
    });

    dbConnection.once('open',()=>{
      console.log(`Connected to DB ${DB_NAME}`);
      resolve(dbConnection);
    });

    dbConnection.on('error',err=>{
      console.error(err);
    });

    dbConnection.on('reconnected',()=>{
      console.log(`Reconnected to DB ${DB_NAME}`);
    });
  });
}

export {
  dbConnection,
  connectToDb
};
