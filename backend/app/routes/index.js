const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");
const passport = require("passport");
const { create, getUserName } = require("../controllers/user.controller");
const {
  getAll,
  create: createUserFeed
} = require("../controllers/user_feed.controller");

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
  })
);

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

router.post("/register", create);

router.get("/", ensureAuthenticated, (req, res) => {
  res.render("index");
});

router.get("/userFeeds", ensureAuthenticated, getAll);
router.post("/userFeeds", ensureAuthenticated, createUserFeed);
router.get("/username", ensureAuthenticated, getUserName);

module.exports = router;
