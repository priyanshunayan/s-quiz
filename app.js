// Firbase integration for signup and login functionality.
// library use for graphs and user specific stats.
const option1 = document.getElementsByClassName(".option1");
const option2 = document.getElementsByClassName(".option2");
const question = document.getElementsByClassName('.question');






//integration of wordnik api

const key = "f56da904961d843d0300007813f06a10f056eadd8f42c78c8";
var words, wordList;


// JSON Extraction using XMLHttpRequest() Technique. Move to fetch API sometime later.
//Word Extraction
const wordURL = "https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit=5&api_key="+key;
const wordRequest = new XMLHttpRequest();
wordRequest.open('GET', wordURL, true);

wordRequest.send();
wordRequest.onload = function() {
	if (wordRequest.status>=200 && wordRequest.status<400) {
    wordList = JSON.parse(this.response);
	console.log(wordList);
	words= wordList[0].word;
	console.log(words);
	const url = "https://api.wordnik.com/v4/word.json/"+words+"/definitions?limit=200&includeRelated=false&useCanonical=false&includeTags=false&api_key="+key;
	//Definition extractions
	const requestURL = url;
	const request = new XMLHttpRequest();
	request.open('GET',requestURL, true);

	request.send();
	request.onload = function() {
	if (request.status>=200 && request.status<400) {
	var data = JSON.parse(this.response);
	console.log(data);
	document.getElementById('option1').innerHTML = data[0].text;
	document.getElementById('option2').innerHTML = data[1].text;
	document.getElementById('question').innerHTML = "What is the meaning of "+ words + " ?";

} else {
	console.log("We were halfway down still there was error.")
}
}
request.onerror = function() {
	console.log("Error Ocurred!")
}
} else {
	console.log("We were halfway down still there was error.")
}
}
wordRequest.onerror = function() {
	console.log("Error Ocurred!")
}






