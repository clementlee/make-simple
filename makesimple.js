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

	}
	return processedText;
}