require("dotenv").config();

module.exports = {
  client: "mysql2",
  connection: {
    host: "mothersell.mysql.database.azure.com",
    user: "motherseller@mothersell",
    password: "nokiaIsTheBest92",
    port: 3306,
    database: "mothersell"
  }
};
