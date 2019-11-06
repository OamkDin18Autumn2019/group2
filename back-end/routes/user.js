var express = require('express');
var router = express.Router();
var user = require('../models/user');


router.get('/:id?', function(req, res, next) {
  if (req.params.id) {
    user.getById(req.params.id, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  } else {
    user.get(function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  }
});

router.post('/', function(req, res, next) {
  user.add(req.body, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(req.body); 
    }
  });
});

router.delete('/:id', function(req, res, next) {
  user.delete(req.params.id, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }
  });
});
router.put('/:id', function(req, res, next) {
  user.update(req.params.id, req.body, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});
module.exports = router;