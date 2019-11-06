var express = require('express');
var router = express.Router();
var db = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

Promise.all(
  [
    db.query("CREATE TABLE IF NOT EXISTS users ( `idUser` INT NOT NULL AUTO_INCREMENT , `username` varchar(50) NOT NULL , `email` varchar(50) NOT NULL , `password` varchar(512) NOT NULL ,`ratingUser` INT(1) NOT NULL, `amountOfRates` INT(8) NOT NULL, PRIMARY KEY (`idUser`))"),
    db.query("CREATE TABLE IF NOT EXISTS products ( `idProduct` INT NOT NULL AUTO_INCREMENT , `idUser` INT NOT NULL , `price` FLOAT(10, 3) NOT NULL , `amountOfProduct` INT NOT NULL , `name` VARCHAR(100) NOT NULL , `ratingProduct` INT NOT NULL , `amountOfRates` INT NOT NULL , `description` TEXT NOT NULL , `dateOfAdding` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , `amountOfSoldProduct` INT NOT NULL , `photos` INT NOT NULL , `category` VARCHAR(50) NOT NULL , PRIMARY KEY (`idProduct`)) "),
  ]
).then(() => {
  db.query("ALTER TABLE `products` ADD FOREIGN KEY (`idUser`) REFERENCES `users`(`idUser`) ON DELETE CASCADE ON UPDATE CASCADE;")
  .then((res) => console.log("Database initialiazed"))  
  .catch((err) => res.send(err))

}).catch(dbEr => console.log(dbEr));
module.exports = router;
