var db = require("../models");

module.exports = function (app) {

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

    app.post("/api/movies", function (req, res) {
        db.Movie.create({
            imdbID: req.body.imdbID
        }).then(function (dbMovie) {
            console.log(dbMovie);
        })
    })

    app.get("/api/films", function (req, res){
        console.log("api route: ", req.body);
    })

}

