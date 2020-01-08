const mongoose = require('mongoose');
const Schema = mongoose.Schema;

exports.noteSchema = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    createDate: { type: Date, default: Date.now },
    activeChapter: String,
    author: { type: mongoose.ObjectId, required: true },
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

exports.userSchema = new Schema(
  {
    userName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    isAdmin: { type: Boolean },
    notesList: [{ idNote: mongoose.ObjectId }]
  },
  { collection: 'Users' }
);
