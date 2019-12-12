const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser')

const app = express();

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser())
app.use(session({
  secret: 'keyboard cat',
  cookie: { maxAge: 60000 }
}))

let Users = [
  {
    id: 1,
    userName: 'Vlad',
    password: 123,
  }
]

app.post('/user', (req, res)  => {
  const {
    userName,
    password,
  } = req.body;
  let findUser = null;
  if (!userName || !password) {
    res.status(400);
    return res.send('нет данных')
  }
  findUser = Users.find(itm => itm.userName === userName);
  if (!findUser) {
    const newUser = {
      id: Date.now(),
      userName,
      password,
    }
    Users = [...Users, newUser];
    res.status = 200;
    req.session.user = newUser
    res.send('Пользователь успешно создан!');
  } else if (findUser && findUser.password === password) {
    res.status = 200;
    req.session.user = findUser
    res.send('Пользователь успешно авторизован!');
  } else {
    res.status = 401;
    res.send('Пользователь не может быть зарегистрирован!')
  }
  return null;
});

app.get('/user', (req, res) => {
  const {
    user,
  } = req.session;
  const findUser = user && Users.find(itm => itm.id === user.id);
  if (findUser) {
    res.status = 200
    res.send(Users);
  } else {
    res.status = 401;
    res.send('Пользователя нет прав!')
  }
})

app.listen(3000, () => {
  console.log('app my note starting!');
});
