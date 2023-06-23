import * as mongodb from 'mongodb';

const { MongoClient, ServerApiVersion } = mongodb;
const uri = process.env.DB_URI || '';

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let _db: mongodb.MongoClient;

export const initDb = (callback: any) => {
  if (_db) {
    console.log('Db is already initialized!');
    return callback(null, _db);
  }
  client
    .connect()
    .then((client) => {
      _db = client;
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

export const getDb = () => {
  if (!_db) {
    throw Error('Db not initialized');
  }
  return _db;
};
