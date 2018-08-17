<<<<<<< HEAD
(function main() {
	let wordsArray = [];
	let meaningsArray = [];

	const key = "f56da904961d843d0300007813f06a10f056eadd8f42c78c8";
	const wordURL = "https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&excludePartOfSpeech=proper-noun%2C%20proper-noun-plural%2C%20proper-noun-posessive%2C%20family-name&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit=10&api_key=" +
		key;

	fetch(wordURL)
		.then((data) => {
=======
const getWords = (wordsArray) => {
	const promise = new Promise ((resolve, reject) => {
		const key = "f56da904961d843d0300007813f06a10f056eadd8f42c78c8";
		const wordURL = "https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&excludePartOfSpeech=proper-noun%2C%20proper-noun-plural%2C%20proper-noun-posessive%2C%20family-name&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit=10&api_key="
		+key;
		
		fetch(wordURL)
		.then((data)=> {
>>>>>>> restructure-code-js
			return data.json();
		})
		.then(words => {
			words.forEach(word => {
				wordsArray.push(word.word);
			});
<<<<<<< HEAD
			console.log(wordsArray);
		}).then(() => {
			const key = "f56da904961d843d0300007813f06a10f056eadd8f42c78c8";
			if (wordsArray.length === 10) {
				let count = 0;
				wordsArray.forEach(word => {
					const meaningURL = "https://api.wordnik.com/v4/word.json/" +
						word + "/definitions?limit=200&includeRelated=true&sourceDictionaries=all&useCanonical=false&includeTags=false&api_key=" + key
					fetch(meaningURL).then(data => {
							console.log(count++);
							const meaning = data.json();
							console.log("===============>");
							meaningsArray.push(meaning);
						})
				})
			}
		})
		.then(() => {
			console.log(meaningsArray);
=======
			resolve(wordsArray);
>>>>>>> restructure-code-js
		})
		.catch(err => {
			console.log(err);
		})
<<<<<<< HEAD
	const displayQuestion = (arrayOfWords, arrayOfMeanings) => {
		if (arrayOfMeanings != 10 || arrayOfWords != 10) {
			console.log("Hi");
			const loader = document.getElementsByClassName('center-loader');
			document.getElementById('question-container').style.display = "none";
		}
		if (arrayOfMeanings === 10 && arrayOfWords === 10) {
			const loader = document.getElementsByClassName('center-loader');
			loader[0].style.display = "none";
			document.getElementById('question-container').style.display = "block";
		}

	}
	//displayQuestion(wordsArray, meaningsArray);


}());


/* const retrieveMeaning = (arrayOfWords, arrayOfMeanings) => {
	const key = "f56da904961d843d0300007813f06a10f056eadd8f42c78c8";
	if (arrayOfWords.length === 10) {
		let count = 0;
		arrayOfWords.forEach(word => {
			const meaningURL = "https://api.wordnik.com/v4/word.json/" +
				word + "/definitions?limit=200&includeRelated=true&sourceDictionaries=all&useCanonical=false&includeTags=false&api_key=" + key
=======
	})
		return promise;
}

const getMeaning = (wordsArray, meaningsArray) => {
	const promise = new Promise ((resolve, reject) => {
		const key = "f56da904961d843d0300007813f06a10f056eadd8f42c78c8";
		wordsArray.forEach(word => {
			const meaningURL = "https://api.wordnik.com/v4/word.json/"
			+ word + "/definitions?limit=200&includeRelated=true&sourceDictionaries=all&useCanonical=false&includeTags=false&api_key=" + key
>>>>>>> restructure-code-js
			fetch(meaningURL).then(data => {
					return data.json();
				}).then(meaning => {
					console.log(count++);
					arrayOfMeanings.push(meaning[0].text);
				})
				.catch(err => {
					console.log(err);
				})
		})
<<<<<<< HEAD
	}
}
}) */
const displayQuestion = (arrayOfWords, arrayOfMeanings) => {
	if (arrayOfMeanings != 10 || arrayOfWords != 10) {
		console.log("Hi");
		const loader = document.getElementsByClassName('center-loader');
		document.getElementById('question-container').style.display = "none";
	}
	if (arrayOfMeanings === 10 && arrayOfWords === 10) {
		const loader = document.getElementsByClassName('center-loader');
		loader[0].style.display = "none";
		document.getElementById('question-container').style.display = "block";
	}

}
=======
		resolve(meaningsArray);
	})


}

async function main() {
	let wordsArray = [];
	let meaningsArray = [];

	await getWords(wordsArray);

	await getMeaning(wordsArray, meaningsArray);
}

main();
>>>>>>> restructure-code-js
