var db = require("../database");
var knex = require("../database/database");

var history = {
  
  get: async function (callback) {
    return knex
      .from("history")
      .select()
      .then(data => {
        callback.then(data);
      })
      .catch(err => {
        callback.catch(err);
      });
  },

  getById: async function (id, callback) {
    console.log(id);
    return knex
      .from("history")
      .select()
      .where("id", id)
      .then(data => {
        callback.then(data);
      })
      .catch(err => {
        callback.catch(err);
      });
  },

  getnewArrivals: async function (callback) {
    return knex
      .from('history')
      .select()
      .limit(8)
      .orderBy('created_at','desc')
      .then(data => {
        callback.then(data);
      })
      .catch(err => {
        callback.catch(err);
      });
  },


  add: async function (history, callback) {
    // console.log(history);
    return knex("history")
      .insert([{ ...history }])
      .then(data => {
        callback.then(data);
      })
      .catch(err => {
        callback.catch(err);
      });
  },

  delete: async function (id, callback) {
    return knex
      .from("history")
      .delete()
      .where("id", id)
      .then(data => {
        callback.then(data);
      })
      .catch(err => {
        callback.catch(err);
      });
  },

  update: function (id, history, callback) {

    return knex("history")
      .where("id", id)
      .update({
        ...history

      })
      .then(data => {
        callback.then(data);
      })
      .catch(err => {
        callback.catch(err);
      });
  }
};

module.exports = history;
