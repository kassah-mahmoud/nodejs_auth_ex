const express = require("express");
const { passport } = require("./passport/jwt");
const UserController = require("./controllers/UserController");

const router = express.Router();

router.get("/", (req, res) => {
  return res.json("Hello World");
});

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  UserController.me
);

module.exports = router;
