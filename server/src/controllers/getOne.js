const userModels = require('../models/user');

exports.getOneById = (id, res) => {
  userModels.getOne((err, result) => {
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
  }, id)
}
