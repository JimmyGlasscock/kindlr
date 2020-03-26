//Written by Jimmy Glasscock - 3/25/2020
//This is intended for use on Tinder.com/app/recs

//adds jQuery to the page so the program will work
function setup(){
	var jq = document.createElement('script');
	jq.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js";
	document.getElementsByTagName('head')[0].appendChild(jq);
}

//this must be run after the setup method.
function setupNoConflict(){
	jQuery.noConflict();
}

//wait for ms number of milliseconds
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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
			console.log("Found phrase '" + phrases[i] + "'. Swiping Left...");
			phrasesFound = true;
			break;
		}
	}

	return phrasesFound;
}

//returns true if the bio contains any phrases in the passed in textfile
function checkBioForPhrasesArray(phrases){
	//gets bio from active tinder suggestion
	var bio = jQuery(".active").find(".Pos\\(a\\).D\\(f\\).Jc\\(sb\\).C\\(\\#fff\\).Ta\\(start\\).B\\(0\\).W\\(100\\%\\).Wc\\(\\$transform\\).P\\(16px\\).P\\(20px\\)--l").find(".Fl\\(start\\)").children().eq(1).children().children().children().html();
	//if one of the phrases is found, swipe left.
	var phrasesFound = false;

	for(var i = 0; i < phrases.length; i++){
		if(bio.toLowerCase().indexOf(phrases[i]) >= 0){
			console.log("Found phrase '" + phrases[i] + "'. Swiping Left...");
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
			console.log("Found name " + namesArray[i] + ". Swiping Left...");
			badName = true;
			break;
		}
	}

	return badName;
}

//automatic right swipes if no phrases/names are found in the profile
function automaticCheckNames(phrasesFilepath, namesFilepath){
	var isRunning = true;
	while(isRunning){
		var swipeLeft = false;

		if(checkForNames(namesFilepath)){
			swipeLeft = true;
		}
		if(checkBioForPhrases(phrasesFilepath)){
			swipeLeft = true;
		}

		//decision time
		if(swipeLeft){
			jQuery("[aria-label=\"Nope\"]").click();
		}else{
			jQuery("[aria-label=\"Like\"]").click();
		}

		//wait for tinder to load the next match
		sleep(1000).then(() => {
    		
		});
	}
}

//automatic right swipes if no phrases are found in the profile
function automatic(phrasesFilepath){
	var isRunning = true;
	while(isRunning){
		var swipeLeft = false;

		if(checkBioForPhrases(phrasesFilepath)){
			swipeLeft = true;
		}

		//decision time
		if(swipeLeft){
			jQuery("[aria-label=\"Nope\"]").click();
		}else{
			jQuery("[aria-label=\"Like\"]").click();
		}

		//wait for tinder to load the next match
		sleep(1000).then(() => {
    		
		});
	}
}

//automatic right swipes if no phrases are found in the profile
function automaticPhraseArray(array){
	var isRunning = true;
	while(isRunning){
		var swipeLeft = false;

		if(checkBioForPhrasesArray(array)){
			swipeLeft = true;
		}

		//decision time
		if(swipeLeft){
			jQuery("[aria-label=\"Nope\"]").click();
		}else{
			jQuery("[aria-label=\"Like\"]").click();
		}

		//wait for tinder to load the next match
		sleep(1000).then(() => {
    		
		});
	}
}

//manual right swipes, user decides if no phrases/names are found in the profile
function manualCheckNames(phrasesFilepath, namesFilepath){
	var isRunning = true;

	//append onClick to Like/Nope buttons to re-activate this method when user decides
	jQuery("[aria-label=\"Nope\"]").click(manualCheckNames);
	jQuery("[aria-label=\"Like\"]").click(manualCheckNames);

	while(isRunning){
		var swipeLeft = false;

		if(checkForNames(namesFilepath)){
			swipeLeft = true;
		}
		if(checkBioForPhrases(phrasesFilepath)){
			swipeLeft = true;
		}

		//decision time
		if(swipeLeft){
			jQuery("[aria-label=\"Nope\"]").click();
		}else{
			isRunning = false;
			break;
		}

		sleep(1000).then(() => {
    		
		});
	}
}

//manual right swipes, user decides if no phrases are found in the profile
function manual(phrasesFilepath){
	var isRunning = true;

	//append onClick to Like/Nope buttons to re-activate this method when user decides
	jQuery("[aria-label=\"Nope\"]").click(manual);
	jQuery("[aria-label=\"Like\"]").click(manual);

	while(isRunning){
		var swipeLeft = false;

		if(checkBioForPhrases(phrasesFilepath)){
			swipeLeft = true;
		}

		//decision time
		if(swipeLeft){
			jQuery("[aria-label=\"Nope\"]").click();
		}else{
			isRunning = false;
			break;
		}

		sleep(1000).then(() => {
    		
		});
	}
}

//manual right swipes, user decides if no phrases are found in the profile
function manualPhraseArray(array){
	var isRunning = true;

	//append onClick to Like/Nope buttons to re-activate this method when user decides
	jQuery("[aria-label=\"Nope\"]").click(manual);
	jQuery("[aria-label=\"Like\"]").click(manual);

	while(isRunning){
		var swipeLeft = false;

		if(checkBioForPhrasesArray(array)){
			swipeLeft = true;
		}

		//decision time
		if(swipeLeft){
			jQuery("[aria-label=\"Nope\"]").click();
		}else{
			isRunning = false;
			break;
		}

		sleep(1000).then(() => {
    		
		});
	}
}

// -- main --

setup();
sleep(1500).then(() => {
	console.log("setup in progress...")
});
setupNoConflict();

//automatic("C:/Users/Jimmy/Documents/kindlr/Nope.txt");
//manual("Nope.txt");
//automaticCheckNames("Nope.txt", "Names.txt");
//manualCheckNames("Nope.txt", "Names.txt");

var phrases = new Array(
	"you",
	"daddy"
);
automaticPhraseArray(phrases);