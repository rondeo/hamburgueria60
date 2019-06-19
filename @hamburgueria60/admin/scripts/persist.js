const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017/h60';

const connect = () => new Promise((resolve) => {
  MongoClient.connect(url, {
    useNewUrlParser: true,
    user: 'root',
    password: '',
  }, (err, connection) => {
    resolve(connection);
  });
});

const drop = (db, collectionName) => {
  try {
    return db.collection(collectionName).drop();
  } catch (e) {
    console.log(typeof e);
  }
  return null;
};

const insertMany = async (db, collectionName, data) => {
  try {
    await drop(db, collectionName);
    await db.collection(collectionName).insertMany(data);
  } catch (e) { console.error(e); }
};

module.exports = {
  connect,
  insertMany,
};
