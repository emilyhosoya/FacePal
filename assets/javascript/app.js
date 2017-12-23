
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
  
  // Initialize Firebase
  var firstName = "";
  var lastName = "";
  var email = "";
  
  var dob = 0;
  var upload = "";
  var submit = "";

  firebase.initializeApp(config);
  var ref= firebase.database().ref();
  // Initialize Materialize elements
  $("#submit").on("click", function(event) {
    event.preventDefault();
    firstName = $("#firstName").val().trim();
    email = $("#email").val().trim();
    lastName = $("#lastName").val().trim();
    datepicker = $("#dob").val().trim();
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
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });
}