var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require('cors');

var app = express();
app.use(cors());

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/user");
var productsRouter = require("./routes/product");
var historyRouter = require("./routes/history")
var searchRouter =  require("./routes/search");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/v1/", indexRouter);
app.use("/v1/user", usersRouter);
app.use("/v1/product", productsRouter);
app.use("/v1/search", searchRouter);
app.use("/v1/history", historyRouter);

const isAuth = require("./middlewares/isAuth");
app.get("/protected", isAuth, (req, res, next) => {
  res.status(200).json({ hello: "world" });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
