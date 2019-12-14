const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const ObjectID = require('mongodb').ObjectID;

const db = require('./db');
const userControllers = require('./controllers/user');

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

app.get('/user', userControllers.getUser); // обрабатывает запросы по userName, id и all
app.post('/user', userControllers.postAddOne);

app.put('/user/:id', (req, res) => {
  const { userName, password, isAdmin } = req.body;
  const { id } = req.params;
  const user = { userName, password, isAdmin };

  db.get().collection('Users')
  .updateOne(
    { _id: ObjectID(id) },
    { $set: user },
    (err, result) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      res.status = 200;
      res.send('Пользователь успешно обнавлен!')
    }
  )
})

app.delete('/user/:id', (req, res) => {
  const { id } = req.params;
  db.get().collection('Users')
  .deleteOne(
    { _id: ObjectID(id) },
    (err, result) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500)
      }
      res.status = 200;
      res.send('Пользователь успешно удален!')
    }
  )
})

db.connect((err) => {
  if (err) {
    return console.log(err);
  }
  app.listen(3000, () => {
    console.log('app my note starting!');
  })
});
