const mongoose = require('mongoose');

const notes = require('../models/notes');

exports.save = (req, res) => {
  if (!req.body.author) {
    req.body.author = req.session.user.id;
  }
  notes.save(req.body, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500);
      return res.send(err);
    }
    res.send(result);
  })
}

exports.get = (req, res) => {
  const { id } = req.query;
  const author = req.session.user.id;
  if (id) {
    return notes.findById({ id, author }, (err, result) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      res.send(result);
    });
  }

  notes.findAll(author, (err, result) => {
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
  req.session.user.id
  const data = { id, author: req.session.user.id };
  notes.deleteOne(data, (err, result) => {
    if (err) {
      res.status(500);
      return res.send('Запись не удалина!', err);
    }

    if (result.deletedCount) {
      res.status(200);
      return res.send('Запись удалина!');
    }
    res.status(404);
    res.send('Запись не удалина!');
  });
}

exports.findByIdAndUpdate = (req, res) => {
  const {
    id
  } = req.query;
  const {
    text,
    title,
    author
  } = req.body;

  const data = {
    text,
    title,
    author: author || req.session.user.id,
  };

  notes.findByIdAndUpdate(id, data, (err, result) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    res.status = 200;
    res.send("Запись успешно обновлен!")
  });
}
