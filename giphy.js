$(function() {
    //do on page load
    populateButtons(cars, 'carButton', '#carButtons');
});

var cars = ["ferrari", "bugatti", "hundai", "lamborghini", "lexus"];

//function to make buttons and add to page
function populateButtons(arrayToUse, classToAdd, areaToAddTo){
    $(areaToAddTo).empty();

    for (var i = 0; i < arrayToUse.length; i++){
        var a = $('<button>')
        a.addClass(classToAdd);
        a.attr('data-type', arrayToUse[i]);
        a.text(arrayToUse[i]);
        $(areaToAddTo).append(a);
    }

}

$(document).on('click', '.carButton', function(){
    $('#cars').empty();
    $('.carButton').removeClass('active');
    $(this).addClass('active');

    var type = $(this).data('type');
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({url: queryURL, method: 'GET'})
     .done(function(response) {
         var results = response.data;

         for(var i=0; i < results.length; i++){
             var carDiv = $('<div class="car-item">')

             var rating = results[i].rating;

             var p = $('<p>').text( "Rating: " + rating);

             var animated = results[i].images.fixed_height.url;
             var still = results[i].images.fixed_height_still.url;

             var carImage = $('<img>');
             carImage.attr('src', still);
             carImage.attr('data-still', still);
             carImage.attr('data-animate', animated);
             carImage.attr('data-state', 'still')
             carImage.addClass('carImage');

             carDiv.append(p)
             carDiv.append(carImage)

             $('#cars').append(carDiv);
         }
        
    }); 
});

$(document).on('click', '.carImage', function(){
    var state = $(this).attr('data-state'); //.data('state') won't work the way we expect
    
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
})

$('#addCar').on('click', function(){
    var newCar = $('input').eq(0).val();

    if (newCar.length > 2){
        cars.push(newCar);
    }

    populateButtons(cars, 'carButton', '#carButtons');

    return false;
});