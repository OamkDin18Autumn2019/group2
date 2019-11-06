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
  delete: function(id, callback) {
    return db.query('delete from products where idProduct=?', [id], callback);
  },
  update: function(id, product, callback) {
    return db.query(
      "UPDATE `products` SET `idProduct` = ?, `idUser` = ?, `price` = ?, `amountOfProduct` = ?, `name` = ?, `ratingProduct` = ?, `amountOfRates` = ?, `description` = ?, `dateOfAdding` = ?, `amountOfSoldProduct` = ?, `photos` = ?, `category` = ? WHERE `products`.`idProduct` = ?",
      [product.idProduct, product.idUser, product.price, product.amountOfProduct, product.name, product.ratingProduct, product.amountOfRates, product.description, product.dateOfAdding, product.amountOfSoldProduct, product.photos, product.category, id],
      callback
    );
  }
};
module.exports = product;