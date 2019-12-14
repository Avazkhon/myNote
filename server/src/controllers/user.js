const userModels = require('../models/user');


exports.all = (req, res) => userModels.all((err, result) => {
  if (err) {
    console.log(err);
    return res.sendStatus(500);
  }
  res.status = 200;
  res.send(result);
})
exports.getOne = (req, res) => userModels.getOne((err, result) => {
  const {
    id,
  } = req.params;
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
