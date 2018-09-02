//to get the words
const wordMeaning = {};
const scores = [];
let haveMeaningsLoaded = false;
const getWords = (wordsArray) => {
	const promise = new Promise((resolve, reject) => {
		const key = "f56da904961d843d0300007813f06a10f056eadd8f42c78c8";
		const wordURL = "https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&excludePartOfSpeech=proper-noun%2C%20proper-noun-plural%2C%20noun-plural%2C%20family-name%2C%20noun&minCorpusCount=1000&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit=10&api_key=" +
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
		document.getElementById('share').style.display = "none";
		document.getElementById('playAgain').style.display = "none";
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
	document.getElementById('share').style.display = "none";
	document.getElementById('playAgain').style.display = "none";
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
let rightlyAnsweredArray = [];
const calcScores = (option, answers) => {

	if (answers.includes(option.textContent)) {
		console.log('options =====>', option.textContent);
		console.log("Index of Options", answers.indexOf(option.textContent));
		rightlyAnsweredArray.push(answers.indexOf(option.textContent));
		score++;
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
		const data = JSON.parse(localStorage.getItem("firebaseui::rememberedAccounts"));
		const name = data[0].displayName;
		let greetings = {
			0: ["Oops. How about playing it again?", "Practice is the word", "You know you are better than this", "It happens"],
			1: ["You need to work hard!", "A liitle practice and you are good to go", "Improve your memory by doing unforgettable things.", "Everything always ends well. If not – it's probably not the end."],
			2: [" that can be improved", "If you're going through Hell, keep going.", "The road to success is always under construction.", "Anyone who has never made a mistake has never tried anything new."],
			3: ["Its Good", "The possibilities are endless, but I just want the good ones.", "Keep Learning, Keep moving", "Maintain your learining spirit" ],
			4: ["Its Great", "There is no dance without the dancers", "Almost close to perfection", "You are certainly good at this :)" ],
			5: ["This can't get any better", "Perfect", "Brilliant", "Bestest :)"]
		}

		document.getElementById('score').innerHTML = "Hey " + name + "!" + "<br>" + " you scored " + "<b>" + score * 50 + "/250" + "</b>" + "<br>"  + "<p>" + greetings[score][Math.floor(Math.random()*3+1)] + "</p>";

		document.getElementById("myItem1").style.display = "block";
		var bar1 = new ldBar("#myItem1");
		var bar2 = document.getElementById('myItem1').ldBar;
		let set = score / 5 * 100;
		bar1.set(set);
		document.getElementById('revisit').innerHTML = "Revisit Words";
		let loopCount = 0;
		const WronglyAnsweredWords = [];
		for (var key in wordMeaning) {
			if (wordMeaning.hasOwnProperty(key)) {
				loopCount++;
				if (loopCount < 6) {
					if (rightlyAnsweredArray.includes(loopCount - 1)) {
						document.getElementById('words').innerHTML += "<p style = 'color:#008638; background-color:#e5f9e4; padding:1em'>" + "<b >" + key + "</b>" + " : " + wordMeaning[key] + "</p>" + "<br>";

					} else {
						WronglyAnsweredWords.push ({
							word: key,
							meaning: wordMeaning[key]
						})
						document.getElementById('words').innerHTML += "<p style = 'color:#b8000f; background-color:#f0b7bc; padding: 1em'>" + "<b >" + key + "</b>" + " : " + wordMeaning[key] + "</p>" + "<br>";
					}

				}
			}
		}

		firebase.auth().onAuthStateChanged(function (user) {
			console.log("user =======>", user);
		
			if (user) {
				// User is signed in
				//writeUserData(user.uid, score);
				let uid = user.uid; 
				var hashKey = firebase.database().ref().child('users').push().key;
				let updates = {};
				updates['/' +user.uid +'/score/' + hashKey] = score;
				WronglyAnsweredWords.forEach(word => {
					var hashKey = firebase.database().ref().child('users').push().key;
					updates['/' +user.uid +'/word/' + hashKey] = {
							word: word.word,
							def: word.meaning
					}
				});
				return firebase.database().ref().update(updates);
				/* console.log(user); */
				
			} else {
				uid = null;
				window.location.replace("index.html");
			}
		});
		document.getElementById('share').style.display = "inline";
		document.getElementById('playAgain').style.display = "inline";
		const playAgain = document.getElementById('playAgain');
		const share = document.getElementById('share');
		playAgain.addEventListener('click', () => {
			window.location.replace('quiz.html');
		})
		share.addEventListener('click', () => {
			document.getElementById('whatsAppLink').href = "https://wa.me/?text=I %20have%20scored%20" + score * 50 + "%20out%20of%20250%20on%20https://squiz.netlify.com"
		})
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
//check if this is working or not
firebase.auth().onAuthStateChanged(function (user) {
	var uid = null;
	if (user) {
		// User is signed in.
		console.log("user ==========>", user);
		uid = user.uid;
	} else {
		uid = null;
		window.location.replace("login.html");
	}
});
console.log("after the ONAUthState Change");
