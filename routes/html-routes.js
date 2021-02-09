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
    console.log("==========================================")
    var profile = req.params.profile;
    console.log(profile);
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
        }).then(function (reviewInf) {
            var moviesArr = [];
            console.log("MOVIE INFO =========================")
            console.log(reviewInf[0].dataValues)
            reviewInf.forEach(element => {
           
                console.log(element.dataValues);
                moviesArr.push(element.dataValues)
                
            })
            var hbsObject = {
                movies: moviesArr
            }
            console.log("FINAL OBJECT =====================")
            console.log(hbsObject)
            res.render("profile", hbsObject)
        })
    })
})

module.exports = router;