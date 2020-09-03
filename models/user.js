const mongodb = require("mongodb");
const db = require("../util/database").getDb;

class User {
  constructor(username, email) {
    this.name = username;
    this.email = email;
  }

  save() {
    const db = getDb();
    return db
      .collection("user")
      .insertOne(this)
      .then(() => {
        console.log("CREATED USER");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection("user")
      .findOne({ _id: new mongodb.ObjectID(userId) })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = User;
