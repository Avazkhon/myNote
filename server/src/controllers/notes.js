const mongoose = require('mongoose');

const notes = require('../models/notes')

exports.save = (req, res) => {
  const {
    title,
    text,
  } = req.body;
  if (!title && !text) {
    res.status = 400;
    return res.send('Не достаточно небходимых данных!')
  }
  notes.save(req.body, (err, result) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(result);
  })
}

exports.find = (req, res) => {
  notes.find({}, (err, result) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(result);
  });
}
