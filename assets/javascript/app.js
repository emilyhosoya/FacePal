
$(document).ready(function() {
  $(".datepicker").pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year,
    today: "Today",
    clear: "Clear",
    close: "Ok",
    closeOnSelect: false // Close upon selecting a date,
  });
  $("select").material_select();
});

  
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDUnxL1x14WGo0ZFV2okfnh6ekHWVsL6Hs",
    authDomain: "facepal-a9ecc.firebaseapp.com",
    databaseURL: "https://facepal-a9ecc.firebaseio.com",
    projectId: "facepal-a9ecc",
    storageBucket: "facepal-a9ecc.appspot.com",
    messagingSenderId: "603932838503"
  };
  var firstName = "";
  var lastName = "";
  var email = "";
  
  var dob =0;
  var upload="";
  var submit="";

  firebase.initializeApp(config);
  var ref= firebase.database().ref();
  // Initialize Materialize elements
  $("#submit").on("click", function(event) {
    event.preventDefault();
    firstName = $("#firstName").val().trim();
    email = $("#email").val().trim();
    lastName = $("#lastName").val().trim();
    datepicke = $("#dob").val().trim();
    upload = $("#upload").val().trim();
    submit = $("#submit").val().trim();

    ref.push({
      firstName: firstName,
      lastName: lastName,
      email: email,
      dob: dob,
      upload : upload,
      submit : submit,
    });
  });

  ref.on("child_added", function(snapshot) {
    // Log everything that's coming out of snapshot
    console.log(snapshot.val());
    console.log(snapshot.val().firstName);
    console.log(snapshot.val().lastName);
    console.log(snapshot.val().dob);
    console.log(snapshot.val().upload);
    // Change the HTML to reflect
    // $("#firstName-display").text(snapshot.val().firstName);
    // $("#lastname-display").text(snapshot.val().lastName);
    // $("#email-display").text(snapshot.val().email);
    // $("#dob-display").text(snapshot.val().dob);
    // $("upload-display").text(snapshot.val().upload);
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });

 