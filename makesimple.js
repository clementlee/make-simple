var textdatabase = [];
var hashtable = {};
var freqlist = {};
var aggression = 5;

var hashtableLoaded = false;
var freqlistLoaded = false;

var xhr = new XMLHttpRequest();
xhr.open('GET', chrome.extension.getURL('mthesaur.txt'), true);
xhr.onreadystatechange = function()
{
	if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200)
	{ 
		var temptextdatabase = xhr.responseText.split("\n");

        for(var i = 0; i < temptextdatabase.length; i++) {
        	var line = temptextdatabase[i].split(",");

        	textdatabase.push(line);

        	for(var j = 0; j < line.length; j++) {
        		if(line[j].length > aggression) {
        			for(var k = 0; k < line.length; k++) {
        				if(line[k].length <= aggression && line[k].length > 0) {
        					hashtable[line[j]] = line[k];
        					break;
        				}
        			}
        		}
        	}
        }
        hashtableLoaded = true;
        walk(document.body);
    }
};
xhr.send();

var xhr = new XMLHttpRequest();
xhr.open('GET', chrome.extension.getURL('word_freq.txt'), true);
xhr.onreadystatechange = function()
{
	if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200)
	{
		var tempfreqlist = xhr.responseText.split("\n");
		for(var i = 0 ; i < tempfreqlist.length; i++){
			freqlist[tempfreqlist[i]] = i;
		}
		freqlistLoaded = true;
		walk(document.body); 
	}
};
xhr.send();

function getCommoner(word) {
	if(typeof word === 'undefined')
		return word;
	word = trim(word.toLowerCase(););
	if(!hashtable.hasOwnProperty(word)) {
		var synonyms = getSynonyms(word);
		if(typeof synonyms === 'undefined')
			return synonyms;
		for(var i = 0; i < synonyms.length; i++) {
			if(hashtable.hasOwnProperty(synonyms[i])) {
				return synonyms[i];
			}
		}
	}
	else
		return word;
}

function trim (str) {
	return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

function getSynonyms(word) {
	if(typeof word === 'undefined')
		return [word];

	word = trim(word.toLowerCase());

	if(hashtable.hasOwnProperty(word))
		return [hashtable[word]];

	return [word];
}

function walk(node) {
	if(freqlistLoaded && hashtableLoaded) {
		var ent = document.createTreeWalker(
			node, NodeFilter.SHOW_TEXT, null, false);

		while(ent.nextNode()) {
			var current = ent.currentNode;
			current.textContent = process(current.textContent);
		}
		document.body.addEventListener('DOMNodeInserted', function(event) {
			walk(event.target);});
	}
}

function process(text){
	
	var processedText = text;
	var words = text.split(" ");
	
	for(var i = 0; i < words.length; i++) {
		var word = words[i];

	// 	if(typeof word != 'undefined' && word.length > aggression) {

	// 		var synonyms = getSynonyms(word);

	// 		if(typeof synonyms != 'undefined') {
	// 			for(var j = 0; j < synonyms.length; j++){
	// 				if(synonyms[j].length <= aggression) {
	// 					processedText = processedText.replace(word, synonyms[j]);
	// 					break;
	// 				}
	// 			}
	// 		}
	// 	}

		processedText.replace(word, getCommoner(word));
	}
	return processedText;
}