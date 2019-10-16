var daysOfWeek = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday'
];






$(document).ready(function() {
    console.log("im ready");
    datePull();
})  

function datePull() {
    let newDate = new Date();
    let dateToday = newDate.getDate();
    console.log(dateToday);
    let dayToday = newDate.getDay();
    console.log(dayToday);
    let dayName = daysOfWeek[dayToday];
    console.log(dayName);
}


function allowDrop(ev) {
    ev.preventDefault();
}
function drag(ev) {
    ev.dataTransfer.setData('text', ev.target.id);
}
function drop(ev) {
    ev.preventDefault();
    console.log(ev);
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}