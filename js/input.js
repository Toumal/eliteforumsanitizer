console.log("Frontier Forum Sanitizer");

/*
function getPostsByCatagory(cat){
    var posts = document.getElementsByClassName('post');
    var round = [];
    for (var i = 0; i < posts.length; i++) {
        var post = posts[i];
        var tagged = false;
        var categories = post.getElementsByClassName('categories');
        for (var j = 0; j < categories.length; j++) {
            if (categories[j].innerHTML.indexOf(cat) > -1){
                tagged = true;
            }
        };
        if (tagged){
            round.push(post);
        }
    };
    return round;
}

function removeArduinoHacks(){
    var toRemove = getPostsByCatagory('Arduino Hacks');
    for (var i = 0; i < toRemove.length; i++) {
        var post = toRemove[i];
        post.parentElement.removeChild(post);
        post.remove();
    };    
}

function textNodesUnder(el){
    //http://stackoverflow.com/questions/10730309/find-all-text-nodes-in-html-page
    var n, a=[], walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false);
    while(n=walk.nextNode()) a.push(n);
    return a;
}

function replaceArduinoWithX(text){
    var nodes = textNodesUnder(document);
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        node.textContent = node.textContent.replace(/arduino/gi, text);
    };

}

function replaceArduinoImages(){
    var posts = getPostsByCatagory("Arduino Hacks");
    for (var i = 0; i < posts.length; i++) {
        var post = posts[i];
        var imgs = post.getElementsByTagName('img');
        for (var j = 0; j < imgs.length; j++) {
            var img = imgs[j];
            if (parseInt(img.width) > 10 && parseInt(img.height)>10){
                img.src = "http://lorempixel.com/g/"+img.width+"/"+img.height+"/business";
            }
        };
    };
}
*/

function removeByMention(filterwords) {
	//Filter thread list
    var threads = document.getElementsByClassName('threadbit');
	var threadstoremove = [];
    for (var i = 0; i < threads.length; i++) {
        var thread = threads[i];
		var threadid = thread.id;
		threadid = threadid.substring(7);
        console.log('Checking Thread ID '+threadid);
		var threadtitle = document.getElementById('thread_title_'+threadid).text.toLowerCase();
		console.log('Thread Title: '+threadtitle);
		for (var o = 0; o < filterwords.length; o++) {
			var filterword = filterwords[o].toLowerCase().trim();
			if (filterword != '' && threadtitle.indexOf(filterword) > -1) {
				console.log('Match found! Removing thread '+threadid);
				threadstoremove.push(threadid);
//				thread.parentElement.removeChild(thread);
//				thread.remove();
				break;
			}
		}
	};
	
	for (var i = 0; i<threadstoremove.length; i++) {
		var thread = document.getElementById('thread_'+threadstoremove[i]);
		thread.parentElement.removeChild(thread);
		thread.remove();
	}
	

	//Filter post list
    var posts = document.getElementsByClassName('postcontainer');
	var poststoremove = [];
    for (var i = 0; i < posts.length; i++) {
        var post = posts[i];
		var postid = post.id;
		postid = postid.substring(5);
        console.log('Checking Post ID '+postid);
		var postcontent = document.getElementById('post_message_'+postid).getElementsByClassName("postcontent")[0].innerText.toLowerCase();
//		console.log('Post Content: ' + postcontent);
		for (var o = 0; o < filterwords.length; o++) {
			var filterword = filterwords[o].toLowerCase().trim();
			if (filterword != '' && postcontent.indexOf(filterword) > -1) {
				console.log('Match found! Removing post '+postid+' because it matches: '+filterword);
				poststoremove.push(postid);
//				post.parentElement.removeChild(post);
//				post.remove();
				break;
			}
		}
	};

	for (var i = 0; i<poststoremove.length; i++) {
		var post = document.getElementById('post_'+poststoremove[i]);
		post.parentElement.removeChild(post);
		post.remove();
	}


}




chrome.storage.local.get(['nogriefing', 'nosteam', 'nooffline', 'filtercustom', 'filterwords'], function(results){
    console.log("Frontier Forum Sanitizer loaded.");
    if (results['nogriefing']){
        console.log('removing Griefing posts.');
        removeByMention(['griefing', 'griefer']);
    }

    if (results['nosteam']){
        console.log('removing Steam posts.');
        removeByMention(['steam key', 'steam keys', 'Elite Dangerous now on Steam', 'launch on steam', 'already on steam', 'steam is really important']);
    }

    if (results['nooffline']){
        console.log('removing Offline posts.');
        removeByMention(['offline mode', 'offline play', 'playing offline', 'promised offline']);
    }
	
    if (results['filtercustom']){
		var filterwords = results['filterwords'];
        console.log('removing custom filtered posts: ' + filterwords);
		var filterarray = filterwords.split(',');
        removeByMention(filterarray);
    }
	
});
