const userModels = require('../models/user');
const getUser = require('./getUser');

exports.getUser = (req, res) => {
  const { id, userName, all } = req.query;
  const params = (id && {id}) || (userName && {userName}) || (all === 'true' && {all});

  if (params) {
    return getUser.getOne(params, res); // эта функция сама определяет какой тип параметра
  }

  res.status = 400;
  res.send('Нет параметров!')
}

exports.postAddOne = (req, res) => {
  const { userName, password, isAdmin } = req.body;
  const user = { userName, password, isAdmin };

  if (!userName || !password) {
    res.status(400);
    return res.send('нет данных')
  }

  userModels.getOneByUserName(
    userName,
    (err, result) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }

      if (result) {
        res.status = 401;
        return res.send('Пользователь не может быть зарегистрирован!')
      }

      userModels.postAddOne(
        user,
        (err, result) => {
          if (err) {
            console.log(err);
            return res.sendStatus(500);
          }

          res.status = 200;
          res.send('Пользователь успешно зарегистрирован!')
        }
      );

    }
  );

}
