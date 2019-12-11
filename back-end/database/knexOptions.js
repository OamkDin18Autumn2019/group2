require('dotenv').config();

module.exports = {
  client: "mysql2",
  connection: {
    host: "localhost",
    user: "root",
    password: "root",
    // password: "root",
    database: "anystore2019",
    // host: process.env.DB_URL,
    // user: process.env.DB_USER,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_NAME
  }
};
