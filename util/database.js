const dotenv = require("dotenv");
dotenv.config();
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    // "mongodb+srv://returnpie:MBeq4M910DIKfizJ@cluster0.izand.mongodb.net/shop?retryWrites=true&w=majority"
    process.env.MONGODB
  )
    .then((client) => {
      console.log("Connected!");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
