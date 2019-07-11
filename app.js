$(document).ready(function(){
    
    var gifs = ["Call of Duty","Halo","Fortnite","Rainbow Six","Rocket League","Overwatch","PUBG","GTA","RuneScape","Club Penguin"];
    
    var prepStr = function(str) {
        // allow for search queries with spaces btw words
        var newStr = "";
        for (var i = 0; i < str.length; i++) {
            var cc = str.substring(i, i + 1)
            if (cc == " ") {
                newStr += "+"
            }
            else {
                newStr += cc
            }
        }
        return newStr
    }

    function displayGifs() {
        $(".gif-view").empty()
        let gif = prepStr($(this).text())
        let limit = 5
        let queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + gif + '&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit='+limit;
    
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response)
            let results = response.data
            for (var i = 0; i < results.length; i++) {
                let div = $("<div>").addClass("img-div")
                let p = $("<p>").text("Rated: " + results[i].rating)
                let img = $("<img>").attr("src", results[i].images.fixed_height.url)
                div.append(p,img)
                $(".gif-view").prepend(div)
            }
        })
    }
    
    function renderButtons() {
        $("#buttons-view").empty();
        for (var i = 0; i < gifs.length; i++) {
            let btn = $("<button>");
            btn.addClass("gif");
            btn.attr("data-name", gifs[i]);
            btn.text(gifs[i]);
            $("#buttons-view").append(btn);
        }
    }
    
    $("#add-gif").on("click", function (event) {
        event.preventDefault();
        let gif = $("#gif-input").val().trim();
        gifs.push(gif);
        renderButtons();
    });
    
    $(document).on("click", ".gif", displayGifs);
    
    renderButtons();


})