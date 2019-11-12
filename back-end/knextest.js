const db = require("./database/database");

const f = async () => {
  await require("./models/user").createTable();
};

f();
