var textdatabase = [];

var xhr = new XMLHttpRequest();
xhr.open('GET', chrome.extension.getURL('mthesaur.txt'), true);
xhr.onreadystatechange = function()
{
    if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200)
    { 
        var temptextdatabase = xhr.responseText.split("\n");
        //console.log(temptextdatabase);
        for(var i = 0; i < temptextdatabase.length; i++) {
        	var line = temptextdatabase[i];
        	textdatabase.push(line.split(","));
        }
        walk(document.body);
    }
};
xhr.send();
document.body.addEventListener('DOMNodeInserted', function(event) {
    		walk(event.target);});

function trim1 (str) {
    return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}
function getSynonyms(word) {
	if(typeof word === 'undefined')
		return [word];
	//TODO: FIX THIS BECAUSE IT ISN'T WORKING
	for(var i = 0; i < textdatabase.length; i++ ) {
		var line = textdatabase[i];
		//console.log(line);
		for(var j = 0; j < line.length; j++) {
			var test = line[j];
			if(trim1(test)===trim1(word)) {
				console.log("found: "+test+", "+word.length);
				return line;
			}
		}
	}
	return [word];
}
//DELETE THIS ASAP******************************************


function walk(node) {
	//console.log(textdatabase[0]);
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
		if(typeof word != 'undefined' && word.length > 5) {
			//console.log(word.length+": "+word);
			var synonyms = getSynonyms(word);
			//console.log(word+": ");
			//console.log(synonyms);
			if(typeof synonyms != 'undefined') {
				//console.log("replacing "+word+" with "+ synonyms[0]);
				processedText = processedText.replace(word, synonyms[0]);
			}
		}
	}
	return processedText;
}