const mongoose = require('mongoose');

const schema = require('./schema');

const Note = mongoose.model('Note', schema.noteSchema);

exports.save = (data, callBack) => {
  const note = new Note(data);
  note.save(callBack);
}

exports.findAll = (author, callBack) => {
  Note.find({ author }, callBack);
}

exports.findById = (data, callBack) => {
  Note.findOne({ _id: data.id, author: data.author }, callBack);
}

exports.deleteOne = (data, callBack) => {
  Note.deleteOne({ _id: data.id, author: data.author }, callBack);
}

exports.findByIdAndUpdate = (id, data, callBack) => {
  Note.findByIdAndUpdate({_id: id}, data, callBack);
}
