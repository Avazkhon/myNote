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

exports.getOneById = (id, callback) => {
  db.get().collection('Users')
  .findOne({ _id: ObjectID(id)}, (err, result) => callback(err, result))
}

exports.getOneByUserName = (userName, callback) => {
  db.get().collection('Users')
  .findOne({ userName }, (err, result) => callback(err, result))
}

exports.postAddOne = (user, callback) => {
  db.get().collection('Users')
  .insertOne(user , (err, result) => callback(err, result));
}

exports.updateOne = (id , user, callback) => {
  db.get().collection('Users')
  .updateOne(
    { _id: ObjectID(id) },
    { $set: user },
    (err, result) => callback(err, result)
  );
}
