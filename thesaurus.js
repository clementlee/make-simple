var textdatabase = [];
var hashtable = {};
var aggression = 5;

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
        				if(line[k].length <= aggression) {
        					hashtable[line[j]] = line[k];
        					break;
        				}
        			}
        		}
        	}
        }
        //call walk remotely
        //walk(document.body);
    }
};
xhr.send();

function getSynonyms(word) {
	if(typeof word === 'undefined')
		return [word];
	word = word.toLowerCase();
	if(hashtable.hasOwnProperty(word))
		return [hashtable[word]];
	return [word];
}

/* add to manifest.json
  "background": {
   "scripts": ["thesaurus.js"]
  },
  */