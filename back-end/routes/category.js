const express = require("express");
const router = express.Router();
const category = require("../models/category");

router.get("", function (req, res, next) {
    category.get({
        then: rows => {
            res.status(202).json({ code: 1, rows });
        },
        catch: err => {
            res.status(500).json({ code: 0, err });
        }
    });
});

module.exports = router;