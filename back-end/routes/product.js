var express = require("express");
var router = express.Router();
var product = require("../models/product");
const isAuth = require("../middlewares/isAuth");

// Create tables "categories" and "tags"
product.createTableCategories();
product.createTableTags();

// CRUD endpoints for "product"
router.get("/:id?", function(req, res, next) {
  if (req.params.id) {
    product.getById(req.params.id, {
      then: rows => {
        res.status(202).json({ code: 1, rows });
      },
      catch: err => {
        res.status(500).json({ code: 0, err });
      }
    });
  } else {
    product.get({
      then: rows => {
        res.status(202).json({ code: 1, rows });
      },
      catch: err => {
        res.status(500).json({ code: 0, err });
      }
    });
  }
});

router.post("/", function(req, res, next) {
  product.add(req.body, {
    then: rows => {
      res.status(202).json({ code: 1, rows });
    },
    catch: err => {
      res.status(500).json({ code: 0, err });
    }
  });
});
router.delete("/:id", function(req, res, next) {
  product.delete(req.params.id, {
    then: rows => {
      res.status(202).json({ code: 1, rows });
    },
    catch: err => {
      res.status(500).json({ code: 0, err });
    }
  });
});

router.put("/:id", function(req, res, next) {
  product.update(req.params.id, req.body, {
    then: rows => {
      console.log(req);
      res.status(202).json({ code: 1, rows });
    },
    catch: err => {
      console.log(err);
      res.status(500).json({ code: 0, err });
    }
  });
});

// Endpoint for rating change. You should send the rating
// via "body" and "productId" via endpoint
router.put("/changeRating/:id", function(req, res, next) {
  let id = req.params.id;

  console.log(req.body)
  product.getById(id, {
    then: rows => {
      console.log(rows[0].amountOfRates);
      if (rows[0].amountOfRates == 0) {
         update = {
          amountOfRates :rows[0].amountOfRates + 1,
          ratingProduct : req.body.ratingProduct
        }
      } else {
        update = {
          amountOfRates : rows[0].amountOfRates + 1,
          ratingProduct : (req.body.ratingProduct +  rows[0].ratingProduct)/2
        }
      }
      product.update(id, update, {
        then: rows => {
          res.status(202).json({ code: 1, rows });
        },
        catch: err => {
          res.status(500).json({ code: 0, err });
        }
      });
    },
    catch: err => {
      res.status(500).json({ code: 0, err });
    }
  });

  // product.update(req.params.id, req.body, {
  //   then: rows => {
  //     res.status(202).json({ code: 1, rows });
  //   },
  //   catch: err => {
  //     res.status(500).json({ code: 0, err });
  //   }
  // });
});

module.exports = router;
