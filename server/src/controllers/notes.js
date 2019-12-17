const mongoose = require('mongoose');

const users = require('../models/notes')

exports.save = (req, res) => {
  const {
    title,
    text,
  } = req.body;
  if (!title && !text) {
    res.status = 400;
    return res.send('Не достаточно небходимых данных!')
  }
  users.save(req.body, (err, result) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(result);
  })
}
