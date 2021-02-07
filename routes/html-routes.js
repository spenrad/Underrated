// var db = require("../models");
var express = require("express");

const router = express.Router();

router.get('/', function (req, res) {
    res.render('search');
});

module.exports = router;