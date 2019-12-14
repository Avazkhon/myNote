const db = require('../db');

exports.all = (callback) => {
  db.get()
  .collection("Users")
  .find()
  .toArray(
    (err, result) => callback(err, result)
  );
}
