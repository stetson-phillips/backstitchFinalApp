const db = require("../models");
const User = db.users;

const LocalStrategy = require("passport-local").Strategy;

module.exports = function(passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "username", passwordField: "password" },
      async (userName, password, done) => {
        const user = await User.findOne({ where: { userName } });
        if (!user) {
          return done(null, false, { message: "email not registered" });
        }

        if (password === user.password) {
          return done(null, user);
        }

        return done(null, false, { message: "password incorrect" });
      }
    )
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(async function(id, done) {
    const user = await User.findByPk(id);
    done(null, user);
  });
};
