$(document).ready(function () {
  var button = $(".submitSearch");

  button.on("click", function () {
    $(".searchResults").empty();
    $.ajax({
      url: `https://www.omdbapi.com/?apikey=b9e5adb0&s=${$(
        "#searchBar"
      ).val()}`,
      method: "GET",
    })
      .then(function (response) {
        console.log(response);

        for (i = 0; i < response.Search.length; i++) {
          queryURL =
            "http://www.omdbapi.com/?apikey=b9e5adb0&i=" +
            response.Search[i].imdbID;
          $.ajax({
            url: queryURL,
            method: "GET",
          }).then(function (res) {
            if (res.Poster == "N/A") {
              console.log(res.title, " doesn't have a poster");
            } else {
              console.log("title search:", res);
              // var h2 = $("<h2>");
              // var h3 = $("<h3>");
              var p = $("<p>");
              var img = $("<img>");
              var btn1 = $("<button>");
              var btn2 = $("<button>");
              var div1 = $("<div>");
              var div2 = $("<div>");
              var div3 = $("<div>");
              var div4 = $("<div>");
              var space1 = $("<div>");
              var space2 = $("<div>");
              var space3 = $("<div>");
              var space4 = $("<div>");
              var space5 = $("<div>");
              var space6 = $("<div>");
              var space7 = $("<div>");
              var space8 = $("<div>");
              var space9 = $("<div>");
              var space10 = $("<div>");
              var space11 = $("<div>");
              var space12 = $("<div>");
              var space13 = $("<div>");
              var space14 = $("<div>");

              space1
                .attr("class", "sSpace col-4 d-flex justify-content-center");
              space2
                .attr("class", "sSpace col-4 d-flex justify-content-center");
              space3
                .attr("class", "sSpace col-4 d-flex justify-content-center");
              space4
                .attr("class", "sSpace col-4 d-flex justify-content-center");
              space5
                .attr("class", "sSpace col-4 d-flex justify-content-center");
              space6
                .attr("class", "sSpace col-4 d-flex justify-content-center");
              space7
                .attr("class", "sSpace col-4 d-flex justify-content-center");
              space8
                .attr("class", "sSpace col-4 d-flex justify-content-center");
              space9
                .attr("class", "sSpace col-4 d-flex justify-content-center");
              space10
                .attr("class", "sSpace col-4 d-flex justify-content-center");
              space11
                .attr("class", "sSpace col-4 d-flex justify-content-center");
              space12
                .attr("class", "sSpace col-4 d-flex justify-content-center");
              space13
                .attr("class", "sSpace col-4 d-flex justify-content-center");
              space14
                .attr("class", "sSpace col-4 d-flex justify-content-center");
              div1
                .text(res.Title)
                .attr("class", "sTitle col-4 d-flex justify-content-center");
              div2
                .text(res.Year)
                .attr("class", "sYear col-4 d-flex justify-content-center");
              div3
                .text(res.Genre)
                .attr("class", "sGenre col-2 d-flex justify-content-center");
              div4
                .text(res.Rated)
                .attr("class", "sRated col-2 d-flex justify-content-cneter");
              p
                .text(res.Plot)
                .attr("class", "sPlot col-4 d-flex justify-content-center");
              img
                .attr("src", res.Poster)
                .attr("class", "sPoster col-4 d-flex justify-content-center");

              btn1
                .text("Watch List")
                .attr("id", res.imdbID)
                .attr("class", "watchList btn btn-secondary col-4 d-flex justify-content-center sBttn1")
                .attr("name", res.Title);
              btn2
                .text("Seen it!")
                .attr("id", res.imdbID)
                .attr("class", "col-4 d-flex justify-content-center reviews btn btn-secondary sBttn2")
                .attr("name", res.Title)
                .attr("data-bs-toggle", "modal")
                .attr("data-bs-target", "#reviewModal")
                .attr("data-bs-whatever", res.imdbID);

              $(".searchResults").append(space1, div1, space2, space3, div2, space4, space5, div3, div4, space6, space7, p, space8, space9, img, space10, space11, btn1, space12, space13, btn2, space14);
            }
          });
        }
      })
      .then(function (movieObj) {
        console.log(movieObj);
      });
  });
  $(document).on("click", ".watchList", function (event) {
    event.preventDefault();
    let imdbID = this.id;
    let name = this.name;
    let newMovie = {
      name: name,
      imdbID: imdbID,
    };

    $.ajax({
      url: "/api/movies",
      method: "POST",
      data: newMovie,
    }).then(function (response) {
      console.log(response);
      if (response.err) {
        window.location = "/signup";
      }
    });

    $.ajax({
      url: "/api/usermovie/unseen",
      method: "POST",
      data: { id: newMovie.imdbID },
    }).then(function (res) {
      console.log(res);
    });
  });

  $(document).on("click", ".reviews", function (event) {
    event.preventDefault();
    let imdbID = this.id;
    let name = this.name;
    let newMovie = {
      name: name,
      imdbID: imdbID,
    };

    $.ajax({
      url: "/api/movies",
      method: "POST",
      data: newMovie,
    }).then(function (response) {
      console.log(response);
      if (response.err) {
        window.location = "/signup";
      }
    });
  });
});
