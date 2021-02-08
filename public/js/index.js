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
                        btn2.text("Seen it!").attr("id", res.imdbID).attr("class", "reviews btn btn-secondary").attr("name", res.Title).attr("data-bs-toggle", "modal").attr("data-bs-target", "#exampleModal").attr("data-bs-whatever", res.Title);

                        $(".searchResults").append(h2, h3, img, p, btn1, btn2);
                    }
                })

            }

            return movieObj;

        }).then(function (movieObj) {
            console.log(movieObj)

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


    $(document).on("click", "#testarooney", function (event) {
        console.log("button pressed");
        var hbsObject = {
            title: "movie title",
            year: "420",
            genre: "funnies",
            rating: "G",
            plot: "plot plot plot plot plot plot plot plot plot plot plot",
            poster: "https://m.media-amazon.com/images/M/MV5BODRlMjRkZGEtZWM2Zi00ZjYxLWE0MWUtMmM1YWM2NzZlOTE1XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
            imdbId: "tt0089218"
        };
        console.log(hbsObject);

        var template = document.getElementById('movie-block').innerHTML;
        var render = Handlebars.compile(template);
        document.getElementById('testing').innerHTML = render(hbsObject);
    });
});