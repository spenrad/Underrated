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
        const hbsObjectName = {
            userName: userInf.dataValues.username
        };
        res.render("profile", hbsObjectName)
        // res.render("profile", hbsObjectName)
    
        // console.log(hbsObject);
        // res.render("profile", hbsObject);
        db.UserMovie.findAll({
            where: {
                userID: userInf.id
            }
        }).then(function (reviewInf) {
     
            const hbsObjectUserMovie = {
                userMovie: reviewInf
            }
            console.log("review info=========================== ", "\n", reviewInf)

            for (i = 0; i < reviewInf.length; i++) {
                db.Movie.findOne({
                    where: {
                        ID: reviewInf[i].dataValues.movieID
                    }
                }).then(function (results) {
                    console.log("movie database ========================", "\n", results.dataValues)
                    axios.get("http://www.omdbapi.com/?apikey=b9e5adb0&i=" + results.dataValues.imdbID)
                        .then(function (response) {
                            // console.log("axios query===============================", "\n", response.data);
                     
                            const hbsObjectAPI = {
                                omdb: response.data
                            }
                            console.log("OBJECTAPI===========================", "\n", hbsObjectAPI);
                        })

                })



            }
            // console.log("MOVIE INFO =========================")
            console.log("OBJECTname===========================", "\n", hbsObjectName);
            console.log("OBJECTmovies===========================", "\n", hbsObjectUserMovie);
         

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