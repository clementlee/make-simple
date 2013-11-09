var textdatabase;

var xhr = new XMLHttpRequest();
xhr.open('GET', chrome.extension.getURL('mthesaur.txt'), true);
xhr.onreadystatechange = function()
{
    if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200)
    {
        textdatabase = xhr.responseText.split("\n");
    }
};
xhr.send();

function getSynonyms(word) {
	for(var i = 0; i < textdatabase.length; i++)
		if(textdatabase[i].indexOf(word) != -1)
			return textdatabase[i].split(",");
}

/* add to manifest.json
  "background": {
   "scripts": ["thesaurus.js"]
  },
  */