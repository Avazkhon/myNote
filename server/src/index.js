const express = require('express')
const bodyParser = require('body-parser')

const app = express();

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));

const users = [
  {
    id: 1,
    name: 'Vlad',
    password: 123,
  }
]

app.get('/', (req, res) => {
  res.status = 200;
  res.send('my note');
});

app.post('/user', (req, res) => {
  if (req.body) {
    res.status = 400;
  }
  const {
    name,
    password,
  } = req.body;
  if (name && password && name.length && password.length) {
    users.push({
      id: Date.now(),
      name,
      password
    })
    res.status = 200;
  }
  res.send();
});

app.get('/user', (req, res) => {
  res.send(users);
})

app.listen(3000, () => {
  console.log('app my note starting!');
});
