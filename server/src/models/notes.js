const mongoose = require('mongoose');

const schema = require('./schema');

const Note = mongoose.model('Note', schema.noteSchema);

exports.save = (data, callBack) => {
  const note = new Note(data);
  note.save((err, result) => callBack(err, result));
}

exports.findAll = (data, callBack) => {
  Note.find({}, (err, result) => callBack(err, result));
}

exports.findById = (id, callBack) => {
  Note.find({_id: id}, (err, result) => callBack(err, result));
}

exports.deleteOne = (id, callBack) => {
  Note.deleteOne({_id: id}, (result, err) => callBack(result, err));
}

exports.findByIdAndUpdate = (id, data, callBack) => {
  Note.findByIdAndUpdate({_id: id}, data, (err, result) => callBack(err, result));
}
