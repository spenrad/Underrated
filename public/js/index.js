$(document).ready(function () {
    var button = $(".submitSearch");

    button.on("click", function () {
        var movieObj = [];
        $(".searchResults").empty();
        $.ajax({
            url: `http://www.omdbapi.com/?apikey=b9e5adb0&s=${$("#searchBar").val()}`,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            for (i = 0; i < response.Search.length; i++) {
                queryURL = "http://www.omdbapi.com/?apikey=b9e5adb0&t=" + response.Search[i].Title;
                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function (response) {
                    // console.log("title search:", response);
                    var h2 = $("<h2>");
                    var h3 = $("<h3>");
                    var p = $("<p>");
                    var img = $("<img>");
                    var btn1 = $("<button>");
                    var btn2 = $("<button>");
                    let film = {
                        title: response.Title,
                        year: response.Year,
                        genre: response.Genre,
                        rating: response.Rated,
                        plot: response.Plot,
                        poster: response.Poster,
                        imdbId: response.imdbID
                    };
                    movieObj.push(film);





                    h2.text(response.Title + " (" + response.Year + ") ")
                    h3.text(response.Genre + " | " + "Rated: " + response.Rated);
                    p.text(response.Plot);
                    img.attr("src", response.Poster);

                    btn1.text("Watch List").attr("id", response.imdbID ).attr("class", "watchList btn btn-secondary").attr("name", response.Title);
                    btn2.text("Seen it!").attr("id", response.imdbID ).attr("class", "reviews btn btn-secondary").attr("name", response.Title);

                    $(".searchResults").append(h2, h3, img, p, btn1, btn2);

                })

            }

            return movieObj;

        }).then(function (movieObj) {
            console.log(movieObj)
            let movieThing = JSON.stringify(movieObj);
            console.log("test: ", movieThing)
            $.ajax("/api/films", {
                type: "GET",
                data: movieObj
            }).then(function () { console.log("end of client side get request") });
        })
     
 
    });


    $(document).on("click", ".watchList", function (event) {
        event.preventDefault();

        console.log("test");
        let imdbID = this.id;
        let name = this.name
        let newMovie = {
            name : name,
            imdbID : imdbID
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

    
    $(document).on("click", ".reviews", function (event) {
        event.preventDefault();

        console.log("test");
        let imdbID = this.id;
        let name = this.name
        let newMovie = {
            name : name,
            imdbID : imdbID
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

