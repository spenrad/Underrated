var db = require("../models");

module.exports = function (app) {

    app.post("/api/users", function (req, res) {
        db.User.create({
            username: req.body.name,
            password: req.body.password
        }).then(function (dbUser) {
            console.log(dbUser);
        })
    })

    app.post("/api/movies", function (req, res) {
        db.Movie.create({
            imdbID: req.body.imdbID
        }).then(function (dbMovie) {
            console.log(dbMovie);
        })
    })

}

