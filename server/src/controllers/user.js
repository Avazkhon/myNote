const userModels = require('../models/user');


exports.all = (req, res) => userModels.all((err, result) => {
  if (err) {
    console.log(err);
    return res.sendStatus(500);
  }
  res.status = 200;
  res.send(result);
})
