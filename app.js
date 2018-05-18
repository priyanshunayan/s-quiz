// Firbase integration for signup and login functionality.
// library use for graphs and user specific stats.
var questions = [];
var i; var wrongDef;



//integration of wordnik api

const key = "f56da904961d843d0300007813f06a10f056eadd8f42c78c8";
var words, wordList;


// JSON Extraction using XMLHttpRequest() Technique. Move to fetch API sometime later.
//Word Extraction
const wordURL = "https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit=10&api_key="+key;
const wordRequest = new XMLHttpRequest();
wordRequest.open('GET', wordURL, true);

wordRequest.send();
wordRequest.onload = function() {
	if (wordRequest.status>=200 && wordRequest.status<400) {
    wordList = JSON.parse(this.response);
	console.log(wordList);
	wordList.forEach(function(arrayItem){
		questions.push(arrayItem.word);
	})
	console.log(questions);


	//Definition extraction right
	words = questions[0];
	const url = "https://api.wordnik.com/v4/word.json/"+words+"/definitions?limit=200&includeRelated=false&useCanonical=false&includeTags=false&api_key="+key;
	const requestURL = url;
	const request = new XMLHttpRequest();
	request.open('GET',requestURL, true);
	request.send();
	request.onload = function() {
	if (request.status>=200 && request.status<400) {
	var data = JSON.parse(this.response);
	console.log(data);
	correctDef = data[0].text;}}
	//Definiton Extraction wrong
	let wordsWrong = questions[1];
	const wordsWrongurl = "https://api.wordnik.com/v4/word.json/"+wordsWrong+"/definitions?limit=200&includeRelated=false&useCanonical=false&includeTags=false&api_key="+key;
	const wordsWrongrequestURL = wordsWrongurl;
	const wordsWrongrequest = new XMLHttpRequest();
	wordsWrongrequest.open('GET',wordsWrongrequestURL, true);
	wordsWrongrequest.send();
	wordsWrongrequest.onload = function() {
	if (wordsWrongrequest.status>=200 && wordsWrongrequest.status<400) {
	var wordsWrongdata = JSON.parse(this.response);
	console.log(wordsWrongdata);
	wrongDef = wordsWrongdata[0].text;
	console.log(wrongDef);
	// All quiz codes go here........










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
};
console.log(questions);




