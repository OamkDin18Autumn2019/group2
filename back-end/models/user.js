var db = require('../database');
const bcrypt = require('bcryptjs');
const saltRounds = 4;

var user = {
  get: function(callback) {
    return db.query('select * from users', callback);
  },
  getById: function(id, callback) {
    return db.query('select * from users where idUser=?', [id], callback);
  },
  add: function(user, callback) {
    bcrypt.hash(user.password, saltRounds).then(hash => {
        return db.query(
        'insert into users (username, password, email, ratingUser, amountOfRates) values(?,?,?,?,?)',
        [user.username, user.email, hash, 0, 0],
        callback
      );
    }
    )   
  },
  // delete: function(id, callback) {
    // return db.query('delete from users where user_id=?', [id], callback);
  // },
  // update: function(id, user, callback) {
    // return db.query(
      // 'update book set name=?,author=?, isbn=? where book_id=?',
      // [book.name, book.author, book.isbn, id],
      // callback
    // );
  // }
};
module.exports = user;