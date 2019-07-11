$(document).ready(function(){
    $(".gif-view").hide()
    $(".default-view").hide()
    
    var instr = setTimeout(function(){
        $(".default-view").fadeToggle(2000).fadeToggle(2000).fadeToggle(2000)
    }, 500)

    var gifs = [
        "Call of Duty",
        "Halo",
        "Fortnite",
        "Rainbow Six",
        "Rocket League",
        "Overwatch",
        "PUBG",
        "GTA",
        "RuneScape",
        "Club Penguin",
        "Dark Souls",
        "God of War",
        "Pokemon"
    ];
    
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
        $(".default-view").hide()
        clearTimeout(instr)
        let gif = prepStr($(this).text())
        let limit = 12
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
                let img = $("<img>").addClass("giphy")
                img.attr("src", results[i].images.fixed_height_still.url)
                img.attr("data-still", results[i].images.fixed_height_still.url)
                img.attr("data-animate", results[i].images.fixed_height.url)
                img.attr("data-state","still")
                div.append(p,img)
                $(".gif-view").prepend(div)
            }
            $(".gif-view").show()
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
        $("#gif-input").val("")
        renderButtons();
    });
    
    $("#clear-gif").on("click", function (event) {
        event.preventDefault();
        $(".gif-view").empty()
    });
    
    $(document).on("click", ".gif", displayGifs);
    
    renderButtons();
    
    $(document.body).on("click", ".giphy",function () {
        let state = $(this).attr('data-state');
        console.log("state "+state)
        if (state === 'still') {
            $(this).attr('src', $(this).attr('data-animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).attr('data-still'));
            $(this).attr('data-state', 'still');
        }
    });

})