const express = require("express");
const router = express.Router();
const tag = require("../models/tag");

// GET all tags and GET tag by id
router.get("/:id?", function (req, res, next) {
    if (req.params.id) {
        tag.getById(req.params.id, {
            then: rows => {
                res.status(202).json({ code: 1, rows });
            },
            catch: err => {
                res.status(500).json({ code: 0, err });
            }
        });
    } else {
        tag.get({
            then: rows => {
                res.status(202).json({ code: 1, rows });
            },
            catch: err => {
                res.status(500).json({ code: 0, err });
            }
        });
    }
});

//GET tag by name
router.get("/name/:name?", function (req, res, next) {
    tag.getByName(req.params.name, {
        then: rows => {
            res.status(202).json({ code: 1, rows });
        },
        catch: err => {
            res.status(500).json({ code: 0, err });
        }
    });
});

//GET tag with name like
router.get("/namelike/:name?", function (req, res, next) {
    tag.getByNameLike(req.params.name, {
        then: rows => {
            res.status(202).json({ code: 1, rows });
        },
        catch: err => {
            res.status(500).json({ code: 0, err });
        }
    });
});

// CREATE tag
router.post("/", async function (req, res, next) {
    tag.add(req.body, {
        then: rows => {
            res.status(202).json({ code: 1, rows });
        },
        catch: err => {
            res.status(500).json({ code: 0, err });
        }
    });
});

router.delete("/:id", function (req, res, next) {
    tag.delete(req.params.id, {
        then: rows => {
            res.status(202).json({ code: 1, rows });
        },
        catch: err => {
            res.status(500).json({ code: 0, err });
        }
    });
});

router.put("/:id", function (req, res, next) {
    tag.update(req.params.id, req.body, {
        then: rows => {
            // console.log(req);
            res.status(202).json({ code: 1, rows });
        },
        catch: err => {
            // console.log(err);
            res.status(500).json({ code: 0, err });
        }
    });
});

module.exports = router;