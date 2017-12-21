$(document).ready(function() {
  //   let payBtn = $(".Button-animationWrapper-child--primary");
  //   console.log(payBtn);

  // put your keys in the header
  var headers = {
    app_id: "299078c0",
    app_key: "0004235442d8fe37c6a315b2de0a40e8"
  };
  var payload = { image: "https://i.imgur.com/sId26aI.jpg" };
  var url = "http://api.kairos.com/detect";
  // make request
  $.ajax(url, {
    headers: headers,
    type: "POST",
    data: JSON.stringify(payload),
    dataType: "text"
  }).done(function(response) {
    console.log(response);
  });
});
