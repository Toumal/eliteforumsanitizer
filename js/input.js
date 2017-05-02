console.log("Frontier Forum Sanitizer");

function removeByMention(filterwords) {
	//Filter thread list according to word filter
    var threads = document.getElementsByClassName('threadbit');
	var threadstoremove = [];
    for (var i = 0; i < threads.length; i++) {
        var thread = threads[i];
		var threadid = thread.id;
		threadid = threadid.substring(7);
        //console.log('Checking Thread ID '+threadid);
		var threadtitle = document.getElementById('thread_title_'+threadid).text.toLowerCase();
		//console.log('Thread Title: '+threadtitle);
		for (var o = 0; o < filterwords.length; o++) {
			var filterword = filterwords[o].toLowerCase().trim();
			if (filterword != '' && threadtitle.indexOf(filterword) > -1) {
				//console.log('Match found! Removing thread '+threadid);
				threadstoremove.push(threadid);
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
        //console.log('Checking Post ID '+postid);
		var postcontent = document.getElementById('post_message_'+postid).getElementsByClassName("postcontent")[0].innerText.toLowerCase();
		for (var o = 0; o < filterwords.length; o++) {
			var filterword = filterwords[o].toLowerCase().trim();
			if (filterword != '' && postcontent.indexOf(filterword) > -1) {
				//console.log('Match found! Removing post '+postid+' because it matches: '+filterword);
				poststoremove.push(postid);
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

function removeByUser(filterusers) {
	//Filter thread list according to starting user
    var threads = document.getElementsByClassName('threadbit');
	var threadstoremove = [];
    for (var i = 0; i < threads.length; i++) {
        var thread = threads[i];
		var threadid = thread.id;
		threadid = threadid.substring(7);
        //console.log('Checking Thread ID '+threadid);
		var threadauthor = thread.getElementsByClassName("username")[0].innerText.toLowerCase();
		//console.log('Thread Author: '+threadauthor);
		for (var o = 0; o < filterusers.length; o++) {
			var filteruser = filterusers[o].toLowerCase().trim();
			if (filteruser != '' && threadauthor === filteruser) {
				//console.log('Match found! Removing thread '+threadid);
				threadstoremove.push(threadid);
				break;
			}
		}
	};
	
	for (var i = 0; i<threadstoremove.length; i++) {
		var thread = document.getElementById('thread_'+threadstoremove[i]);
		thread.parentElement.removeChild(thread);
		thread.remove();
	}
}



chrome.storage.local.get(['nogriefing', 'nooffline', 'filtercustom', 'filterwords', 'filterusers', 'filterusers_names'], function(results){
    console.log("Frontier Forum Sanitizer loaded.");
    if (results['nogriefing']){
        console.log('removing Griefing posts.');
        removeByMention(['griefing', 'griefer']);
    }

    if (results['nooffline']){
        console.log('removing Offline posts.');
        removeByMention(['offline mode', 'offline play', 'playing offline', 'promised offline']);
    }
	
    if (results['filtercustom']){
		var filterwords = results['filterwords'];
        console.log('removing custom filtered posts: ' + filterwords);
		var filterarray;
		if (filterwords.indexOf(',') > -1) {
			filterarray = filterwords.split(',');
		} else {
			filterarray = [filterwords.trim()];
		}
        removeByMention(filterarray);
    }

    if (results['filterusers']){
		var filterusers = results['filterusers_names'];
        console.log('removing threads by users: ' + filterusers);
		var filterarray;
		if (filterusers.indexOf(',') > -1) {
			filterarray = filterusers.split(',');
		} else {
			filterarray = [filterusers.trim()];
		}
        removeByUser(filterarray);
    }
	
});
