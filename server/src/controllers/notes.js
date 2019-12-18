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

exports.get = (req, res) => {
  const {
    id
  } = req.query;

  if (id) {
    return notes.findById(id, (err, result) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      res.send(result);
    });
  }

  notes.findAll({}, (err, result) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(result);
  });
}

exports.delete = (req, res) => {
  const {
    id
  } = req.query;

  notes.findById(id, (err, result) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    if (!result.length) {
      res.status(404);
      return res.send('Запись не найдена!');
    }

    notes.deleteOne(result[0]._id, (result) => {
      if (result) {
        res.status(404);
        res.send('Запись не удалина!');
      }
      res.status(200);
      return res.send('Запись удалина!');
    });
  });
}
