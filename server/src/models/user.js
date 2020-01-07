const db = require('../db');
const ObjectID = require('mongodb').ObjectID;

const mongoose = require('mongoose');
const schema = require('./schema');

const Note = mongoose.model('Users', schema.userSchema);

exports.postAddOne = (data, callBack) => {
  const note = new Note(data);
  note.save(callBack);
}

exports.all = (callBack) => {
  Note.find({}, callBack);
}

exports.getOneById = (id, callBack) => {
  Note.find({_id: id}, callBack);
}

exports.getOneByUserName = (userName, callBack) => {
  Note.findOne({userName: userName}, callBack);
}

exports.getOneByUserEmail = (email, callBack) => {
  Note.findOne({ email }, callBack);
}

exports.updateOne = (id, data, callBack) => {
  Note.findByIdAndUpdate({_id: id}, data, callBack);
}

exports.deleteOne = (id, callBack) => {
  Note.deleteOne({_id: id}, callBack);
}
