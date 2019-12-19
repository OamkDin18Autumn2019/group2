var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
var logger = require("morgan");
var cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static(path.resolve("./public")));
// app.use(express.static(__dirname + "/uploads"));
// console.log(__dirname + "/uploads");

app.use(express.static("public"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/user");
var productsRouter = require("./routes/product");
// var historyRouter = require("./routes/history")
var searchRouter = require("./routes/search");
var tagRouter = require("./routes/tag");
var categoryRouter = require("./routes/category");
const imagesRouter = require("./routes/images");

app.get("/status", async (req, res, next) => {
  res.status(200).json({ status: "Up and running!" });
});

const { checkVersion } = require("./version");
app.get("/version", async (req, res, next) => {
  try {
    const a = await checkVersion();
    res.status(200).json({ version: a });
  } catch (e) {
    res.status(500).json({ e });
  }
});
app.use("/v1/", indexRouter);
app.use("/v1/user", usersRouter);
app.use("/v1/product", productsRouter);
app.use("/v1/search", searchRouter);
app.use("/v1/tag", tagRouter);
app.use("/v1/category", categoryRouter);
app.use("/v1/uploads", imagesRouter);

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
