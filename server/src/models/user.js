const db = require('../db');

exports.all = (callback) => {
  db.get()
  .collection("Users")
  .find()
  .toArray(
    (err, result) => callback(err, result)
  );
}
exports.getOne = (callback) => {
  db.get().collection('Users')
  .findOne({ _id: ObjectID(id)}, (err, result) => {
    callback(err,result);
  })
}
