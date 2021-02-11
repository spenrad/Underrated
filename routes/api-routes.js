var db = require("../models");
var passport = require("../config/passport");
const { default: axios } = require("axios");
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

  app.get("/api/search", function (req, res) {
    var hbsObject = {};
    promiseArr = [];
    console.log("res data: ===================", req._parsedOriginalUrl.query);
    axios.get("http://www.omdbapi.com/?apikey=b9e5adb0&s=" + req._parsedOriginalUrl.query)
      .then(function (results) {
        // console.log(results.data);
        
        for (i = 0; i < results.data.Search.length; i++) {
          promiseArr.push(
            axios.get("http://www.omdbapi.com/?apikey=b9e5adb0&i=" +
              results.data.Search[i].imdbID)
              .then(function (res) {
                // console.log(res.data);
                return res.data;
              })
        
          );
        }

        Promise.all(promiseArr).then(function (response) {
          hbsObject.results = response;
          // console.log(hbsObject)
          res.render("search", hbsObject);
        })
  })
})






//   for (i = 0; i < reviewInf.length; i++) {
//     reviewArr.push(reviewInf[i].dataValues);
//   }
//   hbsObject.reviews = reviewArr;
//   var promiseArr = [];

//   for (let i = 0; i < reviewInf.length; i++) {
//     promiseArr.push(
//       db.Movie.findOne({
//         where: {
//           ID: reviewInf[i].dataValues.movieID,
//         },
//       }).then(function (results) {
//         var movieData = {
//           movieID: reviewInf[i].dataValues.movieID,
//           review: reviewInf[i].dataValues.review,
//           rating: reviewInf[i].dataValues.rating,
//           watched: reviewInf[i].dataValues.watched,
//         };

//         return axios
//           .get(
//             "http://www.omdbapi.com/?apikey=b9e5adb0&i=" +
//             results.dataValues.imdbID
//           )
//           .then(function (response) {
//             movieData.data = response.data;
//             return movieData;
//           });
//       })
//     );
//   }
//   Promise.all(promiseArr).then(function (responses) {
//     hbsObject.movies = responses;
//     hbsObject = {
//       movies: hbsObject.movies,
//       username: hbsObject.userName,
//       avatar: hbsObject.img,
//     };
//     console.log("Handlebars Object:", hbsObject);

//     res.render("profile", hbsObject);
//   });
// });


app.get("/logout", function (req, res) {
  req.session.destroy(function (err) {
    console.log("Logged out", req.user);
  })
});

}

