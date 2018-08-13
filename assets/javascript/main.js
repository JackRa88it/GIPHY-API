// GLOBAL VARIABLES
// ---------------------

var buttons = ['cats', 'dogs', 'naked mole rats'];


// FUNCTIONS
// ---------------------

function displayButtons() {
  $('#buttons').empty();
  for (i = 0; i < buttons.length; i++) {
    var button = $('<button>');
    button.val(buttons[i]);
    button.text(buttons[i]);
    $('#buttons').append(button);
  };
};

// EVENT HANDLERS
// ---------------------

$('#gifs').on('click', '.gif', function() {
  state = $(this).attr('data-state');
  if (state == 'still') {
    $(this).attr('src', $(this).attr('data-animate'));
    $(this).attr('data-state', 'animate');
  }
  else if (state == 'animate') {
    $(this).attr('src', $(this).attr('data-still'));
    $(this).attr('data-state', 'still');
  }
  else {};
});
// ^needs hooking up to the gifImg's values

$('#searchForm').on('submit', function(event) {
  event.preventDefault();
  if ($('#search').val().length > 2) {
    buttons.push($('#search').val());
    displayButtons();
    $('#search').val('');
  }
  else {
    $('#search').val('');
  }
});

$('#buttons').on('click', 'button', function() {
  var search = $(this).val();
  var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + search + '&api_key=dc6zaTOxFJmzC&limit=10';
  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function(response) {
    console.log(response.data);
    var results = response.data;
    for (var i = 0; i < results.length; i++) {
      var gifImg = $('<img>');
      gifImg.attr('class', 'gif');
      gifImg.attr('src', results[i].images.fixed_height_still.url);
      gifImg.attr('data-still', results[i].images.fixed_height_still.url);
      gifImg.attr('data-animate', results[i].images.fixed_height.url);
      gifImg.attr('data-state', 'still');
      $('#gifs').prepend(gifImg);
    };
  });
}); 


// CALLS
// ---------------------

displayButtons();