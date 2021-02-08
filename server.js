var express = require("express");
var session = require("express-session");
var passport = require("./config/passport");

var app = express();
var PORT = process.env.PORT || 8080;
var db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());




const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');



// Require Routes HERE
var HTMLroutes = require("./routes/html-routes");
app.use(HTMLroutes);
require("./routes/api-routes")(app);


// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  })
});