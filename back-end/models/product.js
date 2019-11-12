var db = require('../database');
var knex = require("../database/database");

var product = {
  get: async function (callback) {
    return knex
    .from("products")
    .select()
    .then(data => {
      callback.then(data);
    })
      .catch(err => {
        callback.catch(err);
      });
  },

  getById: async function (id, callback) {
    console.log(id)
    return knex
      .from('products')
      .select()
      .where("id", id)
      .then(data => {
        callback.then(data);
      })
      .catch(err => {
        callback.catch(err);
      });

  },
  add: async function(product, callback) {
      return knex("products")
        .insert([{ ...product }])
        .then(data => {
          callback.then(data);
        })
        .catch(err => {
          callback.catch(err);
        });
  },
  delete: async function (id, callback) {
    return knex
      .from('products')
      .delete()
      .where('id', id)
      .then(data => {
        callback.then(data);
      })
      .catch(err => {
        callback.catch(err);
      });
  },
  update: function(id, product, callback) {
    return knex('products').where('id', id)
    .update(
      ({ 
       ...product,
      })
    )
    .then(data => {
      callback.then(data);
    })
    .catch(err => {
      callback.catch(err);
    });
  }
};
module.exports = product;