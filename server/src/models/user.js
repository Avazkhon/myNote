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

exports.getOneByUserName = (userName, callBack) => {
  Note.find({userName: userName}, (err, result) => callBack(err, result));
}

exports.updateOne = (id, data, callBack) => {
  Note.findByIdAndUpdate({_id: id}, data, (err, result) => callBack(err, result));
}

exports.deleteOne = (id, callBack) => {
  Note.deleteOne({_id: id}, (result, err) => callBack(result, err));
}
