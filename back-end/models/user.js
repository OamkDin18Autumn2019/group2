var knex = require("../database/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 4;
const jwtKey = "BWWrCs!|M;e*oU.YWJ_W+6jposZKF-";

function generateAuthToken(id, isAdmin = false) {
  const token = jwt.sign(
    {
      id,
      isAdmin
    },
    jwtKey,
    { expiresIn: "1h" }
  );
  return token;
}
var user = {
  createTableUsers: async () => {
    knex.schema.hasTable("users").then(function (exists) {
      if (!exists) {
        return knex.schema.createTable("users", function (t) {
          t.increments("id").primary();
          t.string("username", 255);
          t.string("email", 255);
          t.string("password", 255);
          t.integer("ratingUser").defaultTo(0);
          t.integer("amountOfRates").defaultTo(0);
          t.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
          t.dateTime('updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'))
        });
      } else {
        return null;
      }
    });
  },
  createTableHistory: async () => {
    knex.schema.hasTable("history").then(function (exists) {
      if (!exists) {
        return knex.schema.createTable("history", function (t) {
          t.increments("id").primary();
          t.integer("idUser", 10)
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('users');
          t.integer("idProduct", 10)
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('products');
          t.integer("amount").defaultTo(1);
          t.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
          
        });
      } else {
        return null;
      }
    });
  },

  get: async function (callback) {
    return knex.from("users").select("*").then(data => {
      callback.then(data);
    })
      .catch(err => {
        callback.catch(err);
      });
  },

  getById: async function (id, callback) {
    console.log(id)
    return knex
      .from('users')
      .select()
      .where("id", id)
      .then(data => {
        callback.then(data);
      })
      .catch(err => {
        callback.catch(err);
      });

  },

  add: function (user, callback) {
    console.log(user)
    bcrypt.hash(user.user.password, saltRounds).then(hash => {
      return knex("users")
        .insert([{ ...user.user, password: hash }])
        .then(data => {
          callback.then(data);
        })
        .catch(err => {
          callback.catch(err);
          console.log(err);
        });
    });
  },
  login: async function (user, callback) {
    console.log(user);
    let userData = await knex
      .from('users')
      .select()
      .where("username", user.user.username)
    userData = userData[0];
    if (userData == null) {
      return { code: 0 };
    }
    const correctPasswordSwitch = await bcrypt.compare(
      user.user.password,
      userData.password
    );
    console.log(correctPasswordSwitch);
    if (correctPasswordSwitch) {
      return {
        user: userData,
        code: 1,
        token: generateAuthToken(userData.idUser, false)
      };
    } else {
      return {
        code: 0
      };
    }
  },
  delete: async function (id, callback) {
    return knex
      .from('users')
      .delete()
      .where('id', id)
      .then(data => {
        callback.then(data);
      })
      .catch(err => {
        callback.catch(err);
      });
  },
  update: function (id, user, callback) {
    if (user.password) {
         bcrypt.hash(user.password, saltRounds).then(hash => {
      console.log(user);
      return knex('users').where('id', id)
        .update(
          ({ 
           ...user,
            password: hash,
          })
        )
        .then(data => {
          callback.then(data);
        })
        .catch(err => {
          callback.catch(err);
        });
    });
    } else {
        return knex('users').where('id', id)
          .update(
            ({ 
             ...user,
           })
          )
          .then(data => {
            callback.then(data);
          })
          .catch(err => {
            callback.catch(err);
          });
    }
 
      // return knex.raw(
      //   "UPDATE `users` SET  `username` = ?, `email` = ?, `password` = ?, `ratingUser` = ?, `amountOfRates` = ? WHERE `users`.`idUser` = ?",
      //   [
      //     user.username,
      //     user.email,
      //     hash,
      //     user.ratingUser,
      //     user.amountOfRates,
      //     id
      //   ],
      // )
      // .then(data => {
      //   callback.then(data);
      // })
      // .catch(err => {
      //   callback.catch(err);
      // });
  }
};
module.exports = user;
