var express = require("express");
var router = express.Router();
var search = require("../models/search");

router.get(":keyword?", function (req, res, next) {
    search.searchKeyWord(req.query, {
        then: rows => {
            res.status(202).json({ code: 1, rows });
        },
        catch: err => {
            res.status(500).json({ code: 0, err });
        }
    })
});

module.exports = router;