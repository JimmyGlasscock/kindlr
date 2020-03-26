//Written by Jimmy Glasscock - 3/25/2020
//This is intended for use on Tinder.com/app/recs

//adds jQuery to the page
var jq = document.createElement('script');
jq.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js";
document.getElementsByTagName('head')[0].appendChild(jq);

//figure out wait mechanism
jQuery.noConflict();

//swipe left
jQuery("[aria-label=\"Nope\"]").click();
//swipe right
jQuery("[aria-label=\"Like\"]").click();

//gets name
jQuery(".active").find(".tappable-view").find(".tappable_recCard").find(".react-swipeable-view-container").find("[data-swipeable=\"true\"]").find(".CenterAlign").find("div").attr("aria-label");

//gets bio
jQuery(".active").find(".Pos\\(a\\).D\\(f\\).Jc\\(sb\\).C\\(\\#fff\\).Ta\\(start\\).B\\(0\\).W\\(100\\%\\).Wc\\(\\$transform\\).P\\(16px\\).P\\(20px\\)--l").find(".Fl\\(start\\)").children().eq(1).children().children().children().html()

//returns true if the bio contains any phrases in the passed in textfile
function checkBioForPhrases(filepath){
	var phrases = new Array();

	//gets bio from active tinder suggestion
	var bio = jQuery(".active").find(".Pos\\(a\\).D\\(f\\).Jc\\(sb\\).C\\(\\#fff\\).Ta\\(start\\).B\\(0\\).W\\(100\\%\\).Wc\\(\\$transform\\).P\\(16px\\).P\\(20px\\)--l").find(".Fl\\(start\\)").children().eq(1).children().children().children().html();
	//loads phrases from text file
	jQuery.get(filepath, function(data){
		phrases = data.split('\n');
	});

	//if one of the phrases is found, swipe left.
	var phrasesFound = false;

	for(var i = 0; i < phrases.length; i++){
		if(bio.toLowerCase().indexOf(phrases[i]) >= 0){
			phrasesFound = true;
			break;
		}
	}

	return phrasesFound;
}

//Returns true if the name is in the passed in text file
function checkForNames(filepath){
	var namesArray = new Array();

	//gets name from active tinder suggestion
	var name = jQuery(".active").find(".tappable-view").find(".tappable_recCard").find(".react-swipeable-view-container").find("[data-swipeable=\"true\"]").find(".CenterAlign").find("div").attr("aria-label");
	//load namesArray from text file
	jQuery.get(filepath, function(data){
		namesArray = data.split('\n');
	});

	var badName = false;
	for(var i = 0; i < namesArray.length; i++){
		if(bio.toLowerCase().indexOf(namesArray[i]) >= 0){
			badName = true;
			break;
		}
	}

	return badName;
}