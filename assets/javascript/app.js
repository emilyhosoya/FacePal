$(document).ready(function() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDUnxL1x14WGo0ZFV2okfnh6ekHWVsL6Hs",
    authDomain: "facepal-a9ecc.firebaseapp.com",
    databaseURL: "https://facepal-a9ecc.firebaseio.com",
    projectId: "facepal-a9ecc",
    storageBucket: "",
    messagingSenderId: "603932838503"
  };
  var firstName = "";
  var lastName = "";
  var email = "";

  var dob = 0;
  var btn = "";
  var submit = "";

  firebase.initializeApp(config);
  // Initialize Materialize elements
  $("#submit").on("click", function(event) {
    event.preventDefault();
    firstName = $("#first-name")
      .val()
      .trim();
    email = $("#email")
      .val()
      .trim();
    lastName = $("#last-name")
      .val()
      .trim();
    dob = $("#dob")
      .val()
      .trim();
    img = $("#img")
      .val()
      .trim();
    submit = $("#submit")
      .val()
      .trim();
    ref.push({
      firstName: firstName,
      lastName: lastName,
      email: email,
      dob: dob,
      img: img
    });
  });
  ref.on(
    "child_added",
    function(snapshot) {
      // Log everything that's coming out of snapshot
      console.log(snapshot.val());
      console.log(snapshot.val().firstName);
      console.log(snapshot.val().lastName);
      console.log(snapshot.val().dob);
      console.log(snapshot.val().img);
      // Change the HTML to reflect
      $("#first-name").text(snapshot.val().firstName);
      $("#last-name").text(snapshot.val().lastName);
      $("#email").text(snapshot.val().email);
      $("#dob").text(snapshot.val().dob);
      $("#img").text(snapshot.val().img);
    },
    function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    }
  );

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
