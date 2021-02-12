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

* [Live Site](#)
* [Project Repository](https://github.com/spenrad/Underrated)
* ![GIF Visual of The Deployed Web Application]()

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

stuff

______________________________________________________________________________
  
## Funtionality

This Apllication in its development used node-express to create a local sever to host the Api and Connct to the MySQL Workbench's local port to send GET Requests, Posts, and Update the local database in MySQL Workbench. This json information was called from and written to that database.

```javascript
			Code Snippets
```

This application also uses Axios requests to the Get information from the  

```javascript
			Code Snippets
```

Using Express-Handlebars allows for the use of a single web page. Express-Handlebars requires the naming conventios of the folders "views", "layouts", and "partials".

```html
	<body>			
			{{{ body }}}
	</body>
```

The main.handlesbars located in the views/layouts folder has the basic HTML 5 page setup as well as BootStrap Brand Nav and a Grid System Container. Within the grid container is the handlebars tag for additional handle content to be imported into the field of {{{ body }}}.

```html
	<body>			
			{{{ body }}}
	</body>
```

...block.handles file found in views/partials/movies folder. Using BootStrap's grid system.....

```html
	<body>			
			{{{ body }}}
	</body>
```

The elements are filled with the data querried from the database and api routing that are triggered by the event listeners in the Navigation Bar and Buttons on scree.

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

If you have any questions contact:

______________________________________________________________________________

### License

This project is licensed under: MIT
