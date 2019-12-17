const mongoose = require('mongoose');
const Schema = mongoose.Schema;

exports.noteSchema = new Schema(
  {
    title: String,
    text: String,
    createDate: { type: Date, default: Date.now },
    activeChapter: String,
    chapters: [
      {
        title: String,
        text: String,
        id: { type: Date, default: Date.now }
      }
    ]
  },
  { collection: 'Notes' }
);
