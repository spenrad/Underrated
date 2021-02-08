var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");

passport.use(new LocalStrategy(
  
  {
    usernameField: "username"
  },
  function(username, password, done) {
    console.log("HEY");
    db.User.findOne({
      where: {
        username: username
      }
    }).then(function(dbUser) {
        console.log("dbUser", dbUser);
      if (!dbUser) {
        return done(null, false, {
          message: "Incorrect username."
        });
      }

      else if (!dbUser.validPassword(password)) {
        return done(null, false, {
          message: "Incorrect password."
        });
      }
      // If none of the above, return the user
      return done(null, dbUser);
    });
  }
));


passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

module.exports = passport;
