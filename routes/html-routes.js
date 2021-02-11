var db = require("../models");
var express = require("express");
const { default: axios } = require("axios");

const router = express.Router();

router.get("/", function (req, res) {
  res.render("search");
});

router.get("/login", function (req, res) {
  res.render("login");
});

router.get("/signup", function (req, res) {
  res.render("createAccount");
});

router.get("/members", function (req, res) {
  var hbsObject = {};
  db.User.findAll({})
  .then(function (data) {
    userArr = [];
    for (i = 0; i < data.length; i++) {
      userArr.push(data[i].dataValues);
    }
    hbsObject = { user: userArr };
    console.log("hbsObject", hbsObject);
    res.render("viewMembers", hbsObject);
});

});

router.get("/user/:profile", function (req, res) {
  var hbsObject = {};
  var profile = req.params.profile;
  console.log(profile);

  db.User.findOne({
    where: {
      username: profile,
    },
  }).then(function (userInf) {
    hbsObject.userName = userInf.dataValues.username;
    hbsObject.img = userInf.dataValues.imgURL;

    db.UserMovie.findAll({
      where: {
        userID: userInf.id,
      },
    }).then(function (reviewInf) {
      reviewArr = [];
      for (i = 0; i < reviewInf.length; i++) {
        reviewArr.push(reviewInf[i].dataValues);
      }
      hbsObject.reviews = reviewArr;
      var promiseArr = [];

      for (let i = 0; i < reviewInf.length; i++) {
        promiseArr.push(
          db.Movie.findOne({
            where: {
              ID: reviewInf[i].dataValues.movieID,
            },
          }).then(function (results) {
            // console.log("movie database ========================", "\n", results.dataValues)
            console.log("===============================", "\n", reviewInf[i]);
            var movieData = {
              movieID: reviewInf[i].dataValues.movieID,
              review: reviewInf[i].dataValues.review,
              rating: reviewInf[i].dataValues.rating,
              watched: reviewInf[i].dataValues.watched,
            };

            return axios
              .get(
                "http://www.omdbapi.com/?apikey=b9e5adb0&i=" +
                  results.dataValues.imdbID
              )
              .then(function (response) {
                movieData.data = response.data;
                return movieData;
              });
          })
        );
      }
      Promise.all(promiseArr).then(function (responses) {
        hbsObject.movies = responses;
        hbsObject = {
          movies: hbsObject.movies,
          username: hbsObject.userName,
          avatar: hbsObject.img,
        };
        console.log("Handlebars Object:", hbsObject);

        res.render("profile", hbsObject);
      });
    });
  });
});

module.exports = router;
