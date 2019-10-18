const firebaseConfig = {
  apiKey: "AIzaSyDCN-ygwLXWpvA37aKz5R_SdOafbhNoydU",
  authDomain: "studybuddy-eba82.firebaseapp.com",
  databaseURL: "https://studybuddy-eba82.firebaseio.com",
  projectId: "studybuddy-eba82",
  storageBucket: "studybuddy-eba82.appspot.com",
  messagingSenderId: "373388498163",
  appId: "1:373388498163:web:edc7514114a8d0197ad386"
};

firebase.initializeApp(firebaseConfig);

$('#sign-in').click(function() {
  let email = $('#login-email').val();
  let password = $('#login-password').val();
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // TODO: display an error message of some sort
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error.message);
    });
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
  });
});

$('#sign-out').click(function() {
  firebase.auth().signOut();
})

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log('Authenticated.');
    showUserPage();
    initStudyBuddy();
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
  $('.landing').css('display', 'flex');
}

function showUserPage() {
  $('.userPage').css('display', 'flex');
  $('.landing').css('display', 'none');
}

function initStudyBuddy() {
  loadUserDetails();
  // TODO: set up firebase listeners
}

function loadUserDetails() {
  $('.header .user-info').text(firebase.auth().currentUser.email);
}
