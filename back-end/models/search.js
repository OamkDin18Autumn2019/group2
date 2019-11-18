var db = require('../database');
var knex = require("../database/database");

var search = {
    searchKeyWord: async function (keyword, callback) {
        console.log("keyword: ", keyword)
        return knex
          .from('products')
          .select()
          .where("name", "like", `%${keyword}%`)
          .then(data => {
            callback.then(data);
          })
          .catch(err => {
            callback.catch(err);
          });
      }
}

module.exports = search;