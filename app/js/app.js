//to get the words
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
					console.log("message");
					meaningsArray.push(meaning[0].text);
					if(count === 10) {
						haveMeaningsLoaded = true;
						console.log("have");
						hideLoader();
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
		x.style.display = "none";
	})
}

function hideLoader() {
	console.log("O am called");
		const loader = document.getElementsByClassName('center-loader');
		loader[0].style.display = "none";
		const x = document.getElementById('x');
		x.style.display = "block";
		console.log("yaya");
	
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