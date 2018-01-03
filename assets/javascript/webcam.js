var webcamModule = function() {
  var streaming = false;
  var video = null;
  (function() {
    video = document.getElementById("webcamVideo");
    navigator.mediaDevices
      .getUserMedia({ audio: false, video: true })
      .then(function(stream) {
        if (navigator.mozGetUserMedia) {
          video.mozSrcObject = stream;
        } else {
          var vendorURL = window.URL || window.webkitURL;
          video.src = vendorURL.createObjectURL(stream);
        }
        video.play();
        localStream = stream.getTracks()[0];
      })
      .catch(function(err) {
        console.log(err);
      });
    video.addEventListener(
      "canplay",
      function(ev) {
        if (!streaming) {
          video.setAttribute("width", "400");
          video.setAttribute("height", "300");
          streaming = true;
        }
        var captureInterval = 5000;
        var countdown = captureInterval / 1000;
        var counterFunction = setInterval(function() {
          $("#showCounter").html(countdown);
          if (countdown <= 0) {
            takepicture(video);
            clearInterval(counterFunction);
            localStream.stop();
          }
          countdown--;
        }, 1000);
      },
      false
    );
  })();
};
var takepicture = function(video) {
  $("#showCounter").html("Retrieving data...");
  var canvas = document.createElement("CANVAS");
  var context = canvas.getContext("2d");
  canvas.width = "400";
  canvas.height = "300";
  // draw video image onto canvas, get data
  context.drawImage(video, 0, 0);
  var imageData = canvas.toDataURL("image/png");
  $("#showCounter").html("See image data in console.");
  $(video).hide();
  console.log(imageData); ///return
};
