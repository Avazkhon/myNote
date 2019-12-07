const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.status = 200;
  res.send('my note');
})

app.listen(3000, () => {
  console.log('app my note starting!');
})
