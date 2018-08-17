(function main() {
	let wordsArray = [];
	let meaningsArray = [];
	
	const key = "f56da904961d843d0300007813f06a10f056eadd8f42c78c8";
	const wordURL = "https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&excludePartOfSpeech=proper-noun%2C%20proper-noun-plural%2C%20proper-noun-posessive%2C%20family-name&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit=10&api_key="
	+key;
	
	fetch(wordURL)
	.then((data)=> {
		return data.json();
	})
	.then(words => {
		words.forEach(word => {
			wordsArray.push(word.word);
		});
		console.log(wordsArray);
	}).then(()=>{
		if(wordsArray.length === 10) {
		retrieveMeaning();
		}
	}).then(() => {
		document.getElementById('question').innerHTML = "What is the meaning of " + wordsArray[0] + " ?";
	})
	.catch(err => {
		console.log(err);
	})


	const retrieveMeaning = () => {
		if(wordsArray.length === 10) {
		wordsArray.forEach(word => {
			const meaningURL = "https://api.wordnik.com/v4/word.json/"
			+ word + "/definitions?limit=200&includeRelated=true&sourceDictionaries=all&useCanonical=false&includeTags=false&api_key=" + key
			fetch(meaningURL).then(data => {
				return data.json();
			}).then(meaning=> {
				meaningsArray.push(meaning[0].text);
			})
			.catch(err => {
				console.log(err);
			})
		})
		}
	}
	
	
}());