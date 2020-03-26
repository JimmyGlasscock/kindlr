# Kindlr ![alt text](https://github.com.com/jimmyglasscock/kindlr/master/logo.png)

Kindlr is a script that swipes for you on the tinder website, based on a user provided criteria.

## Features
- Automatic & Manual right swipes
- Auto swipe left if bio contains certain phrases
- Auto swipe left on certain names
- Automatic right swipes on everyone else
- Manual right swipes on everyone else


## Usage
To use Kindlr, log into tinder.com/app/recs.

Paste all of the functions into the javascript console, and hit enter.

Run the following method to load jQuery onto the page:
```javascript
setup();
```
Next run this one, and the rest of the program is ready to go:
```javascript
setupNoConflict();
```

Run one of the following functions to get started:
```javascript
automatic("swipeLeftPhrases.txt");
manual("swipeLeftPhrases.txt");
automaticCheckNames("swipeLeftPhrases.txt", "swipeLeftNames.txt");
manualCheckNames("swipeLeftPhrases.txt", "swipeLeftNames.txt");
```
If you don't want to pass in a file, you can pass an array to manual or automatic mode:
```javascript
var swipeLeftPhrases = new Array("shy", "smoke", "vape");
manualPhraseArray(swipeLeftPhrases);

//this also works with automatic mode
automaticPhraseArray(swipeLeftPhrases);
```