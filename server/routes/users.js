var express = require("express");
const { add, find, login, current } = require("../controllers/users");
const { auth } = require("../middleware/auth");
var router = express.Router();

router.post("/add", auth, add);

router.get("/find", auth, find);

router.post("/login", login);

router.get("/current", auth, current);

module.exports = router;
