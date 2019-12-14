const userModels = require('../models/user');
const handlier = (err, result, res) => {
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
}

exports.getOne = (params, res) => {
  if (params.id) {
    userModels.getOneById((err, result) => handlier(err, result, res), params.id)
  } else if (params.userName) {
    userModels.getOneByUserName((err, result) => handlier(err, result, res), params.userName)
  } else {
    userModels.all((err, result) => handlier(err, result, res))
  }
}
