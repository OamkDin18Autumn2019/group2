var db = require("../database/database");
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
  createTable: async () => {
    db.schema.hasTable("users").then(function(exists) {
      if (!exists) {
        return db.schema.createTable("users", function(t) {
          t.increments("id").primary();
          t.string("username", 255);
          t.string("email", 255);
          t.string("password", 255);
          t.integer("ratingUser");
          t.integer("amountOfRates");
          t.timestamps();
        });
      } else {
        return null;
      }
    });
  },

  get: async function() {
    return db.from("users").select("*");
  },
  getById: function(id) {
    return db("users")
      .select("*")
      .where("id", "=", id);
  },
  add: function(user, callback) {
    bcrypt.hash(user.password, saltRounds).then(hash => {
      return db("users")
        .insert([{ ...user, password: hash }])
        .then(data => {
          callback.then(data);
        })
        .catch(err => {
          callback.catch(err);
        });
    });
  },

  login: async function(user, callback) {
    let userData = await db.query("select * from users where username=?", [
      user.username
    ]);
    userData = userData[0];
    if (userData == null) {
      return { code: 0 };
    }

    const correctPasswordSwitch = await bcrypt.compare(
      user.password,
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
  delete: function(id, callback) {
    return db.query("delete from users where idUser=?", [id], callback);
  },
  update: function(id, user, callback) {
    bcrypt.hash(user.password, saltRounds).then(hash => {
      return db.query(
        "UPDATE `users` SET  `username` = ?, `email` = ?, `password` = ?, `ratingUser` = ?, `amountOfRates` = ? WHERE `users`.`idUser` = ?",
        [
          user.username,
          user.email,
          hash,
          user.ratingUser,
          user.amountOfRates,
          id
        ],
        callback
      );
    });
  }
};
module.exports = user;
