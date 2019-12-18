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
  notes.deleteOne(id, (err, result) => {
    if (err) {
      res.status(500);
      return res.send('Запись не удалина!');
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
    title
  } = req.body;

  if (!id || !text || !title) {
    res.status(400);
    return res.send('Не хватает данных!');
  }

  const data = {
    text,
    title
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
