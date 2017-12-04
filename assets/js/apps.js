$('document').ready(function() {

//GLOBAL VARIABLES
var buttonHTML = '';
var disneyChar = ["Aladdin",
                  "Ariel",
                  "Cinderella",
                  "Donald Duck",
                  "Goofy",
                  "Mickey Mouse", 
                  "Minnie Mouse",
                  "Peter Pan",
                  "Pluto",
                  "Snow White",
                   ];
var newDisneyChar;
var gif = [];

//create buttons, initial load
function createTheButtons() {
    for (var i = 0; i < disneyChar.length; i++) {
      buttonHTML += "<button class='btn btn-lrg btn-info charButtons' charName=" + disneyChar[i] + ">" + disneyChar[i] + "</button>";
    }
    $('#buttonsDiv').html(buttonHTML);
}

//Call function
createTheButtons();

//on click of submit button
$('body').on('click', '#submitUserData', function(event){
    event.preventDefault(); //stop refresh of page
    newDisneyChar = $('#userInput').val(); //capture value
    var newCharButton = "<button class='btn btn-lrg btn-info charButtons' charName=" + newDisneyChar + ">" + newDisneyChar + "</button>";
    $('#buttonsDiv').append(newCharButton);//append html to #buttonsDiv as new button.
});

//on click of body, listen for class of charButtons, if match, run this function.
$('body').on('click', '.charButtons', function(event){
     $('.GIFdiv').empty(); //clear div of old GIFs.
     var chosenDisneyChar = $(this).attr('charName'); 
     //ajax to giphy.com, limit 10.
     var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + chosenDisneyChar + "&limit=10" +"&api_key=dc6zaTOxFJmzC";//The API Key.
     $.ajax({url: queryURL, method: 'GET'})
          .done(function(response)/*on completion of ajax, run function for each item returned*/ {
               for (var i = 0; i < response.data.length; i++) {
                    $('.GIFdiv').append("<div class='GIFbox'><p class='title'>Rating: "
                      + response.data[i].rating.toUpperCase() 
                      + "</p><div class='image-container'><img class='charIMG img-responsive center-block'" 
                      + "data-still='" 
                      + response.data[i].images.downsized_still.url 
                      + "'" 
                      + "data-animate='" 
                      + response.data[i].images.downsized.url 
                      + "'" 
                      + "data-state='still'" 
                      + "src='" 
                      + response.data[i].images.downsized_still.url 
                      + "'></div></div>");
                    gif.push(response.data[i].images.downsized.url);
               }
          }); //end ajax
}); //end body on click

//on click, animate gifs
$('body').on('click', '.charIMG', function(){
     var state = $(this).attr('data-state');
     var GIFnotMoving = $(this).attr('data-still');
     var GIFmoving = $(this).attr('data-animate');
     if (state === 'still') {
          $(this).attr('src', GIFmoving);
          $(this).attr('data-state', 'animate');
     }//on second click, return gif to beginning.
     else if (state !== "still") {
          $(this).attr('src', GIFnotMoving);
          $(this).attr('data-state', 'still');
     };
});  // end foodIMG on click

}); //end document.ready