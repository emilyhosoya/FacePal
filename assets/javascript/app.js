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

  var config = {
    // Kairos Keys
    app_id: "299078c0",
    app_key: "0004235442d8fe37c6a315b2de0a40e8",
    // Firebase Keys
    apiKey: "AIzaSyDUnxL1x14WGo0ZFV2okfnh6ekHWVsL6Hs",
    authDomain: "facepal-a9ecc.firebaseapp.com",
    databaseURL: "https://facepal-a9ecc.firebaseio.com",
    projectId: "facepal-a9ecc",
    storageBucket: "facepal-a9ecc.appspot.com",
    messagingSenderId: "603932838503"
  };

  let firstName = "";
  let lastName = "";
  let email = "";
  let dob = 0;
  let img = "";

  firebase.initializeApp(config);
  let ref = firebase.database().ref();
  // Initialize Materialize elements
  $("#submit").on("click", function(event) {
    event.preventDefault();
    firstName = $("#firstName")
      .val()
      .trim();
    email = $("#email")
      .val()
      .trim();
    lastName = $("#lastName")
      .val()
      .trim();
    dob = $("#dob")
      .val()
      .trim();
    img = $("#img")
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
      console.log(snapshot.val().upload);
    },
    function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    }
  );
});
