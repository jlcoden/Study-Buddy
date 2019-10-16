//declaring lattitude and longitude variables

var lat;
var lng;

//document event listener
document.addEventListener("DOMContentLoaded", function() {
  //function to initalize map
  return;
  function initialize() {
    //grab input from text search input
    var input = document.getElementById("searchTextField");
    //use Google's autocomplete functionlity to search for places
    var autocomplete = new google.maps.places.Autocomplete(input);
    google.maps.event.addListener(autocomplete, "place_changed", function() {
      var place = autocomplete.getPlace();
      // get lat
      lat = place.geometry.location.lat();
      // get lng
      lng = place.geometry.location.lng();

      console.log(lat);
      console.log(lng);
    });
  } //add listener
  google.maps.event.addDomListener(window, "load", initialize);
});

//on document
$(document).ready(function() {
  $(".btn-floating.red").click(function() {
    var searchField = $("<input>")
      .attr("type", "text")
      .attr("size", "50")
      .attr("placeholder", "Choose Study Location")
      .attr("autocomplete", "on")
      .attr("runat", "server")
      .css("position", "absolute")
      .css("left", "1em")
      .css("top", "1em")
      .css("right", "1em")
      .attr("id", "testId");

    $(".card-image").append(searchField);

    //check if enter key is pressed
    searchField.keyup(function(event) {
      if (event.keyCode == 13) {
        showTile(event);
      }
    });

    var searchElement = document.getElementById("testId");
    var autocomplete = new google.maps.places.Autocomplete(searchElement);
    google.maps.event.addListener(autocomplete, "place_changed", function() {
      var place = autocomplete.getPlace();
      lat = place.geometry.location.lat();
      lng = place.geometry.location.lng();
    });

    //google.maps.event.addDomListener(window, "load", initialize);
  });
});

//show tile of map image
function showTile(event) {
  //console log for debugging
  console.log("ShowTile");
  console.log(window.lat);
  console.log(window.lng);
  var url =
    "https://maps.googleapis.com/maps/api/staticmap?center=" +
    window.lat +
    "," +
    window.lng +
    "&zoom=17&size=600x600&format=png32&maptype=roadmap&markers=size:mid|color:red|" +
    window.lat +
    "," +
    window.lng +
    "&key=AIzaSyCmhlYrcIaalp0JkPrA2_XqDOX-wL9WXdk";
  $(".card-image").css("background-image", "url(" + url + ")");
  $(".card-image").on("click", function() {
    mapsSelector();
  });
}

//mapSelector function checks if the map is being loading on ios or windows
function mapsSelector() {
  if (
    /* if we're on iOS, open in Apple Maps */
    navigator.platform.indexOf("iPhone") != -1 ||
    navigator.platform.indexOf("iPod") != -1 ||
    navigator.platform.indexOf("iPad") != -1
  )
    window.open(
      "maps://maps.google.com/maps/dir/?daddr=" +
        window.lat +
        "," +
        window.lng +
        "&amp;ll="
    );
  /* else use Google */ else
    window.open(
      "https://maps.google.com/maps/dir/?daddr=" +
        window.lat +
        "," +
        window.lng +
        "&amp;ll="
    );
  //map is then loaded and user can search for directions
}
