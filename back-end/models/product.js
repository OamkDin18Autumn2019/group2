var db = require("../database");
var knex = require("../database/database");

var product = {
  createTableProducts: async () => {
    knex.schema.hasTable("products").then(function (exists) {
      if (!exists) {
        return knex.schema.createTable("products", function (t) {
          t.increments("id").primary();
          t.integer("idUser", 10)
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("users");
          t.text("name", 255);
          t.float("price", 25, 2);
          t.float("discount", 4, 2)
          .defaultTo(0);
          t.text("description", 1024);
          t.float("ratingProduct", 10, 2)
            .defaultTo(0);
          t.integer("amountOfRates")
            .defaultTo(0);
          t.string('tags', 512);
          t.string('category');
          t.integer('amountOfProduct');
          t.integer('amountOfSoldProduct');
          t.string('images', 1024);
          t.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
          t.dateTime('updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'))
        });
      } else {
        return null;
      }
    });
  },

  createTableCategories: async () => {
    knex.schema.hasTable("categories").then(function (exists) {
      if (!exists) {
        return knex.schema.createTable("categories", function (t) {
          t.increments("id").primary();
          t.string("nameOfCategory");
        });
      } else {
        return null;
      }
    });
  },

  createTableTags: async () => {
    knex.schema.hasTable("tags").then(function (exists) {
      if (!exists) {
        return knex.schema.createTable("tags", function (t) {
          t.increments("id").primary();
          t.string("nameOfTag");
        });
      } else {
        return null;
      }
    });
  },

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
    console.log(id);
    return knex
      .from("products")
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
      .from('products')
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

  getByUserId: async function (id, callback) {
    console.log(id);
    return knex
      .from("products")
      .select()
      .where("idUser", id)
      .then(data => {
        callback.then(data);
      })
      .catch(err => {
        callback.catch(err);
      });
  },
  add: async function (product, callback) {
    // console.log(product);
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
      .from("products")
      .delete()
      .where("id", id)
      .then(data => {
        callback.then(data);
      })
      .catch(err => {
        callback.catch(err);
      });
  },

  update: function (id, product, callback) {

    return knex("products")
      .where("id", id)
      .update({
        ...product

      })
      .then(data => {
        callback.then(data);
      })
      .catch(err => {
        callback.catch(err);
      });
  }
};

module.exports = product;
