document.addEventListener("DOMContentLoaded", function(event) { 
    dateFind();
  });

var dayNames = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday'
];

function dateFind() {
    var currentDate = new Date();
    var dayNumber = currentDate.getDate();
    console.log('daynumber: ' + dayNumber);
    var dayOfWeek = dayNames[currentDate.getDay()];
    console.log('dayofweek: ' + dayOfWeek);
    $('.col.' + dayOfWeek + ' .dayNumber').text(dayNumber);
    // console.log(currentDate);
    // console.log(typeof(currentDate));
    // var dateDiv = document.createElement("div");
    // var dateData = document.createTextNode(currentDate);
    // dateDiv.append(dateData);

    //$('#dateHolder').append(dateDiv);
}   