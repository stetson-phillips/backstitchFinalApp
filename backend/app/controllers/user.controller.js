const db = require("../models");
const User = db.users;

exports.create = async (req, res) => {
  const user = await User.create({
    name: req.body.name,
    userName: req.body.username,
    password: req.body.password
  });

  res.redirect("/login");
};

exports.getUserName = async (req, res) => {
  res.json(req.user.userName);
};
