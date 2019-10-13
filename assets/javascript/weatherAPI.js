// This is our API key
var APIKey = "&appid=8c24bcb54a1a145708ca7717f2851eb4";
var lat = 47;
var lon = 122;
var weatherDays = [];
//   https://api.openweathermap.org/data/2.5/forecast?lat=35&lon=139&appid=8c24bcb54a1a145708ca7717f2851eb4
// Here we are building the URL we need to query the database
var queryURL =
  "https://api.openweathermap.org/data/2.5/forecast/daily?lat=" +
  lat +
  "&lon=" +
  lon +
  "&cnt=14" +
  APIKey;

// Here we run our AJAX call to the OpenWeatherMap API
$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(results) {
  // Log the queryURL
  console.log(queryURL);
  // Log the resulting object
  // Transfer content to HTML
  $(".city").html("<h1>" + results.city.name + " Weather Details</h1>");
  processWeather(results.list);
  console.log(weatherDays);
});

function processWeather(daysData) {
  for (var i = 0; i < daysData.length; i++) {
    // $(".wind").text("Wind Speed: " + results.list[i].speed);
    // $(".humidity").text("Humidity: " + results.list[i].humidity);
    // $(".temp").text("Temperature (F) " + results.list[i].temp.day);
    // // Log the data in the console as well

    weatherDays.push({
      temp: Math.round(daysData[i].temp.day),
      code: daysData[i].weather[0].id,
      text: daysData[i].weather[0].description,
      date: new Date(daysData[i].dt * 1000)
    });
  }

  var today = weatherDays[0];
  var tomorrow = weatherDays[1];
  var dayAfterTomorrow = weatherDays[2];
}
