var db = require("../models");
var passport = require("../config/passport");

var isAuthenticated = require("../config/middleware/isAuthenticated");


module.exports = function (app) {

  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
  });

  app.post("/api/signup", function (req, res) {
    db.User.findOrCreate({
      where: { username: req.body.username },
      defaults: {
        password: req.body.password,
        imgURL: req.body.imgURL
      }
    })
      .then(function () {
        res.redirect(307, "/api/login");
      })
      .catch(function (err) {
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


  app.get("/api/profile", function (req, res) {
    console.log("req.user: ")
    // console.log(req.user.username);
      res.json(req.user.username)
      })
    

    
    
  


  app.post("/api/movies", isAuthenticated, function (req, res) {
    db.Movie.findOrCreate({
      where: {
        title: req.body.name,
        imdbID: req.body.imdbID
      }
    }).then(function (dbMovie) {
      console.log(dbMovie);
      res.json(dbMovie);
    })
  })

  app.post("/api/usermovie/seen", function (req, res) {
    db.Movie.findOne({
      where: {
        imdbID: req.body.id,
      },

    }).then(function (dbMovie) {
      console.log("Movie ID:", dbMovie);
      console.log(req.user);
      db.UserMovie.findOrCreate({

        where: {
          userID: req.user.id,
          movieID: dbMovie.dataValues.id
        },
        defaults: {
          review: req.body.review,
          rating: req.body.rating,
          watched: true,
        }
      })
        .then(function (res) {
          console.log(res);
        });
      res.json(dbMovie);
    })
  });

  app.put("/api/usermovie/seen", function (req, res) {
    db.Movie.findOne({
      where: {
        imdbID: req.body.id,
      },

    }).then(function (dbMovie) {
      console.log("Movie ID:", dbMovie);
      console.log(req.user);
      db.UserMovie.update({
        
          review: req.body.review,
          rating: req.body.rating,
          watched: true,
        },
        { where: {
          userID: req.user.id,
          movieID: dbMovie.dataValues.id
        }
      })
        .then(function (res) {
          console.log(res);
        });
      res.json(dbMovie);
    })
  });

  app.post("/api/usermovie/unseen", function (req, res) {
    console.log("req.body:", req.body);
    db.Movie.findOne({
      where: {
        imdbID: req.body.id
      },

    }).then(function (dbMovie) {
      db.UserMovie.findOrCreate({

        where: {
          userID: req.user.id,
          movieID: dbMovie.dataValues.id
        }
      })
        .then(function (res) {
          console.log(res);
        });
      res.json(dbMovie);
    })
  });

  app.get("/logout", function (req, res) {
    req.session.destroy(function (err) {
      console.log("Logged out", req.user);
    })
  });

}

