var db = require('../database');
var knex = require("../database/database");

var search = {
  searchKeyWord:
    async function (keyword, callback) {
      var keywordsArray = keyword.q.split(" ");
      var categories = [];
      var tags = [];
      var data = [];

      //Sort tags out and push them to $tags
      for (let i = 0; i < keywordsArray.length; i++) {
        let j = await knex
          .from('tags')
          .select()
          .where("nameOfTag", keywordsArray[i]);
        if (j.length !== 0) {
          tags.push(j[0]);
        }
      }
      tags.forEach(i => { keywordsArray.splice(keywordsArray.indexOf(i.nameOfTag), 1) });

      //Sort categories out and push them to $categories
      for (let i = 0; i < keywordsArray.length; i++) {
        let j = await knex
          .from('categories')
          .select()
          .where("nameOfCategory", keywordsArray[i]);
        if (j.length !== 0) {
          categories.push(j[0]);
        }
      }
      categories.forEach(i => { keywordsArray.splice(keywordsArray.indexOf(i.nameOfCategory), 1) });

      //Construct queries and send to the database, then push data to $data
      //In case of no product name in query
      if (keywordsArray.length === 0) {
        let query = knex
          .from('products')
          .select()    
        categories.forEach(x => {
          query = query.andWhere("category", "like", `%${x.id}%`);
        })
        tags.forEach(x => {
          query = query.andWhere("tags", "like", `%${x.id}%`);
        })
        let item = await query;
        if (item.length !== 0) {
          item.forEach(i=>data.push(i));  
        }
      }
      //In case of one or more product names in query
      else {
        for (let i = 0; i < keywordsArray.length; i++) {
          let query = knex
            .from('products')
            .select()
            .where("name", "like", `%${keywordsArray[i]}%`);
          categories.forEach(x => {
            query = query.andWhere("category", "like", `%${x.id}%`);
          })
          tags.forEach(x => {
            query = query.andWhere("tags", "like", `%${x.id}%`);
          })
          let item = await query;
          if (item.length !== 0) {
            item.forEach(i=>data.push(i));  
          }

        }
      }

      return (
        callback.then(data)
      );
    }



}

//Search function made bu Prabhjot
const search2 = async ({ body }, res) => {

  let results = [];
  console.log(body.names);


  for (let i = 0; i < body.names.length; i++) {

    const nameResults = await knex("products").select()
      .where("name", "like", `%${body.names[i]}%`);

    const tagIds = await knex("tags").select()
      .where("nameOfTag", "like", `%${body.names[i]}%`);

    console.log(tagIds);


  }


  res.json(results);
}
module.exports = search;
module.exports.search2 = search2;