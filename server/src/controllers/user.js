const userModels = require('../models/user');
const getUser = require('./getUser');

exports.getUser = (req, res) => {
  const {
    id,
    userName,
    all,
  } = req.query;
  const params = (id && {id}) || (userName && {userName}) || (all === 'true' && {all});
  if (params) {
    return getUser.getOne(params, res);
  }

  res.status = 400;
  res.send('Нет параметров!')
}
