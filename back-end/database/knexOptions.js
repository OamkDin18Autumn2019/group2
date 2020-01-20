require("dotenv").config();

module.exports = {
  client: "mysql",
  connection: {
    host: "database-2.ckqfrbqbybou.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "adminadmin",
    port: 3306,
    database: "anyStore",
    pool: {
      min: 2,
      max: 10
  }
  }
};

