var express = require("express");
var router = express.Router();
var user = require("../models/user");


router.get("/:id?", function(req, res, next) {
  if (req.params.id) {
    user.getById(req.params.id, {
      then: rows => {
        res.status(202).json({ code: 1, rows });
      },
      catch: err => {
        res.status(202).json({ code: 0, err });
      }
    });
  } else {
    user.get({
      then: rows => {
        res.status(202).json({ code: 1, rows });
      },
      catch: err => {
        res.status(202).json({ code: 0, err });
      }
    });
  }
});

router.post("/register", function(req, res, next) {
  user.add(req.body, {
    then: rows => {
      res.status(202).json({ code: 1, rows });
    },
    catch: err => {
      res.status(202).json({ code: 0, err });
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
  user.delete(req.params.id, {
    then: rows => {
      res.status(202).json({ code: 1, rows });
    },
    catch: err => {
      res.status(202).json({ code: 0, err });
    }
  });
});
router.put("/:id", function(req, res, next) {
  user.update(req.params.id, req.body,  {
    then: rows => {
      res.status(202).json({ code: 1, rows });
    },
    catch: err => {
      res.status(202).json({ code: 0, err });
    }
  });
});
module.exports = router;
