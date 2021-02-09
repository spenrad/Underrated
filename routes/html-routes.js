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
    console.log("==========================================")
    var profile = req.params.profile;
    console.log(profile);
    db.User.findOne({
        where: {
            username: profile
        }
    }).then(function (results) {
        console.log(results);
        console.log("========")
        console.log(results.dataValues);
        var hbsObject = {
            
                
                    user: results.dataValues.username
                
            

        }
        console.log(hbsObject);
        res.render("profile", hbsObject);
    })


})

module.exports = router;