const db = require('../db');
const ObjectID = require('mongodb').ObjectID;

const mongoose = require('mongoose');
const schema = require('./schema');

const Note = mongoose.model('Users', schema.userSchema);

exports.postAddOne = (data, callBack) => {
  const note = new Note(data);
  note.save((err, result) => callBack(err, result));
}

exports.all = (callBack) => {
  Note.find({}, (err, result) => callBack(err, result));
}

exports.getOneById = (id, callBack) => {
  Note.find({_id: id}, (err, result) => callBack(err, result));
}

exports.getOneByUserName = (userName, callback) => {
  db.get().collection('Users')
  .findOne({ userName }, (err, result) => callback(err, result))
}

exports.updateOne = (id , user, callback) => {
  db.get().collection('Users')
  .updateOne(
    { _id: ObjectID(id) },
    { $set: user },
    (err, result) => callback(err, result)
  );
}

exports.deleteOne = (id, callback) => {
  db.get().collection('Users')
  .deleteOne(
    { _id: ObjectID(id) },
    (err, result) => callback(err, result)
  );
}
