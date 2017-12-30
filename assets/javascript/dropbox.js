function listFiles() {
  var ACCESS_TOKEN = document.getElementById("access-token").value;
  var dbx = new Dropbox({ accessToken: ACCESS_TOKEN });
  dbx
    .filesListFolder({ path: "" })
    .then(function(response) {
      displayFiles(response.entries);
      console.log(response);
    })
    .catch(function(error) {
      console.error(error);
    });
  return false;
}
function displayFiles(files) {
  var filesList = document.getElementById("files");
  var li;
  for (var i = 0; i < files.length; i++) {
    li = document.createElement("li");
    li.appendChild(document.createTextNode(files[i].name));
    filesList.appendChild(li);
  }
}
function uploadFile() {
  var ACCESS_TOKEN = document.getElementById("access-token").value;
  var dbx = new Dropbox({ accessToken: ACCESS_TOKEN });
  var fileInput = document.getElementById("file-upload");
  var file = fileInput.files[0];
  dbx
    .filesUpload({ path: "/" + file.name, contents: file })
    .then(function(response) {
      var results = document.getElementById("user-img");
      $(results).attr("src", `${response.path_display}`);
      console.log(response);
    })
    .catch(function(error) {
      console.error(error);
    });
  return false;
}
