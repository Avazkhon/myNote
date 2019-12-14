const MongoClient = require('mongodb').MongoClient;
const passwords = require('../password');
const uri = `mongodb+srv://Avazkhon:${passwords.passwordMongoDB}@cluster0-sgdif.mongodb.net/test?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useUnifiedTopology: true });

const state = {
  db: null,
};

exports.connect = function(done) {
  client.connect(err => {
    if (err) {
      done(err);
      return null;
    }
    const collection = client.db("myNote");
    state.db = collection;
    done();
    // client.close();
  });
}

exports.get = () => state.db;
