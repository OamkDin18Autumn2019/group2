var db = require('../database');
var product = {
  get: function(callback) {
    return db.query('select * from products', callback);
  },
  getById: function(id, callback) {
    console.log(id);
    return db.query('select * from products where idProduct=?', [id], callback);
  },
  add: function(product, callback) {
    return db.query(
      'insert into products (idUser, price, amountOfProduct, name, ratingProduct, amountOfRates, description, amountOfSoldProduct, photos, category) values (?,?,?,?,?,?,?,?,?,?)',
      [product.idUser, product.price, product.amountOfProduct, product.name, 0, 0, product.description, 0, product.photos, product.category],
      callback
    );
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
module.exports = product;