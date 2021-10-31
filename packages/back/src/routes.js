const express = require("express");
const User = require("./controllers/UserController");

const router = express.Router();

router.get("/", (req, res) => {
  return res.json("Hello World");
});

router.post("/register", User.register);
router.post("/login", User.login);

module.exports = router;
