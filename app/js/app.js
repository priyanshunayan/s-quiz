//to get the words
const wordMeaning = {};
const scores = [];
let haveMeaningsLoaded = false;
const getWords = (wordsArray) => {
	const promise = new Promise((resolve, reject) => {
		const key = "f56da904961d843d0300007813f06a10f056eadd8f42c78c8";
		const wordURL = "https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&excludePartOfSpeech=proper-noun%2C%20proper-noun-plural%2C%20proper-noun-posessive%2C%20family-name&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit=10&api_key=" +
			key;

		fetch(wordURL)
			.then((data) => {
				return data.json();
			})
			.then(words => {
				words.forEach(word => {
					wordsArray.push(word.word);
				});
				resolve(wordsArray);
			})
			.catch(err => {
				console.log(err);
			})
	})
	return promise;
}
//to get the meaning of the words
const getMeaning = (wordsArray, meaningsArray) => {
	let count = 0;
	const promise = new Promise((resolve, reject) => {
		const key = "f56da904961d843d0300007813f06a10f056eadd8f42c78c8";
		for (let i = 0; i < 10; i++) {
			const meaningURL = "https://api.wordnik.com/v4/word.json/" +
				wordsArray[i] + "/definitions?limit=200&includeRelated=true&sourceDictionaries=all&useCanonical=false&includeTags=false&api_key=" + key
			fetch(meaningURL).then(
					(data) => {
						return data.json();
					})
				.then(meaning => {
					count++;
					console.log("message", wordsArray[i]);
					wordMeaning[wordsArray[i]] = meaning[0].text;
					meaningsArray.push(meaning[0].text);
					if (count === 10) {
						haveMeaningsLoaded = true;
						console.log("have");
						hideLoader();
						showQuestions(wordsArray, meaningsArray);
					}
				})
				.catch(err => {
					console.log(err);
				})
			console.log(i);
		}
		resolve(meaningsArray);
	})
	console.log("From thre Promise", meaningsArray);

}
//to display the loaders

function showLoader() {
	document.addEventListener("DOMContentLoaded", () => {
		const x = document.getElementById('x');
		const questionStatus = document.getElementById("question-status");
		x.style.display = "none";
		questionStatus.style.display = "none";
	})
}

function hideLoader() {
	console.log("O am called");
	const loader = document.getElementsByClassName('center-loader');
	const questionStatus = document.getElementById("question-status");
	loader[0].style.display = "none";
	const x = document.getElementById('x');
	x.style.display = "block";
	questionStatus.style.display = "table-cell";
	console.log("yaya");

}
let count = 0;
const showQuestions = (wordsArray, meaningsArray) => {
	console.log("Object ======>", wordMeaning);
	const questionWord = Object.keys(wordMeaning).slice(0, 5);
	const answerArray = Object.values(wordMeaning).slice(0, 5);
	const wrongAnswerArray = Object.values(wordMeaning).slice(5, 10);
	const questionField = document.getElementById('question');
	const option1 = document.getElementById("option1");
	const option2 = document.getElementById("option2");
	let score = 0;
	questionField.innerHTML = "What is the meaning of " + questionWord[0] + " ?";
	//Randomly assign the options.
	if (Math.random() > 0.5) {
		option1.innerHTML = answerArray[0];
		option2.innerHTML = wrongAnswerArray[0]
	} else {
		option2.innerHTML = answerArray[0];
		option1.innerHTML = wrongAnswerArray[0]
	}


	option1.addEventListener('click', () => {
		count++;

		if (count < 6) {
			calcScores(option1, answerArray);
			questionField.innerHTML = "What is the meaning of " + questionWord[count] + " ?";
			let num = Math.random();
			if (num > 0.5) {
				option1.innerHTML = answerArray[count];
				option2.innerHTML = wrongAnswerArray[count]
			}
			if (num < 0.5) {
				option2.innerHTML = answerArray[count];
				option1.innerHTML = wrongAnswerArray[count]
			}
			document.getElementById('count').innerHTML = count + 1;
		}
		displayResults();
	})
	option2.addEventListener('click', () => {
		count++;

		if (count < 6) {
			calcScores(option2, answerArray);
			questionField.innerHTML = "What is the meaning of " + questionWord[count] + " ?";
			let num = Math.random();
			if (num > 0.5) {
				option1.innerHTML = answerArray[count];
				option2.innerHTML = wrongAnswerArray[count]
			}
			if (num < 0.5) {
				option2.innerHTML = answerArray[count];
				option1.innerHTML = wrongAnswerArray[count]
			}
			document.getElementById('count').innerHTML = count + 1;
		}
		displayResults();
	})
}
let score = 0;

const calcScores = (option, answers) => {
	if (answers.includes(option.textContent)) {
		score++;
		console.log("score ===>", score);
	}
	console.log("Hi");
}

const displayResults = () => {
	console.log(count);
	if (count === 5) {
		const x = document.getElementById('x');
		const questionStatus = document.getElementById("question-status");
		x.style.display = "none";
		questionStatus.style.display = "none";
		document.getElementById('score').innerHTML = "Your score: " + score * 50 + "/250";
		document.getElementById('revisit').innerHTML = "Revisit Words";
		let loopCount = 0;
		for (var key in wordMeaning) {
			if (wordMeaning.hasOwnProperty(key)) {
				loopCount++;
				if (loopCount < 6) {
					document.getElementById('words').innerHTML += "<b>" + key + "</b>" + " :" + wordMeaning[key] + "<br>" + "<br>";
				}
			}
		}

	}
}

async function main() {
	let wordsArray = [];
	let meaningsArray = [];
	showLoader();
	await getWords(wordsArray);
	console.log(wordsArray);
	await getMeaning(wordsArray, meaningsArray);
	console.log(haveMeaningsLoaded);
}

main();