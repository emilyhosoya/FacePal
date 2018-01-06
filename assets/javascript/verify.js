var verifyUser = function(firstName,lastName,verify) {

var request = new XMLHttpRequest() 

request.open('POST', 'https://api.kairos.com/verify');

request.setRequestHeader('Content-Type', 'application/json');
request.setRequestHeader('app_id', '299078c0');
request.setRequestHeader('app_key', '0004235442d8fe37c6a315b2de0a40e8');

request.onreadystatechange = function () {
if (this.readyState === 4) {
    console.log('Status:', this.status);
    console.log('Headers:', this.getAllResponseHeaders());
    console.log('Body:', this.responseText);
    
    document.getElementById("writeIt").innerHTML = this.responseText;//added
}
};

var body = {
'image': verifyImage,
'gallery_name': 'FirstGallery',
'subject_id': firstName+lastName
};

request.send(JSON.stringify(body));

};