var express = require("express");
var router = express.Router();
var product = require("../models/product");

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
      res.status(202).json({ code: 1, rows });
    },
    catch: err => {
      res.status(500).json({ code: 0, err });
    }
  });
});

module.exports = router;
