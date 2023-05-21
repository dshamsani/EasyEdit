var express = require("express");
const { add, find, login, current, edit, remove, password } = require("../controllers/users");
const { auth } = require("../middleware/auth");
var router = express.Router();

router.post("/add", add);

router.get("/find", auth, find);

router.post("/login", login);

router.get("/current", auth, current);

router.post("/edit", auth, edit);

router.post("/delete", auth, remove);

router.post("/password", auth, password);

module.exports = router;
