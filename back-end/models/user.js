var db = require("../database");
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
  get: function(callback) {
    return db.query("select * from users", callback);
  },
  getById: function(id, callback) {
    return db.query("select * from users where idUser=?", [id], callback);
  },
  add: function(user, callback) {
    bcrypt.hash(user.password, saltRounds).then(hash => {
      return db.query(
        "insert into users (username, email, password, ratingUser, amountOfRates) values(?,?,?,?,?)",
        [user.username, user.email, hash, 0, 0],
        callback
      );
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
