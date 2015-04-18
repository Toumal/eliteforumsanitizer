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



    storage.get('nosteam', function(result){
        var nosteam = result['nosteam'];
        if (nosteam === undefined){
            nosteam = false;
            storage.set({'nosteam': nosteam});
        }
        var cb = document.getElementById('nosteam');
        cb.checked = nosteam;
    });
    var hne_cb = document.getElementById('nosteam');
    hne_cb.onclick=function(){
        if (hne_cb.checked){
            storage.set({'nosteam': true});
        }else{
            storage.set({'nosteam': false});
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
	
}
