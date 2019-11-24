var db = require('../database');
var knex = require("../database/database");

async function getTagId(name) {
  console.log("getTagId ran");
  return knex
    .from('tags')
    .select()
    .where("nameOfTag", name)
    .then(data => {
      if (data[0] !== undefined) {
        return (data[0].id);
      }
      else return null;
    })
    .catch(err => err);
}

async function getCategoryId(name) {
  console.log("getCategoryId ran");
  return knex
    .from('categories')
    .select()
    .where("nameOfCategory", name)
    .then(data => {
      if (data[0] !== undefined) {
        return (data[0].id);
      }
      else return null;
    })
    .catch(err => err);
}

var search = {
  searchKeyWord:
    async function (keyword, callback) {
      var keywords = keyword.q.split(" ");
      var name = "";
      var categories = "";
      var tags = [];
      var query = knex
        .from('products')
        .select()
        .where("name", "like", `%%`)
        .andWhere("category", "like", `%%`);

      const loadIn = async () => {
        console.log("loading in...")
        keywords.forEach(word => {
          await getTagId(word)
            .then(results => {
              if (results !== null) {
                tags.push(results);
                console.log("tags: ", tags.toString());
              }
            })
            .catch(err => err);
          getCategoryId(word)
            .then(results => {
              if (results !== null) {
                categories.push(results);
                console.log("categories: ", typeof (categories.toString()));
              }
            })
            .catch(err => err);
        });
      }

      /* console.log("keyword: ", keyword);
      console.log("array: ", keywords) */
      //console.log(categories);

      //return ({});


      loadIn().then(results => {
        console.log("done load in");
        tags.forEach(x => {
          query = query.andWhere("tags", "like", `%${x}%`);
        })
      })
        .then(resolve => {
          console.log("making request");
          return query
            .then(data => {
              callback.then(data);
            })
            .catch(err => {
              callback.catch(err);
            });
        })
        .catch(err => err)
    }
}

module.exports = search;