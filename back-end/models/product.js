var db = require('../database');
var product = {
  get: function(callback) {
    return db.query('select * from products', callback);
  },
  getById: function(id, callback) {
    return db.query('select * from products where idProduct=?', [id], callback);
  },
  // add: function(user, callback) {
    // return db.query(
      // 'insert into users values(?,?,?,?)',
      // [user.user_id, user.name, user.author, user.isbn],
      // callback
    // );
  // },
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
module.exports = product;