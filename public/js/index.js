$(document).ready(function () { 

// var db = require("../models");

var button = $(".submit");

button.on("click", function () { 
    $.ajax({
        url : `http://www.omdbapi.com/?apikey=b9e5adb0&s=${$("#searchBar").val()}`,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        for (var i=0; i < response.Search.length; i++) {
            var h1 = $("<h1>");
            var h2 = $('<h2>');
            var img = $('<img>');
            var button =$('<button>');
            var button2 =$('<button>');
            h1.text(response.Search[i].Title);
            h2.text(response.Search[i].Year);
            img.attr("src", response.Search[i].Poster);
            button.text("Watchlist").attr("id", "watch");
            button2.text("Seen it").attr("id", "seen");

            $(".container").append(h1, h2, img, button, button2);
            
            
            

        }
    });
});
    
});    
    

// const queryURL = `http://www.omdbapi.com/?apikey=b9e5adb0&s=${req.params.movie}`;