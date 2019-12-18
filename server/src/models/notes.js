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
