$(document).ready(function () { 

var button = $(".submitSearch");

button.on("click", function () { 
    $(".searchResults").empty()
    $.ajax({
        url : `http://www.omdbapi.com/?apikey=b9e5adb0&s=${$("#searchBar").val()}`,
        method: "GET"
    }).then(function(response) {
        console.log(response);

            for (i = 0; i < response.Search.length; i++) {
                queryURL= "http://www.omdbapi.com/?apikey=b9e5adb0&t=" + response.Search[i].Title;
            
            $.ajax({
                url : queryURL,
                method: "GET"
            }).then(function(response) {
                console.log(response);
                
                var h2 = $("<h2>");
                var h3 = $("<h3>");
                var p = $("<p>");
                var img = $("<img>");
                var btn1= $("<button>");
                var btn2= $("<button>");
                h2.text(response.Title + " (" + response.Year + ") ")
                h3.text(response.Genre + " | " + "Rated: " + response.Rated);
                p.text(response.Plot);
                img.attr("src", response.Poster);
                btn1.text("Watch List").attr("id", "watchList");
                btn2.text("Seen it!").attr("id", "reviews");

                $(".searchResults").append(h2, h3, img, p, btn1, btn2);
            
            })}
        });
    });   
});    

