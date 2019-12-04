const firebaseConfig = {
  apiKey: "AIzaSyDCN-ygwLXWpvA37aKz5R_SdOafbhNoydU",
  authDomain: "studybuddy-eba82.firebaseapp.com",
  databaseURL: "https://studybuddy-eba82.firebaseio.com",
  projectId: "studybuddy-eba82",
  storageBucket: "studybuddy-eba82.appspot.com",
  messagingSenderId: "373388498163",
  appId: "1:373388498163:web:edc7514114a8d0197ad386"
};

let userId;
let userData;
let groupData;
let groupMemberCount = 0;

firebase.initializeApp(firebaseConfig);
hideEventCard();

$('#sign-in').click(function() {
  let email = $('#login-email').val();
  let password = $('#login-password').val();
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(error.message);
    showLoginResult(error.message);
  });
});

$('#register').click(function() {
  let email = $('#login-email').val();
  let password = $('#login-password').val();
  console.log(email + ', ' + password);
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // TODO: display an error message of some sort
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(error.message);
    showLoginResult(error.message);
  });
});

function showLoginResult(message) {
  $('.landing span.result').text(message);
  setTimeout(function() {
    $('.landing span.result').text('');
  }, 4000);
}

$('#sign-out').click(function() {
  firebase.auth().signOut();
})

$('#enterGroup').click(function() {
  let groupName = $('#group-name').val();
  if (groupName) {
    firebase.database().ref('groups').child(groupName).once('value', function(snapshot) {
      let groupData = snapshot.val();
      // join the group, which will create it if it does not exist
      firebase.database().ref('groups').child(groupName).child('members').child(userId).set(true);
      firebase.database().ref('users').child(userId).child('groupName').set(groupName);
      firebase.database().ref('users').child(userId).once('value', function(snapshot) {
        if (snapshot.val()) {
          userData = snapshot.val();
          showUserPage();
          initStudyBuddy();
        }
      });
    });
  }
});

$('.sidebar .card #editLocation').click(showMeetingLocationInput);
$('.sidebar .card #deleteEvent').click(deleteSelectedEvent);
$('.sidebar .card #thumbsUp').click(upvoteSelectedEvent);

function deleteSelectedEvent() {
  $('.sidebar .card').hide();
  firebase.database().ref('groups')
                     .child(userData.groupName)
                     .child('calendar')
                     .child(selectedEventMonth)
                     .child(selectedEventDay)
                     .child(selectedEventKey)
                     .set({ });
}

function upvoteSelectedEvent() {
  firebase.database().ref('groups')
                     .child(userData.groupName)
                     .child('calendar')
                     .child(selectedEventMonth)
                     .child(selectedEventDay)
                     .child(selectedEventKey)
                     .child('upvotes')
                     .child(firebase.auth().currentUser.email.split('@')[0])
                     .set(true);
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log('Authenticated.');
    userId = user.uid;
    firebase.database().ref('users')
                       .child(userId)
                       .once('value', function(snapshot) {
                          if (snapshot.val()) {
                            userData = snapshot.val();
                            showUserPage();
                            initStudyBuddy();
                          } else {
                            showGroupsPage();
                          }
                        });
  } else {
    console.log('Deauthenticated.');
    showLanding();
  }
});

function signOut() {
  firebase.auth().signOut().then(function() {
    // Deauthenticated
    showLanding();
  }).catch(function(error) {
    console.log(error);
  });
}

function showLanding() {
  $('.userPage').css('display', 'none');
  $('.groupsPage').css('display', 'none');
  $('.landing').css('display', 'flex');
}

function showUserPage() {
  $('.userPage').css('display', 'flex');
  $('.groupsPage').css('display', 'none');
  $('.landing').css('display', 'none');
  loadCalendarDays()
}

function showGroupsPage() {
  $('.landing').css('display', 'none');
  $('.userPage').css('display', 'none');
  $('.groupsPage').css('display', 'flex');
}

async function initStudyBuddy() {
  loadUserDetails();
  await loadGroupDetails();
  followGroupCalendar();
}

function loadUserDetails() {
  $('.header .user-info').text('You are ' + firebase.auth().currentUser.email + '.  You are in the "' + userData.groupName + '" study group.');
}

function loadGroupDetails() {
  return new Promise(function(resolve, reject) {
    firebase.database().ref('groups').child(userData.groupName).once('value', snapshot => {
      groupData = snapshot.val();
      groupMemberCount = Object.keys(groupData.members).length;
      resolve();
    });
  });
}

let calendarEvents = {};

async function followGroupCalendar() {
  await loadGroupDetails();
  let month = new Date().getMonth();
  let day = new Date().getDate();
  firebase.database().ref('groups').child(userData.groupName).child('calendar').on('value', function(snapshot) {
    $('.day > :not(.dayInfo)').remove();
    if (!snapshot.val() || !snapshot.val()[month]) return;
    let monthData = snapshot.val()[month];
    $('.day').each(function() {
      let dayNumber = $(this).attr('data-dayOfMonth');
      let dayEvents = monthData[dayNumber];
      for (let key in dayEvents) {
        let testCondition = $('.event-template[data-firebase-key=' + key + ']');
        //if (!testCondition.length) {
        if (true) {
          let eventData = dayEvents[key];
          calendarEvents[key] = eventData;
          let copyButton = $('<div>');
          copyButton.addClass(eventData.eventType).addClass('live').addClass('event-template');
          copyButton.attr('data-firebase-key', key);
          copyButton.attr('data-monthOfYear', $(this).attr('data-monthOfYear'));
          copyButton.attr('data-dayOfMonth', $(this).attr('data-dayOfMonth'));
          let voteCount = eventData.upvotes ? Object.keys(eventData.upvotes).length : 0;
          if (voteCount === groupMemberCount) {
            copyButton.addClass('approved');
          }
          copyButton.text(eventData.creator);
          $('.day[data-dayOfMonth=' + dayNumber + ']').append(copyButton);
        }
        if (key === selectedEventKey) {
          showEventCard(key);
        }
      }
    });
  });
}

let daysOfWeek = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
function loadCalendarDays() {
  let dayNumber = new Date().getDay();
  let todayOfMonth = new Date().getDate();
  let monthOfYear = new Date().getMonth();
  let dayName = daysOfWeek[dayNumber];
  let dayElement = $('.calendar .current.week').children('div:nth-of-type(' + (dayNumber + 1) + ')');
  dayElement.children('.dayInfo').children('.dayName').text(dayName);
  dayElement.children('.dayInfo').children('.dayNumber').text(todayOfMonth);
  for (let i = dayNumber; i >= 0; i--) {
    let thisDayOfMonth = todayOfMonth - (dayNumber - i);
    $('.calendar .current.week').children().eq(i + 1).attr('data-dayOfWeek', daysOfWeek[i]);
    $('.calendar .current.week').children().eq(i + 1).attr('data-monthOfYear', monthOfYear);
    $('.calendar .current.week').children().eq(i + 1).attr('data-dayOfMonth', thisDayOfMonth);
    $('.calendar .current.week').children().eq(i + 1).children('.dayInfo').children('.dayName').text(daysOfWeek[i].slice(0, 3));
    $('.calendar .current.week').children().eq(i + 1).children('.dayInfo').children('.dayNumber').text(thisDayOfMonth);
  }
  for (let i = dayNumber; i <= 7; i++) {
    let thisDayOfMonth = todayOfMonth + (i - dayNumber);
    $('.calendar .current.week').children().eq(i).attr('data-dayOfWeek', daysOfWeek[i - 1]);
    $('.calendar .current.week').children().eq(i).attr('data-monthOfYear', monthOfYear);
    $('.calendar .current.week').children().eq(i).attr('data-dayOfMonth', thisDayOfMonth);
    $('.calendar .current.week').children().eq(i).children('.dayInfo').children('.dayName').text(daysOfWeek[i - 1].slice(0, 3));
    $('.calendar .current.week').children().eq(i).children('.dayInfo').children('.dayNumber').text(thisDayOfMonth);
  }
  for (let i = 7; i < 14; i++) {
    $('.calendar .current.week').children().eq(i - 6).attr('data-dayOfWeek', daysOfWeek[i - 7]);
    $('.calendar .next.week').children().eq(i - 6).children('.dayInfo').children('.dayName').text(daysOfWeek[i - 7].slice(0, 3));
    $('.calendar .next.week').children().eq(i - 6).children('.dayInfo').children('.dayNumber').text(todayOfMonth - dayNumber + i + 1);
  }
}

function allowDrop(ev) {
  ev.preventDefault();
}
function drag(ev) {
  ev.dataTransfer.setData('text', ev.target.id);
}
function drop(ev) {
  if (!$(ev.srcElement).hasClass('day')) return;
  ev.preventDefault();
  var data = ev.dataTransfer.getData('text');
  let eventType = (data === 'preferredTemplate') ? 'preferred event-template live' : 'busy event-template live';
  let monthOfYear = $(ev.target).attr('data-monthOfYear');
  let dayOfMonth = $(ev.target).attr('data-dayOfMonth');
  let dayName = $(ev.target).attr('data-dayOfWeek');
  let eventRef = firebase.database()
                         .ref('groups')
                         .child(userData.groupName)
                         .child('calendar')
                         .child(monthOfYear)
                         .child(dayOfMonth)
                         .push({
                           'creator' : userId,
                           'eventType' : eventType.replace('event-template', '').replace('live', '').trim(),
                           'month' : monthOfYear,
                           'day' : dayOfMonth,
                           'dayName' : dayName,
                           'creator' : firebase.auth().currentUser.email.split('@')[0]
                         });
  let eventId = eventRef.key;
  let copyButton = $('<div>');
  copyButton.addClass(eventType);
  copyButton.attr('data-firebase-key', eventId);
  copyButton.attr('data-monthOfYear', monthOfYear);
  copyButton.attr('data-dayOfMonth', dayOfMonth);
}

let selectedEventKey, selectedEventMonth, selectedEventDay;

$(document).on('click', '.live.event-template', function() {
  selectedEventKey = $(this).attr('data-firebase-key');
  selectedEventMonth = $(this).attr('data-monthOfYear');
  selectedEventDay = $(this).attr('data-dayOfMonth');
  let templateType = $(this).attr('class');
  showEventCard(selectedEventKey);
});

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.fixed-action-btn');
  var instances = M.FloatingActionButton.init(elems, {
    direction: 'left'
  });
});

document.addEventListener("DOMContentLoaded", function() {
  function initialize() {
    var input = document.getElementById('meeting-location');
    var autocomplete = new google.maps.places.Autocomplete(input);
    google.maps.event.addListener(autocomplete, "place_changed", function() {
      var place = autocomplete.getPlace();
      lat = place.geometry.location.lat();
      long = place.geometry.location.lng();
      let eventId = $('.sidebar .card').attr('data-firebase-key');
      let eventData = calendarEvents[eventId];
      firebase.database().ref('groups')
                         .child(userData.groupName)
                         .child('calendar')
                         .child(eventData.month)
                         .child(eventData.day)
                         .child(eventId)
                         .child('location')
                         .set({
                           'lat' : lat,
                           'lng' : long
                         });
      let mapUrl = 'https://maps.googleapis.com/maps/api/staticmap?center=' + lat + ',' + long + '&zoom=16&size=400x400&format=png32&maptype=roadmap&markers=size:mid%7Ccolor:yellow%7C' + lat + ',' + long + '&key=AIzaSyCmhlYrcIaalp0JkPrA2_XqDOX-wL9WXdk';
      $('.sidebar .card-image').css('background-image', 'url(' + mapUrl + ')');
      hideMeetingLocationInput();
    });
  }
  google.maps.event.addDomListener(window, "load", initialize);
});

function showMeetingLocationInput() {
  $('.card-image').addClass('editing-location');
  $('.card-image .input-field').show();
  $('.card-image input').focus();
}

function hideMeetingLocationInput() {
  $('.card-image').removeClass('editing-location');
  $('.card-image .input-field').hide();
}

function showEventCard(firebaseKey) {
  hideMeetingLocationInput();
  let card = $('.sidebar .card');
  card.attr('data-firebase-key', firebaseKey);
  card.show();
  let event = calendarEvents[firebaseKey];
  let eventTitle = (event.eventType === 'preferred') ? 'Study session' : 'Not available';
  let eventDescription;
  let rawWeather = weatherDays[calendarEvents[firebaseKey].day];
  let eventWeather;
  if (weatherDays[calendarEvents[firebaseKey].day]) {
    if (rawWeather.includes('rain')) { eventWeather = '💧 rain.'; }
    else if (rawWeather.includes('cloud')) { eventWeather = '☁️ clouds.'; }
    else { eventWeather = '☀️ sun.'; }
  }
  $('.sidebar .card .card-title').text(eventTitle);
  if (event.eventType === 'preferred') {
    eventDescription = 'A group member has suggested a study session on ' + event.dayName;
  } else {
    eventDescription = 'At least one member of your group is busy on ' + event.dayName;
  }
  if (eventWeather) eventDescription += '.  You should expect ' + eventWeather;
  if (event.upvotes) {
    eventDescription += '. '
    Object.keys(event.upvotes).forEach(keyName => {
      eventDescription += keyName + ', ';
    });
    eventDescription += ' have given this a thumbs-up.';
  }
  $('.sidebar .card .card-content p').text(eventDescription);
  if (event.location) {
    let lat = event.location.lat;
    let long = event.location.lng;
    let mapUrl = 'https://maps.googleapis.com/maps/api/staticmap?center=' + lat + ',' + long + '&zoom=14&size=400x400&format=png32&maptype=roadmap&markers=size:mid%7Ccolor:yellow%7C' + lat + ',' + long + '&key=AIzaSyCmhlYrcIaalp0JkPrA2_XqDOX-wL9WXdk';
    $('.sidebar .card-image').css('background-image', 'url(' + mapUrl + ')');
  } else {
    $('.sidebar .card-image').css('background-image', 'url("./assets/images/map-placeholder.jpg")');
  }
}

function hideEventCard() {
  $('.sidebar .card').hide();
}

var APIKey = "&appid=8c24bcb54a1a145708ca7717f2851eb4";

var weatherLat = 47;
var weatherLong = 122;
var weatherDays = {};

var weatherQueryURL =
  "https://api.openweathermap.org/data/2.5/forecast/daily?lat=" +
  weatherLat +
  "&lon=" +
  weatherLong +
  "&cnt=14" +
  APIKey +
  "&units=imperial";

$.ajax({
  url: weatherQueryURL,
  method: "GET"
}).then(function(results) {
  processWeather(results.list);
});

function processWeather(daysData) {
  for (var i = 0; i < daysData.length; i++) {
    let unix = daysData[i].dt * 1000;
    let dateObject = new Date(unix);
    let dayOfMonth = dateObject.getDate();
    weatherDays[dayOfMonth] = daysData[i].weather[0].description;
  }
}
