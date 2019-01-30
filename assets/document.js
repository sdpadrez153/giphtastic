$(document).ready(function () {

    var topics = ["german shepherd", "dogs", "monkeys", "baby cubs", "puppies", "kittens", "baby hippo", "baby flamingo", "baby kangaroo", "baby koala"];

    function renderButtons() {
        $('#buttons-view').empty();

        for (var i = 0; i < topics.length; i++) {
            var a = $('<button>');
            a.addClass('buttons');
            a.text(topics[i]);
            $('#buttons-view').append(a);
        }
    }
    renderButtons();

    //on button click
    $(document).on('click', '.buttons', function () {

        var index = $(this).html();
        // console.log(index);

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + index + "&api_key=MVTYKL297FTyRatC2dx1FuuDU8z8Sk4b&limit=10";
        //   console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {

            var results = response.data;

            $('#aww-gif').empty();
            for (var j = 0; j < results.length; j++) {
                var imageDiv = $('<div>');
                var imageView = results[j].images.fixed_height.url;
                var still = results[j].images.fixed_height_still.url;
                // console.log(imageView);  

                var images = $('<img>').attr("src", still).attr('data-animate', imageView).attr('data-still', still);
                images.attr('data-state', 'still');
                $('#aww-gif').prepend(images);
                images.on('click', goGif);

                var rating = results[j].rating;
                // console.log(rating);
                var displayRated = $('<p>').text("Rating: " + rating);
                $('#aww-gif').prepend(displayRated);
                // console.log(displayRated);
            }

        });

        function goGif() {
            var state = $(this).attr('data-state');
            // console.log(state);
            if (state == 'still') {
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            } else {
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }

        }

    });

    $(document).on('click', '#add-gif', function () {
            
            var add = $('#giphy').val().trim();
            topics.push(add);
            $('#giphy').val('');
            renderButtons();

        
    });
});