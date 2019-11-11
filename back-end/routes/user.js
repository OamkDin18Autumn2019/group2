var express = require("express");
var router = express.Router();
var user = require("../models/user");

router.get("/:id?", function(req, res, next) {
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

router.post("/register", function(req, res, next) {
  user.add(req.body, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(req.body);
    }
  });
});

router.post("/login", async function(req, res, next) {
  const data = await user.login(req.body);
  if (data.code == 1) {
    res
      .status(200)
      .header("x-auth-token", data.token)
      .json({ ...data, token: "" });
  } else {
    res.status(400).json({ ...data });
  }
});

router.delete("/:id", function(req, res, next) {
  user.delete(req.params.id, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }
  });
});
router.put("/:id", function(req, res, next) {
  user.update(req.params.id, req.body, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});
module.exports = router;
