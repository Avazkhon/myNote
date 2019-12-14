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
app.put('/user', userControllers.updateOne);
app.delete('/user', userControllers.deleteOne);


db.connect((err) => {
  if (err) {
    return console.log(err);
  }
  app.listen(3000, () => {
    console.log('app my note starting!');
  })
});
