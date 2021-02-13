# UnderRated ![License](https://img.shields.io/static/v1?label=License&message=MIT&color=blueviolet&style=plastic)


A Web based Movie Review Community and database.

## Table of Contents

* [Summary](#summary)
* [User Story](#user-story)
* [Dependencies](#Dependencies)
* [Installation](#Installation)
* [Functionality](#Functionality)
* [Creators](#creators)
* [Roles](#roles)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)
* [License](#license)

______________________________________________________________________________

## Summary

This web application is a movie review hub for people who want to get away from the mainstream. Let’s face it… no one really likes tomatoes, especially RottenTomatoes. It can all be a bit Overrated.

* [Live Site](https://underrated-moviedb.herokuapp.com/)
* [Project Repository](https://github.com/spenrad/Underrated)

![GIF Visual of The Deployed Web Application](https://github.com/spenrad/Underrated/blob/master/underated.gif?raw=true)

______________________________________________________________________________

## User-Story

As an unauthenticated user you can use the search engine, so that you can look up movies you are interested in.

As a UA you can click on buttons “add to watchlist” or write a review, so that you can be redirected to login or created an account to join the movie community.

As an authenticated user you can search for movies you have or have not seen, so that you can add movies to your watch-list or write a review.

As an authenticated user you can visit your profile, so that you can see your movie-list, movie-review list, and write a review from your list.

As an authenticated user you can use the navigation bar and click on “View Members”, so that you can see other members listed and their reviews.

As an authenticated user you can logout, so that you can end your session.

______________________________________________________________________________

## Dependencies

**Built With**

* [HTML 5](https://www.w3schools.com/html/)
* [CSS](https://www.w3schools.com/css/css_howto.asp)
* [GitHub](https://github.com/)
* [JavaScript](https://www.w3schools.com/js/default.asp)
* [BootStrap](https://getbootstrap.com/docs/5.0/getting-started/introduction/)
* [Git](https://git-scm.com/downloads)
* [Node](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [Express-Handlebars](https://www.npmjs.com/package/express-handlebars)
* [MySQL](https://www.mysql.com/products/workbench/)
* [HEROKU](https://www.heroku.com/home)
* [JAWSDB-MySQL](https://www.jawsdb.com/)
* [omdbapi](https://www.omdbapi.com/)

**package.json Dependencies**

* [Express](https://expressjs.com/)
* [Express-Handlebars](https://www.npmjs.com/package/express-handlebars/)
* [MySQL2](https://www.mysql.com/products/workbench/)
* [Sequelize](https://www.jawsdb.com/)
* [Passport](https://www.mysql.com/products/workbench/)
* [Passport-local](https://www.heroku.com/home)
* [Bcryptjs](https://www.jawsdb.com/)
* [Axios](https://www.jawsdb.com/)

______________________________________________________________________________
  
## Installation

There is no installation required if you wish to access this app as is from the [deployed site on Heroku](https://underrated-moviedb.herokuapp.com/).

For local installation [Node.js](https://nodejs.org/en/) needs to be installed as well as [MySQL and MySQl Workbench](https://www.mysql.com/products/workbench/). 

Please clone or download the project folder. And create a new database in Workbench called "crtierion":

```java
CREATE DATABASE criterion;
```

Once the database is set up locally verify that the password to access the database is updates in: config/config.son.

```json
  "development": {
    "username": "root",
    "password": "password",
    "database": "criterion",
    "host": "127.0.0.1",
    "port": 3306,
    "dialect": "mysql"
  }
```

Open your prefered terminal or comand_promt program and navigate into the project folder. Run the following command:

```javascript
npm install
```

and then run the application with the next command:

```javascript
node server.js
```

The application will be visible in your web browser of choice at:

```javascript
localhost:8080
```

Once you have created an account, added movies to your watchlist or written a review, go check out the tables created in the MySQL Workbench to see your captured data.
______________________________________________________________________________
  
## Funtionality

This Apllication in its development used node-express to create a local sever to host and access our PAI database by conncting to the MySQL Workbench's local port to send GET Requests, Posts, and Update the local database in out "criterion" database in  Workbench.

This application also uses Axios to make GET requests to the [OMDB API](https://www.omdbapi.com/).

For Example:
Our search bar makes a general GET request to search for movie tieles with the key word submitted from our web page client side. The request retrieves a top ten list of mvies that inclues the movie title, year released, movie rating, genre, and short plot.

When an authenticated(logged in user) interacts with the "Watchlist" button- the onClick event listeners will push the movie id, and accoiated user info a table for future reference.

When an authenticated(logged in user) interacts with the "Review" button- the onClick event listeners will push the movie id, accoiated user info, and review into the appropriate a tables for future reference.

As you can see in the code snippet below this is what is triggered by the event liseners:

```javascript
$(document).ready(function () {
    var button = $(".submitSearch");

    button.on("click", function () {
        var movieObj = [];
        $(".searchResults").empty();
        $.ajax({
            url: `https://www.omdbapi.com/?apikey=b9e5adb0&s=${$("#searchBar").val()}`,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            for (i = 0; i < response.Search.length; i++) {
                queryURL = "http://www.omdbapi.com/?apikey=b9e5adb0&i=" + response.Search[i].imdbID;
                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function (res) {
                    if (res.Poster == "N/A") {
                        console.log(res.title, " doesn't have a poster");
                    }
                    else {
                        console.log("title search:", res);
                        var h2 = $("<h2>");
                        var h3 = $("<h3>");
                        var p = $("<p>");
                        var img = $("<img>");
                        var btn1 = $("<button>");
                        var btn2 = $("<button>");
                        let film = {
                            title: res.Title,
                            year: res.Year,
                            genre: res.Genre,
                            rating: res.Rated,
                            plot: res.Plot,
                            poster: res.Poster,
                            imdbId: res.imdbID
                        };
                        movieObj.push(film);


                        h2.text(res.Title + " (" + res.Year + ") ")
                        h3.text(res.Genre + " | " + "Rated: " + res.Rated);
                        p.text(res.Plot);
                        img.attr("src", res.Poster);

                        btn1.text("Watch List").attr("id", res.imdbID).attr("class", "watchList btn btn-secondary").attr("name", res.Title);
                        btn2.text("Seen it!").attr("id", res.imdbID).attr("class", "reviews btn btn-secondary").attr("name", res.Title).attr("data-bs-toggle", "modal").attr("data-bs-target", "#exampleModal").attr("data-bs-whatever", res.imdbID);

                        $(".searchResults").append(h2, h3, img, p, btn1, btn2);
                    }
                })

            }

            return movieObj;

        }).then(function (movieObj) {
            console.log(movieObj)

        });
    });
            $(document).on("click", ".watchList", function (event) {
                event.preventDefault();

                console.log("test");
                let imdbID = this.id;
                let name = this.name
                let newMovie = {
                    name: name,
                    imdbID: imdbID
                }

                $.ajax({
                    url: "/api/movies",
                    method: "POST",
                    data: newMovie
                }).then(function (response) {
                    console.log(response);
                    if (response.err) {
                        window.location = "/signup";
                    }
                })

        $.ajax({
            url: "/api/movies",
            method: "POST",
            data: newMovie
        }).then(function (response) {
            console.log(response);
            if (response.err) {
                window.location = "/signup";
            }
            $.ajax({
                url: "/api/usermovie/unseen",
                method: "POST",
                data: {id: newMovie.imdbID}
            }).then(function (res) {
              console.log(res)
            })
        })
        });

            $(document).on("click", ".reviews", function (event) {
                event.preventDefault();

                console.log("test");
                let imdbID = this.id;
                let name = this.name
                let newMovie = {
                    name: name,
                    imdbID: imdbID
                }

                $.ajax({
                    url: "/api/movies",
                    method: "POST",
                    data: newMovie
                }).then(function (response) {
                    console.log(response);
                    if (response.err) {
                        window.location = "/signup";
                    }
                })

    });
});
```

Using Express-Handlebars allows for the use of a single web page. Express-Handlebars requires the naming conventios of the folders "views", "layouts", and "partials".

The main.handlesbars located in the views/layouts folder has the basic HTML 5 page setup as well as BootStrap Brand Nav and a Grid System Container. Within the grid container is the handlebars tag for additional handle content to be imported into the field of {{{ body }}}.

Each web page body content is found at the base level of the views folder. Taking a look at the folder you can see a few pages listed. The reapeating sub sections of the web pages are found in the Partials/movies folder.

The reviews are rendered on the user profile using a block.handlebars segments that relies on both data being pulled in to and object from both the OMDB API and our MySQL "criterion" Database to be rendered into our handlebar tags with finesse.

```javascript
router.get("/user/:profile", function (req, res) {
  var hbsObject = {};
  var profile = req.params.profile;
  console.log(profile);

  db.User.findOne({
    where: {
      username: profile,
    },
  }).then(function (userInf) {
    hbsObject.userName = userInf.dataValues.username;
    hbsObject.img = userInf.dataValues.imgURL;

    db.UserMovie.findAll({
      where: {
        userID: userInf.id,
      },
    }).then(function (reviewInf) {
      reviewArr = [];
      for (i = 0; i < reviewInf.length; i++) {
        reviewArr.push(reviewInf[i].dataValues);
      }
      hbsObject.reviews = reviewArr;
      var promiseArr = [];

      for (let i = 0; i < reviewInf.length; i++) {
        promiseArr.push(
          db.Movie.findOne({
            where: {
              ID: reviewInf[i].dataValues.movieID,
            },
          }).then(function (results) {
            // console.log("movie database ========================", "\n", results.dataValues)
            console.log("===============================", "\n", reviewInf[i]);
            var movieData = {
              movieID: reviewInf[i].dataValues.movieID,
              review: reviewInf[i].dataValues.review,
              rating: reviewInf[i].dataValues.rating,
              watched: reviewInf[i].dataValues.watched,
            };

            return axios
              .get(
                "http://www.omdbapi.com/?apikey=b9e5adb0&i=" +
                  results.dataValues.imdbID
              )
              .then(function (response) {
                movieData.data = response.data;
                return movieData;
              });
          })
        );
      }
      Promise.all(promiseArr).then(function (responses) {
        hbsObject.movies = responses;
        hbsObject = {
          movies: hbsObject.movies,
          username: hbsObject.userName,
          avatar: hbsObject.img,
        };
        console.log("Handlebars Object:", hbsObject);

        res.render("profile", hbsObject);
      });
    });
  });
});
```

______________________________________________________________________________

## Created by

**Spencer**

* [GitHub Profile Page]()
* [Web Developer Portfoio Website]()
* [LinkenIn]()

**Sammy K**

* [GitHub Profile Page]()
* [Web Developer Portfoio Website]()
* [LinkenIn]()

**& Gloria C Varela**

* [GitHub Profile Page](https://github.com/gcvarela21)
* [Web Developer Portfoio Website](https://gcvarela21.github.io/glo.digital/)
* [Interactive Design Portfolio Website](https://www.glo.digital/)
* [LinkenIn](https://www.linkedin.com/in/glovarela/)

_____________________________________________________________________________

## Roles

```javascript

	let all = [ 
			ideation:"decide what we are going to make";
			proposal:"work together to fill out";
			Delegation:"assign roles and tasks for individual";
			Database:"discuss data table planning";
			schedule:"working out of class, meetings";
			stuck-time:"10-15 min, help each other";
			free-time:"help other team members";
			gitHub:"create branches, pull requests, approve";
			Merging:"communicate before,during, and after merging";
			];

	let spencer = [
			Passport:"enable login and out, restrict UA users";
			Bcrypt:"utilize for password storage";
			omdbapi:"append search results, push to database";
			Models:"index.js, user.js, usermovie.js";
			client:"public/index.js";
			Config:"database link, middleware, passport.js";
			Routing:"html and api";
			];

	let sammy = [ 
			Models:"index.js, movies.js, user.js, usermovie.js";
			client:"public/index.js, ";
			Routing:"api, our database and omdbapi/IMDB";
			block.handlebars:"backend retrieval-axios/client";
			Server-side:"pivot client res to server res ";
			Handlebars:"trouble-shoot transition into handlebars";
			];

	let gloria = [ 
			wireFrames:"adobe-illustrator";
			css:"custom styling classes and ids";
			bootStrap:"all responsive grid systems layouts";
			.handlebars:"front end main pages content";
			block.handlebars:"front end repeating template";
			stars-rating:"html/css layout, animation";
			anime.js:"look for animation ideas for wow factor";
			Miscellaneous:"google-slides, ReadMe.md";
			];

```

______________________________________________________________________________

### Contributing

```javascript
// There are no contributions at this time
```

______________________________________________________________________________

### Tests

```javascript
// There is no test at this time
```

______________________________________________________________________________

### Questions

If you have any questions contact: Any of the [Creators](#creators)

______________________________________________________________________________

### License

This project is licensed under: ![License](https://img.shields.io/static/v1?label=License&message=MIT&color=blueviolet&style=plastic)
