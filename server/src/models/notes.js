const mongoose = require('mongoose');

const schema = require('./schema');

const Note = mongoose.model('Note', schema.noteSchema);

exports.save = (data, callBack) => {
  const note = new Note(data);
  note.save(callBack);
}

exports.findAll = (data, callBack) => {
  Note.find({}, callBack);
}

exports.findById = (id, callBack) => {
  Note.find({_id: id}, callBack);
}

exports.deleteOne = (id, callBack) => {
  Note.deleteOne({_id: id}, callBack);
}

exports.findByIdAndUpdate = (id, data, callBack) => {
  Note.findByIdAndUpdate({_id: id}, data, (err, result) => callBack(err, result));
}
