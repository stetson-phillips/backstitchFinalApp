module.exports = {
  ensureAuthenticated: function (req, res, next) {
    console.log("in here");
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
  },
};
