// var db = require("../models");
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

module.exports = router;