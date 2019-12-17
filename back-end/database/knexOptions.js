require("dotenv").config();

module.exports = {
  client: "mysql2",
  connection: {
    host: "localhost",
    user: "root",
    password: "root",
    database: "anystore2019",
    // password: "root",
    // database: "library",
    // password: "root",
    // port: 8889
  }
};
