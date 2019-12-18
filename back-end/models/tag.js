const db = require("../database");
const knex = require("../database/database");

const tag = {
    get: async function (callback) {
        return knex
          .from("tags")
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
          .from("tags")
          .select()
          .where("id", id)
          .then(data => {
            callback.then(data);
          })
          .catch(err => {
            callback.catch(err);
          });
      },

      getByName: async function (name, callback) {
        return knex
          .from("tags")
          .select()
          .where("nameOfTag", name)
          .then(data => {
            callback.then(data);
          })
          .catch(err => {
            callback.catch(err);
          });
      },

      getByNameLike: async function (name, callback) {
        return knex
          .from("tags")
          .select()
          .where("nameOfTag", "like",  `%${name}%`)
          .then(data => {
            callback.then(data);
          })
          .catch(err => {
            callback.catch(err);
          });
      },

      add: async function (tag, callback) {
        return knex("tags")
          .insert([{ ...tag }])
          .then(data => {
            callback.then(data);
          })
          .catch(err => {
            callback.catch(err);
          });
      },

      delete: async function (id, callback) {
        return knex
          .from("tags")
          .delete()
          .where("id", id)
          .then(data => {
            callback.then(data);
          })
          .catch(err => {
            callback.catch(err);
          });
      },

      update: function (id, tag, callback) {
        return knex("tags")
          .where("id", id)
          .update({
            ...tag
          })
          .then(data => {
            callback.then(data);
          })
          .catch(err => {
            callback.catch(err);
          });
      }
}

module.exports = tag;