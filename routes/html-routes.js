var db = require("../models");
var express = require("express");


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
    const promises = [];
    console.log("==========================================")
    var profile = req.params.profile;
    console.log(profile);

    function findMovie(search) {
        db.Movie.findAll({
            where: {
                id: search.movieID
            }
        }).then(function (thing) {
            console.log("loop output: ", thing[0].dataValues)
            thing
        })
    }


    db.User.findOne({
        where: {
            username: profile
        }
    }).then(function (userInf) {

        console.log(userInf);
        console.log("========")
        console.log(userInf.dataValues);
        // hbsObject.user = userInf.dataValues.username;
        // console.log(hbsObject);
        // res.render("profile", hbsObject);
        db.UserMovie.findAll({
            where: {
                userID: userInf.id
            }
        })

            .then(function (reviewInf) {
                var moviesArr = [];
                console.log("MOVIE INFO =========================")
                reviewInf.forEach(element => {
                    // console.log(element.dataValues);
                    moviesArr.push(element.dataValues)
                })

                for (i = 0; i < moviesArr.length; i++) {
                    // promises.push(findMovie(moviesArr[i]))
                }
                Promise.all(promises)
                .then(function () {
                    var hbsObject = {
                        movies: moviesArr
                    }
                    console.log("FINAL OBJECT =====================")
                    console.log(hbsObject)
                    res.render("profile", hbsObject)
                })


            })
    })
})

module.exports = router;