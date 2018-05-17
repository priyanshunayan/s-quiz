// Firbase integration for signup and login functionality.
// library use for graphs and user specific stats.


// when we will begin??

// JSON Extraction using XMLHttpRequest() Technique. Move to fetch API sometime later.
var requestURL = "https://api.myjson.com/bins/btndq";
var request = new XMLHttpRequest();
request.open('GET',requestURL, true);
request.responseType = '';
request.send();
request.onload = function() {
if (request.status>=200 && request.status<400) {
	var data = JSON.parse(request.responseText);
	console.log(data);
	console.log(data[0].text);

} else {
	console.log("We were halfway down still there was error.")
}
}
request.onerror = function() {
	console.log("Error Ocurred!")
}