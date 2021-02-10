var db = require("../models");
var express = require("express");
const { default: axios } = require("axios");


const router = express.Router();

router.get('/', function (req, res) {
    res.render('search');
});

router.get('/login', function (req, res) {
    res.render('login');
})

router.get('/signup', function (req, res) {
    res.render('createAccount');
})

router.get('/user/:profile', function (req, res) {
    // const hbsObject = {movies: []}
    var hbsObject = {};
    console.log("==========================================")
    var profile = req.params.profile;
    console.log(profile);

    db.User.findOne({
        where: {
            username: profile
        }
    }).then(function (userInf) {

        console.log("user info: ", userInf);
        console.log("========")
        console.log(userInf.dataValues);

        hbsObject.userName = userInf.dataValues.username;
        // res.render("profile", hbsObjectName)


        // console.log(hbsObject);

        db.UserMovie.findAll({
            where: {
                userID: userInf.id
            }
        }).then(function (reviewInf) {
            reviewArr = [];
            const hbsObjectUserMovie = {
                userMovie: reviewInf
            }
            for (i = 0; i < reviewInf.length; i++){
                reviewArr.push(reviewInf[i].dataValues)
                console.log("TEST LOG ==========", reviewInf[i].dataValues)
            }
            hbsObject.reviews = reviewArr;
            console.log("review info=========================== ", "\n", reviewInf)
            var promiseArr = [];

            for (i = 0; i < reviewInf.length; i++) {
                promiseArr.push(
                    db.Movie.findOne({
                        where: {
                            ID: reviewInf[i].dataValues.movieID
                        }
                    }).then(function (results) {
                        // console.log("movie database ========================", "\n", results.dataValues)

                        return axios.get("http://www.omdbapi.com/?apikey=b9e5adb0&i=" + results.dataValues.imdbID)
                            .then(function (response) {
                                // console.log("axios query===============================", "\n", response.data);
                           
                                return response.data;


                            });

                    })
                );
            }
            Promise.all(promiseArr).then(function (responses) {

                hbsObject.movies = responses;
                console.log("FINAL OBJECT==========", hbsObject);

                res.render("profile", hbsObject);
            })
            // console.log("MOVIE INFO =========================")
       


        })

        // for (i = 0; i < moviesArr.length; i++) {



    })
})
// }
// Promise.all(promises)
// .then(function () {
//     var hbsObject = {
//         movies: moviesArr
//     }
//     console.log("FINAL OBJECT =====================")
//     console.log(hbsObject)
//     res.render("profile", hbsObject)
// })






module.exports = router;