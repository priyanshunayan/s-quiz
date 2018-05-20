// Firbase integration for signup and login functionality.
// library use for graphs and user specific stats.
var questions = [];
var score = [];
var correctAns = [];
var wrongAns = [];
var everythingArray = [];


//integration of wordnik api

const key = "f56da904961d843d0300007813f06a10f056eadd8f42c78c8";
var words, wordList;


// JSON Extraction using XMLHttpRequest() Technique. Move to fetch API sometime later.

//Word Extraction and definition extraction using Promises. 
(function apidata(){
return new Promise(function (resolve,reject){
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
}
	// store correct Definitions in correctAns array.
		for(i=0;i<5;i++){
		wordsNew = questions[i];
		let urlNew = "https://api.wordnik.com/v4/word.json/"+wordsNew+"/definitions?limit=200&includeRelated=false&useCanonical=false&includeTags=false&api_key="+key;
		let requestURLNew = urlNew;
		let requestNew = new XMLHttpRequest();
		requestNew.open('GET',requestURLNew, true);
		requestNew.send();
		requestNew.onload = function() {
		if (requestNew.status>=200 && requestNew.status<400) {
		var dataNew = JSON.parse(this.response);
		//console.log(dataNew);
		correctDefNew = dataNew[0].text;
		correctAns.push(correctDefNew);

		}
	}
}
		//Store Wrong Answers in wrongAns Array
		for(i=5;i<10;i++) {
		let wordsWrongNew = questions[i];
		let wordsWrongurlNew = "https://api.wordnik.com/v4/word.json/"+wordsWrongNew+"/definitions?limit=200&includeRelated=false&useCanonical=false&includeTags=false&api_key="+key;
		let wordsWrongrequestURLNew = wordsWrongurlNew;
		let wordsWrongrequestNew = new XMLHttpRequest();
		wordsWrongrequestNew.open('GET',wordsWrongrequestURLNew, true);
		wordsWrongrequestNew.send();
		wordsWrongrequestNew.onload = function() {
		if (wordsWrongrequestNew.status>=200 && wordsWrongrequestNew.status<400) {
		var wordsWrongdataNew = JSON.parse(this.response);
		wrongDefNew = wordsWrongdataNew[0].text;
		wrongAns.push(wrongDefNew);
		}
	}
}
everythingArray.push(questions,wrongAns,correctAns);
resolve(everythingArray);
}
}).then(function quizQuestions(){
	document.getElementById('question').innerHTML = "What does "+ everythingArray[0][0] + " mean?";
})
}());
//Begin the quiz thing here.




