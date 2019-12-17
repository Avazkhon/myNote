const mongoose = require('mongoose');

const schema = require('./schema');

exports.save = (data, callBack) => {
  const Note = mongoose.model('Note', schema.noteSchema);
  const note = new Note(data);
  note.save((err, result) => callBack(err, result));
}
