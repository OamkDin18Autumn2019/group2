var express = require("express");
var router = express.Router();
var history = require("../models/history");
const isAuth = require("../middlewares/isAuth");

// CRUD endpoints for "history"
router.get("/:id?", function (req, res, next) {
    if (req.params.id) {
        history.getById(req.params.id, {
            then: rows => {
                res.status(202).json({ code: 1, rows });
            },
            catch: err => {
                res.status(500).json({ code: 0, err });
            }
        });
    } else {
        history.get({
            then: rows => {
                res.status(202).json({ code: 1, rows });
            },
            catch: err => {
                res.status(500).json({ code: 0, err });
            }
        });
    }
});

// It gives you an error in console when you send an array of objects
// But it works, so you can use it
router.post("/", isAuth, function (req, res, next) {
    if (Array.isArray(req.body)) {
        Promise.all([
            req.body.forEach(element => {
                history.add({
                    idUser: req.user.id,
                    idProduct: element.id,
                    amount: element.amountInTheCart
                }, {
                    then: rows => {
                        console.log(rows);
                    },
                    catch: err => {
                        console.log(err);
                    }
                });
            })
        ])
            .then(res.status(202).json())
    } else {
        history.add({
            idUser: req.user.id,
            idProduct: req.body.id,
            amount: req.body.amountInTheCart
        }, {
            then: rows => {
                res.status(202).json({ code: 1, rows });
            },
            catch: err => {
                res.status(500).json({ code: 0, err });
            }
        });
    }
});

router.delete("/:id", function (req, res, next) {
    history.delete(req.params.id, {
        then: rows => {
            res.status(202).json({ code: 1, rows });
        },
        catch: err => {
            res.status(500).json({ code: 0, err });
        }
    });
});

router.put("/:id", function (req, res, next) {
    history.update(req.params.id, req.body, {
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
router.put("/changeRating/:id", function (req, res, next) {
    let id = req.params.id;
    console.log(req.body);
    history.getById(id, {
        then: rows => {
            console.log(rows[0].amountOfRates);
            if (rows[0].amountOfRates == 0) {
                update = {
                    amountOfRates: rows[0].amountOfRates + 1,
                    ratingProduct: req.body.ratingProduct
                };
            } else {
                update = {
                    amountOfRates: rows[0].amountOfRates + 1,
                    ratingProduct: (req.body.ratingProduct + rows[0].ratingProduct) / 2
                };
            }
            history.update(id, update, {
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

  
});

router.post("/getByUser", function (req, res, next) {
    const userId = req.body.userId;
    history.getByUserId(userId, {
        then: rows => {
            res.status(202).json({ code: 1, rows });
        },
        catch: err => {
            res.status(500).json({ code: 0, err });
        }
    });
});

router.get("/da/newArrivals", function (req, res, next) {
    history.getnewArrivals({
        then: rows => {
            res.status(202).json({ code: 1, rows });
        },
        catch: err => {
            res.status(500).json({ code: 0, err });
        }
    });
});


module.exports = router;
