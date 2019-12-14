const userModels = require('../models/user');
const getOne = require('./getOne');


exports.all = (req, res) => userModels.all((err, result) => {
  if (err) {
    console.log(err);
    return res.sendStatus(500);
  }
  res.status = 200;
  res.send(result);
})


exports.getOne = (req, res) => {
  const {
    id,
    name,
    all,
  } = req.query;
  getOne.getOneById(id, res);
}
