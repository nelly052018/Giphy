


var topics = ["snow white", "beauty and the beast", "mickey mouse", "tangled", "shrek", "lion king", "brave", "the princess and the frog", "hercules", "mulan", "dumbo"]
$(document).on("click", ".movie", function (event) {
    event.preventDefault();
    var movie = $(this).attr("data-name")
    $("#image").text("")
    console.log(movie);
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=P32eFcl26m6HYQOKK2ogkjX09MNk3Rwo&q=" + movie + "&limit=10&rating=g";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        for (var i = 0; i < response.data.length; i++) {
            var imageStill = response.data[i].images.fixed_width_still.url;
            var imageAnimated = response.data[i].images.original.url;
            var imageTag = $("<img width=250 height=250>");
            var rating = response.data[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            imageTag.addClass("image");
            imageTag.attr("src", imageStill);
            imageTag.attr("data-still", imageStill);
            imageTag.attr("data-animate", imageAnimated);
            imageTag.attr("data-state", "still");
            $("#image").append(imageTag)
            $("#image").append(p);





        }
    });
})
$(document).on("click", ".image", function (event) {
    event.preventDefault();
    var currentState = $(this).attr("data-state")
    if (currentState === "still") {
        var animatedImage = $(this).attr("data-animate")
        $(this).attr("src", animatedImage);
        $(this).attr("data-state", "animate");
    }
    else {
        var stillImage = $(this).attr("data-still")
        $(this).attr("src", stillImage);
        $(this).attr("data-state", "still");

    }


});


function appendButtons() {
    //empty buttons to prevent duplicates
    $("#buttons-view").text("");

    // Loop through the topics array
    for (var i = 0; i < topics.length; i++) {

        //create buttons using jQuery
        var addMovie = $("<button>");
        // Add a class
        addMovie.addClass("movie");
        // Add a data-attribute with a value of the movie at index i
        addMovie.attr("data-name", topics[i]);
        //add the topic text entered 
        addMovie.text(topics[i]);
        // Add the button to the HTML document
        $("#buttons-view").append(addMovie);

    }
}
$("#add-movie").on("click", function (event) {
    //prevent the page from refreshing after submitting
    event.preventDefault();

    //add the value of the movie text 
    var movie = $("#movie-input").val().trim();
    // Add movie to array
    topics.push(movie);
    //call function 
    appendButtons();
    $("#movie-input").val("")
});




// call function to display the initial list of movies
appendButtons();


