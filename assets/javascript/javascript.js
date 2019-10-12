document.addEventListener("DOMContentLoaded", function(event) { 
    dateFind();
  });



function dateFind() {
    var currentDate = new Date();
    document.getElementById("dateHolder").innerHTML = currentDate.getDate();
    console.log(currentDate);
    console.log(typeof(currentDate));
    var dateDiv = document.createElement("div");
    var dateData = document.createTextNode(currentDate);
    dateDiv.append(dateData);
    //$('#dateHolder').append(dateDiv);
}   