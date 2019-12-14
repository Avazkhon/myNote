const userModels = require('../models/user');

exports.getOne = (params, res) => {
  if (params.id) {
    userModels.getOneById((err, result) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      if (!result) {
        res.status = 404
        return res.send('User не найден!');
      }
      res.status = 200
      res.send(result);
    }, params.id)
  } else if (params.userName) {
    userModels.getOneByUserName((err, result) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      if (!result) {
        res.status = 404
        return res.send('User не найден!');
      }
      res.status = 200
      res.send(result);
    }, params.userName)
  } else if (params.all) {
    userModels.all((err, result) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      if (!result) {
        res.status = 404
        return res.send('User не найден!');
      }
      res.status = 200
      res.send(result);
    })
  }
}
