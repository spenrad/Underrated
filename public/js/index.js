$(document).ready(function () {
  var button = $(".submitSearch");

  button.on("click", function (event) {
    event.preventDefault();
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
              
        var html = `
                    <br>
                    <div class="searchBlock">
                      <div class="row">
                        <div class="col-md-3">
                          <img src="${res.Poster}" style="width:150px;height:222px;"/>
                        </div>
                        <div class="col-md-7" id="details">
                          <h2>${res.Title + " (" + res.Year + ") "}</h2>
                          <h4>${res.Genre + " | " + "Rated: " + res.Rated}</h4>
                          <p>${res.Plot}</p>
                          <button id="${res.imdbID}" class="btn watchList" name="${res.Title}">Watch List</button>
                          <button id="${res.imdbID}" class="btn reviews" name="${res.Title}" data-bs-toggle="modal" data-bs-target="#reviewModal" data-bs-whatever="${res.imdbID}">Seen It!</button>
                        </div>
                      </div>
                    </div>
                    <br>`

              $(".searchResults").append(html);
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
