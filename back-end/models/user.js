var db = require('../database');
const bcrypt = require('bcryptjs');
const saltRounds = 4;

var user = {
  get: function (callback) {
    return db.query('select * from users', callback);
  },
  getById: function (id, callback) {
    return db.query('select * from users where idUser=?', [id], callback);
  },
  add: function (user, callback) {
    bcrypt.hash(user.password, saltRounds).then(hash => {
      return db.query(
        'insert into users (username, email, password, ratingUser, amountOfRates) values(?,?,?,?,?)',
        [user.username, user.email, hash, 0, 0],
        callback
      );
    }
    )
  },
  delete: function (id, callback) {
    return db.query('delete from users where idUser=?', [id], callback);
  },
  update: function (id, user, callback) {
    bcrypt.hash(user.password, saltRounds).then(hash => {
      return db.query(
        "UPDATE `users` SET  `username` = ?, `email` = ?, `password` = ?, `ratingUser` = ?, `amountOfRates` = ? WHERE `users`.`idUser` = ?",
        [user.username, user.email, hash, user.ratingUser, user.amountOfRates, id],
        callback
      );
    }
    )
  }
};
module.exports = user;