const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const db = require('./db');

const userControllers = require('./controllers/user');
const notesControllers = require('./controllers/notes');

const app = express();
const router = express.Router()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(session({
  secret: 'my notes for all and every',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));

app.use('/notes', function (req, res, next) {
  if (req.session.user) {
    next();
  } else {
    console.log('Пользователь не авторизован!');
    res.status(401);
    res.send('Пользователь не авторизован!')
  }
});

app.post('/auth', userControllers.auth); // один роут для входа и выхода

app.route('/user')
  .get(userControllers.getUser) // обрабатывает запросы по userName, id и all
  .post(userControllers.postAddOne)
  .put(userControllers.updateOne)
  .delete(userControllers.deleteOne);

app.route('/notes')
  .get(notesControllers.get)
  .post(notesControllers.save)
  .put(notesControllers.findByIdAndUpdate)
  .delete(notesControllers.delete);

db.connect((err) => {
  if (err) {
    return console.log(err);
  }
  app.listen(3000, () => {
    console.log('app my note starting!');
  });
});
