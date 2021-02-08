var db = require("../models");
var passport = require("../config/passport");

var isAuthenticated = require("../config/middleware/isAuthenticated");


module.exports = function (app) {

    app.post("/api/login", passport.authenticate("local"), function(req, res) {
        res.json(req.user);
      });

    app.post("/api/signup", function(req, res) {
        db.User.create({
          username: req.body.username,
          password: req.body.password
        })
          .then(function() {
            res.redirect(307, "/api/login");
          })
          .catch(function(err) {
            res.status(401).json(err);
          });
      });

    app.post("/api/users", function (req, res) {
        console.log(req.body);
        db.User.create({
            username: req.body.name,
            password: req.body.password
        }).then(function (dbUser) {
            console.log("request:", req.body)
            // console.log(dbUser);
        })
    })

    app.post("/api/movies", isAuthenticated, function (req, res) {
        db.Movie.create({
            title: req.body.name,
            imdbID: req.body.imdbID
        }).then(function (dbMovie) {
            console.log(dbMovie);
        })
    })


}

