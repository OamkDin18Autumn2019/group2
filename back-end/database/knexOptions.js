require("dotenv").config();

module.exports = {
  client: "mysql",
  connection: {
    host: "mothersell.mysql.database.azure.com",
    user: "motherseller@mothersell",
    password: "nokiaIsTheBest92",
    port: 3306,
    database: "mothersell",
    pool: {
      min: 2,
      max: 10
  }
  }
};

