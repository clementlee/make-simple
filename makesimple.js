var textdatabase = [];

var xhr = new XMLHttpRequest();
xhr.open('GET', chrome.extension.getURL('mthesaur.txt'), true);
xhr.onreadystatechange = function()
{
    if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200)
    {
        var textdatabase = xhr.responseText.split("\n");
        walk(document.body);
    }
};
xhr.send();

function getSynonyms(word) {
	if(word == undefined)
		return word;
	console.log(word);
	for(var i = 0; i < textdatabase.length; i++) {
		var split = textdatabase[i].split(",");
		for(var j = 0; j < split.length; j++)
			if(split[i]===word)
				return split;
	}
	return [word];
}
//DELETE THIS ASAP******************************************

walk(document.body);

document.body.addEventListener('DOMNodeInserted', function(event) {
    walk(event.target);});
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
	/*
	var child;
	switch(node.nodeType) {
		case 1:
			for (child = node.firstChild; child; child = child.nextSibling) {
				if(node.nodeName != "SCRIPT" && node.nodeName != "STYLE" && node.nodeName != "NOSCRIPT")
					walk(child);
			}
			break;
		case 3:
			process(node);
			break;
	}*/
}

function process(text){
	var processedText = text;
	var words = text.split(" ");
	for(var i = 0; i < words.length; i++) {
		var word = words[i];
		if(word != undefined && word.length > 8)
			var synonyms = getSynonyms(word);
			//console.log(word+": ");
			//console.log(synonyms);
			if(synonyms != undefined)
				processedText = processedText.replace(word, getSynonyms(word)[3]);
	}
	return processedText;
}