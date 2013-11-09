console.log("loading");

walk(document.body);
function walk(node) {
	var child;
	switch(node.nodeType) {
		case 1:
			for (child = node.firstChild; child; child = child.nextSibling) {
				if(node.nodeName != "SCRIPT" && node.nodeName != "STYLE")
					walk(child);
			}
			break;
		case 3:
			process(node);
			break;
	}
}

function process(node){
	console.log(node.nodeValue);
}