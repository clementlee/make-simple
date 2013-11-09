var aggression = 5;

var port = chrome.runtime.connect({name: "thesaurus"});
document.body.addEventListener('DOMNodeInserted', function(event) {
	walk(event.target);});

walk(document.body);

function walk(node) {
	var ent = document.createTreeWalker(
		node, NodeFilter.SHOW_TEXT, null, false);
	while(ent.nextNode()) {
		var current = ent.currentNode;
		process(current.textContent, current);
	}
}
function msgProcess(msg) {
	if(typeof msg.synonyms != 'undefined') {
		for(var i = 0; i < msg.synonyms.length; i++) {
			if(msg.synonyms[i] <= msg.aggression){
				msg.node.textContent = msg.node.textContent.replace(word, synonyms[i]);
			}
		}
	}
}
port.onMessage.addListener(msgProcess);
function process(text, node){
	
	var processedText = text;
	var words = text.split(" ");
	
	for(var i = 0; i < words.length; i++) {
		var word = words[i];

		if(typeof word != 'undefined' && word.length > aggression) {
			//var synonyms = getSynonyms(word);
			port.postMessage({need: word, current: node});

		}
	}
}