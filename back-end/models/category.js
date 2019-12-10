const db = require("../database");
const knex = require("../database/database");

const category = {
    get: async function (callback) {
        return knex
          .from("categories")
          .select()
          .then(data => {
            callback.then(data);
          })
          .catch(err => {
            callback.catch(err);
          });
      },
}

module.exports = category;