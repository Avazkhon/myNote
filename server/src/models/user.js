const db = require('../db');
const ObjectID = require('mongodb').ObjectID;

exports.all = (callback) => {
  db.get()
  .collection("Users")
  .find()
  .toArray(
    (err, result) => callback(err, result)
  );
}
exports.getOne = (callback, id) => {
  db.get().collection('Users')
  .findOne({ _id: ObjectID(id)}, (err, result) => {
    callback(err,result);
  })
}
