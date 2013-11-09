chrome.runtime.getBackgroundPage(function(){
	
	document.body.addEventListener('DOMNodeInserted', function(event) {
		walk(event.target);});
	walk(document.body);
})
var curSyms = [];
port.onMessage.addListener(function(msg) {curSyms = msg.synonyms});
var port = chrome.runtime.connect({name: "thesaurus"});
function walk(node) {
	var ent = document.createTreeWalker(
		node, NodeFilter.SHOW_TEXT, null, false);
	while(ent.nextNode()) {
		var current = ent.currentNode;
		current.textContent = process(current.textContent);
	}
}

function process(text){
	
	var processedText = text;
	var words = text.split(" ");
	
	for(var i = 0; i < words.length; i++) {
		var word = words[i];

		if(typeof word != 'undefined' && word.length > aggression) {
			//var synonyms = getSynonyms(word);
			port.postMessage({need: word});


			if(typeof synonyms != 'undefined') {
				processedText = processedText.replace(word, synonyms[0]);
			}
		}
	}
	return processedText;
}