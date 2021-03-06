window.onload = function(){
    var storage = chrome.storage.local;

    storage.get('nogriefing', function(result){
        var nogriefing = result['nogriefing'];
        if (nogriefing === undefined){
            nogriefing = false;
            storage.set({'nogriefing': nogriefing});
        }
        var cb = document.getElementById('nogriefing');
        cb.checked = nogriefing;
    });
    var sne_cb = document.getElementById('nogriefing');
    sne_cb.onclick=function(){
        if (sne_cb.checked){
            storage.set({'nogriefing': true});
        }else{
            storage.set({'nogriefing': false});
        }
    }

    storage.get('nooffline', function(result){
        var nooffline = result['nooffline'];
        if (nooffline === undefined){
            nooffline = false;
            storage.set({'nooffline': nooffline});
        }
        var cb = document.getElementById('nooffline');
        cb.checked = nooffline;
    });
    var spne_cb = document.getElementById('nooffline');
    spne_cb.onclick=function(){
        if (spne_cb.checked){
            storage.set({'nooffline': true});
        }else{
            storage.set({'nooffline': false});
        }
    }

    storage.get('filtercustom', function(result){
        var filtercustom = result['filtercustom'];
        if (filtercustom === undefined){
            filtercustom = false;
            storage.set({'filtercustom': filtercustom});
            storage.set({'filterwords': 'PvP, griefer, griefing, steam'});
        }
        var cf = document.getElementById('filtercustom');
        cf.checked = filtercustom;
    });
    var filter_custom = document.getElementById('filtercustom');
    filter_custom.onclick=function(){
        if (filter_custom.checked){
            storage.set({'filtercustom': true});
        }else{
            storage.set({'filtercustom': false});
        }
    }
 	
	
	storage.get('filterwords', function(result){
        var word = result['filterwords'];
		if (word === undefined) {
			word = 'PvP, griefer, griefing, steam';
		}
        var word_box = document.getElementById('word');
        word_box.value = word;
    });


    var word_box = document.getElementById('word');
    word_box.onchange = function(){
        storage.set({'filterwords': word_box.value});
    } 

	
	storage.get('filterusers', function(result){
        var filterusers = result['filterusers'];
        if (filterusers === undefined){
            filterusers = false;
            storage.set({'filterusers': filterusers});
            storage.set({'filterusers_names': ''});
        }
        var uf = document.getElementById('filterusers');
        uf.checked = filterusers;
    });
    var filter_users = document.getElementById('filterusers');
    filter_users.onclick=function(){
        if (filter_users.checked){
            storage.set({'filterusers': true});
        }else{
            storage.set({'filterusers': false});
        }
    }

	storage.get('filterusers_names', function(result){
        var users = result['filterusers_names'];
		if (users === undefined) {
			users = '';
		}
        var users_box = document.getElementById('users');
        users_box.value = users;
    });


    var users_box = document.getElementById('users');
    users_box.onchange = function(){
        storage.set({'filterusers_names': users_box.value});
    } 

	
}
