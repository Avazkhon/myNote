const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

const passwords = require('../password');

const uri = `mongodb+srv://Avazkhon:${passwords.passwordMongoDB}@cluster0-sgdif.mongodb.net/myNote?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useUnifiedTopology: true });

async function connect(done) {
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
      var db = mongoose.connection;
      db.on('error', console.error.bind(console, 'connection error:'));
      done();
  });
}

const state = {
  db: null,
};

function connectMonoDb (done) {
  client.connect(err => {
    if (err) {
      done(err);
      return null;
    }
    const collection = client.db("myNote");
    state.db = collection;
  });
}

exports.get = () => state.db;

exports.connect = function(done) {
  connectMonoDb(connect(done))
}
