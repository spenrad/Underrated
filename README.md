# Underrated

![License](https://img.shields.io/static/v1?label=License&message=MIT&color=blueviolet&style=plastic)

A Web based Movie Review Community and database.

* [Live Site](#)
* [Project Repository](https://github.com/spenrad/UCBCBMDB)

## Summary

Smartly holystone knave Letter of Marque Blimey lee lass lugsail long clothes chase guns Arr me jolly boat hearties belay hornswaggle. Gunwalls skysail ho wench cable Pirate Round reef sails hempen halter aft sheet Admiral of the Black rutters Davy Jones' Locker man-of-war scallywag nipperkin. Walk the plank maroon bilge gunwalls Buccaneer lugger lass rum dead men tell no tales jolly boat Shiver me timbers loot booty gabion port Cat o'nine tails.

![GIF Visual of The Deployed Web Application]()

______________________________________________________________________________

## Table of Contents

* [Summary](#summary)
* [Built With](#builtwith)
* [How It Works](#howitworks)
* [Author/Links](#Author/Links)
* [Contributing](#Contributing)
* [Tests](#tests)
* [Questions](#questions)
* [License](#license)

______________________________________________________________________________

## **Built With**

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

______________________________________________________________________________
  
## How It Works

**DEPENDANCIES:**

* [Node](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [Express-Handlebars](https://www.npmjs.com/package/express-handlebars/)
* [MySQL](https://www.mysql.com/products/workbench/)
* [HEROKU](https://www.heroku.com/home)
* [JAWSDB-MySQL](https://www.jawsdb.com/)

This application was created by using Node.js, Node Package -Express, Node Package -Express-Hadlebars, and node Node Package -mysql. A data based was created using MySQL Work Bench and using the Schema Inclued in the repository. This Apllication in its development used node-express to create a local sever to host the Api and Connct to the Work Bench's local port to send GET Requests, Posts, and Update the local database in MySQL Workbench. This json information was called from and written to that database.

Using Express-Handlebars allows for the use of a single web page. Express-Handlebars requires the naming conventios of the folders "views", "layouts", and "partials".

The main.handlesbars located in the views/layouts folder has the basic HTML 5 page setup as well as BootStrap Brand Nav and a Grid System Container. Within the grid container is the handlebars tag for additional handle content to be imported into the field of {{{ body }}}.

```html
	<body>			
			{{{ body }}}
	</body>
```

...block.handles file found in views/partials/movies folder. Using BootStrap's grid system.....

```javascript
 <div class="col-12">

  </div>
```

The elements are filled with the data querried from the database and api routing that are triggered by the event listeners in the Navigation Bar and Buttons on scree.

```javascript
var fill = "fill this up with some cool stuff";
```

______________________________________________________________________________

## Created by:

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
