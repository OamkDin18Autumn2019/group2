var express = require("express");
var router = express.Router();
var user = require("../models/user");
var product = require("../models/product");
const isAuth = require("../middlewares/isAuth");

// Create tables "users" and "products"

user.createTableUsers().then(product.createTableProducts().then());
user.createTableHistory();

// CRUD endpoints for "user"
router.get("/:id?", isAuth, function(req, res, next) {
  if (req.params.id) {
    user.getById(req.params.id, {
      then: rows => {
        res.status(202).json({ code: 1, rows });
      },
      catch: err => {
        res.status(500).json({ code: 0, err });
      }
    });
  } else {
    user.get({
      then: rows => {
        res.status(202).json({ code: 1, rows });
      },
      catch: err => {
        res.status(500).json({ code: 0, err });
      }
    });
  }
});

router.post("/register", function(req, res) {
  user.add(req.body, {
    then: rows => {
      res.status(202).json({ code: 1, rows });
    },
    catch: err => {
      res.status(500).json({ code: 0, err });
    }
  });
});

router.post("/login", async function(req, res, next) {
  console.log(req.body);
  const data = await user.login(req.body);
  if (data.code == 1) {
    res
      .status(200)
      .header("x-auth-token", data.token)
      .json({ ...data });
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
      res.status(500).json({ code: 0, err });
    }
  });
});
router.put("/:id", function(req, res, next) {
  user.update(req.params.id, req.body, {
    then: rows => {
      res.status(202).json({ code: 1, rows });
    },
    catch: err => {
      res.status(500).json({ code: 0, err });
    }
  });
});

router.get("/da/getHistory", isAuth, function(req, res, next) {
  user.getHistoryById(req.user.id, {
    then: rows => {
      res.status(202).json({ code: 1, rows });
    },
    catch: err => {
      res.status(500).json({ code: 0, err });
    }
  });
});

router.post("/da/createHistory", isAuth, function(req, res, next) {
  user.addHistory(
    {
      idUser: req.user.id,
      idProduct: req.body.id,
      amount: req.body.amountInTheCart
    },
    {
      then: rows => {
        res.status(202).json({ code: 1, rows });
      },
      catch: err => {
        res.status(500).json({ code: 0, err });
      }
    }
  );
});

module.exports = router;
