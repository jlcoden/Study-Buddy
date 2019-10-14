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
    let dayName = daysOfWeek.indexOf(dayToday, 0);
    console.log(dayName);
}