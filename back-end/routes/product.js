var express = require('express');
var router = express.Router();
var product = require('../models/product');


router.get('/:id?', function(req, res, next) {
  if (req.params.id) {
    product.getById(req.params.id, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  } else {
    product.get(function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  }
});

router.post('/', function(req, res, next) {
  Promise.all([
    req.body.forEach(element => {
      product.add(element, function(err, count) {
        if (err) {
          console.log(err)
        }
      });
    })]
  ).then((response) => {
      res.sendStatus(201);    
  })
    .catch((err) => {
      console.log(err);
    }) 
});
router.delete('/:id', function(req, res, next) {
  product.delete(req.params.id, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }
  });
});
router.put('/:id', function(req, res, next) {
  product.update(req.params.id, req.body, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }
  });
});
module.exports = router;