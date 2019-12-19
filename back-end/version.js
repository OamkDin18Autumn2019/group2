const options = require("./database/knexOptions");

const knex = require("knex")(options);

const checkVersion = async () => {
  try {
    let a = knex.raw("SELECT VERSION()");
    a = a[0][0];
    console.log(a);
    return a;
  } catch (err) {
    return err;
  }
};

module.exports = { checkVersion };
