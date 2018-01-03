$(document).ready(function() {
  $(".datepicker").pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 100,
    max: moment().format("YYYY"),
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
  let dob = "";
  const today = moment().format("DD MMMM, YYYY");
  let age = "";
  let img = "";
  let paymentTokens = [];

  firebase.initializeApp(config);
  let ref = firebase.database().ref();
  // Initialize Materialize elements
  $("#submit").on("click", function(event) {
    event.preventDefault();
    firstName = $("#first-name")
      .val()
      .trim();
    lastName = $("#last-name")
      .val()
      .trim();
    email = $("#email")
      .val()
      .trim();
    dob = $("#dob")
      .val()
      .trim();
    img = $("#img")
      .val()
      .trim();

    enrollUser();

    ref.push({
      firstName: firstName,
      lastName: lastName,
      email: email,
      dob: dob,
      img: img
    });
    $("input").val("");
  });

  ref.on(
    "child_added",
    function(snapshot) {
      firstName = snapshot.val().firstName;
      lastName = snapshot.val().lastName;
      email = snapshot.val().email;
      dob = snapshot.val().dob;
      age = moment(today).diff(moment(dob), "years");
      img = snapshot.val().img;

      // Log everything that's coming out of snapshot
      console.log(`Name: ${firstName} ${lastName}`);
      console.log(`Email: ${email}`);
      console.log(`Born: ${dob} (${age} years old)`);
      console.log(`Img: ${img}`);

      let print = `
      <ul class="collection">
        <li class="collection-item">
          <div class="center-align">
              <ul id="files"></ul>
              <img src="./user_images/${img}" class="img-fluid" id="user-img">
          </div>
        </li>
        <li class="collection-item">Name:
          ${firstName} ${lastName}
        </li>
        <li class="collection-item">Email:
          ${email}
        </li>
      </ul>
      <tr>`;
      $("#new-user").html(print);
    },
    function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    }
  );
});
