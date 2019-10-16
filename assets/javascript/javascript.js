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

function allowDropP(ev) {
    ev.preventDefault();
}
function dragP(ev) {
    ev.dataTransfer.setData('text', ev.target.id);
}
function dropP(ev) {
    ev.preventDefault();
    console.log(ev);    
    var data = ev.dataTransfer.getData('text');
    console.log(data);
    var copyButton = document.createElement('div');
    copyButton.setAttribute('class', (data === 'preferredTemplate') ? 'buttonPreferred  ' : 'buttonCannot');
    var original = document.getElementById(data);
    copyButton.src = original.src;
    ev.target.appendChild(copyButton);
}

