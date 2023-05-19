var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

require("dotenv").config();

const cors = require("cors");

var usersRouter = require("./routes/users");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/users", usersRouter);

module.exports = app;
