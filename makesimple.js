var textdatabase = [];

var xhr = new XMLHttpRequest();
xhr.open('GET', chrome.extension.getURL('mthesaur.txt'), true);
xhr.onreadystatechange = function()
{
    if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200)
    {
        var textdatabase = xhr.responseText.split("\n");
        walk(document.body);

		document.body.addEventListener('DOMNodeInserted', function(event) {
    		walk(event.target);});
    }
};
xhr.send();
walk(document.body);
document.body.addEventListener('DOMNodeInserted', function(event) {
    		walk(event.target);});

function getSynonyms(word) {
	if(word == undefined)
		return word;
	//console.log(word);
	for(line in textdatabase ) {
		console.log('hi');
		var split = line.split(",");
		for(test in split) {
			console.log(test);
			/*if(split[i]===word) {
				return split;
			}*/
		}
	}
	return [word];
}
//DELETE THIS ASAP******************************************


function walk(node) {
	var treeWalker = document.createTreeWalker(
	    node,
	    NodeFilter.SHOW_TEXT,
	    null,
	    false
	);
	while(treeWalker.nextNode()) {
		var current = treeWalker.currentNode;
		current.textContent = process(current.textContent);
	}
}

function process(text){
	
	var processedText = text;
	var words = text.split(" ");
	
	//console.log(words);
	for(var i = 0; i < words.length; i++) {
		var word = words[i];
		if(word != undefined && word.length > 8)
			//console.log(word);
			var synonyms = getSynonyms(word);
			//console.log(word+": ");
			//console.log(synonyms);
			//if(synonyms != undefined)
			//	processedText = processedText.replace(word, getSynonyms(word)[3]);
	}
	return processedText;
}