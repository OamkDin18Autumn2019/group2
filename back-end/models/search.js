var db = require('../database');
var knex = require("../database/database");

function isTag(tag, callback) {
  return knex
    .from('tags')
    .select()
    .where("nameOfTag", tag)
    .then(data => {
      callback.then(data);
    })
    .catch(err => {
      callback.catch(err);
    });
}

function logSomething() {
  return ("something");
}

var search = {
  searchKeyWord:

    /* function (word) {
      return knex
      .from("tags")
      .select()
      .where("nameOfTag", word);
    } */

    async function (keyword, callback) {
      var category = [];
      var tags = await isTag(keyword);
      console.log("keyword: ", keyword);
      console.log(tags);
      return ({});

      /* return knex
        .from('products')
        .select()
        .where("name", "like", `%${keyword}%`)
        .then(data => {
          callback.then(data);
        })
        .catch(err => {
          callback.catch(err);
        }); */
    }
}

module.exports = search;