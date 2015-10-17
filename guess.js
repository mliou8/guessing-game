//Global Variables
var correctAnswer = null;
var resultsArray = [];
var currentGuess = 0;
var numberGuesses = 0;
var tempStatus = "";
var guessRecord = [];


//Function to generate Global Number between 1-100 (inclusive)
function globalInit () {
    correctAnswer = Math.floor((Math.random()*100)+1);
}



// Need to create hot or cold function to return hot or cold status
function hotOrCold () {
	var temp = "";
	if (currentGuess < correctAnswer) {
		if ((correctAnswer - currentGuess) >= 20) {
			temp = "You are cold. Guess higher!";
		} else if ((correctAnswer - currentGuess) < 20) {
			temp = "You are warm. Guess higher!";
		}
	} else if (currentGuess > correctAnswer) {
		if ((currentGuess - correctAnswer) >= 20) {
			temp = "You are cold. Guess lower!";
		} else if ((currentGuess - correctAnswer) < 20) {
			temp = "You are warm. Guess lower!";
		}
	}
	return temp;
}

//Function to track getting warmer or colder

function tempUpdate() {
	var diff1 = correctAnswer - guessRecord[guessRecord.length - 2];
	var diff2 = correctAnswer - guessRecord[guessRecord.length - 1];
	//Don't need to update for first guess.
	if (guessRecord.length == 1) {
		return 0;
	}
	if (Math.abs(diff2) > Math.abs(diff1)) {
		tempStatus = "You are getting colder!"
	} else if (Math.abs(diff2) < Math.abs(diff1)) {
		tempStatus = "You are getting warmer!"
	} else {
		tempStatus = "You are not getting colder or warmer!"
	}
}

function startNewGame () {
	//document.getElementById('InputNumBox').value = '';
	numberGuesses = 5;
	guessRecord = [];
	tempStatus = "";
	globalInit();
	resultsArray = [];
}

function clearGame() {
	$('#resultsTable').text('This is the table of results.');
	$('#answerStatus').text('Welcome to the Guessing Game. You have 5 guesses remaining.');
	$('#MainTitle').text('Guess the Number');
	document.getElementById('InputNumBox').value = '';
	startNewGame();
}

//Validation Function: Returns a true or false based on whether the number is b/t 1/100
function validation () {
	  currentGuess = parseInt(document.getElementById('InputNumBox').value);
	   for (var i = 0; i < guessRecord.length; i++) {
	  	if (currentGuess == guessRecord[i]) {
	  		alert("This is a duplicate answer.");
	  		return false;
	  	}
	  }
	  if (currentGuess <= 100 && currentGuess >= 0) {
	  	return true;
	  } else {
	  	alert("This input is not valid, please enter a number b/t 1-100")
	  	return false;
	  }
}


// Need to create a bool check to return whether or not the number is correct?
function checkIfTrue () {
	//first guess will initialize game
	if (correctAnswer === null) {
		startNewGame();
	}
	if (validation(currentGuess)) {
		//Winner winner chicken dinner
		if (currentGuess == correctAnswer) {
			addResults();
			displayStatus();
			youWon();
	}
		// Not winning answer, run through all logic
		else {
			guessRecord.push(currentGuess);
			numberGuesses--;
			displayStatus();
			addResults();
		if (numberGuesses == 0) {
			//alert("Sorry, play again!");
		}

	}
}
}

//Update Cover if Won

function youWon () {
	$('#MainTitle').text("You Won!!!!");
}




//Calculate Display Status
function displayStatus() {
	var guessStatus = hotOrCold();
	var numGuesses = displayChances();
	tempUpdate();
	if (numberGuesses == 0) {
		var temp = numGuesses;
	} else if (currentGuess == correctAnswer) {
		var temp = "Winner winner chicken dinner! The answer was: " + currentGuess;
	} else {
	var temp = "Status: " + guessStatus + " " + tempStatus + "\n" + numGuesses;
	}
	$('#answerStatus').text(temp);
}

function displayAnswer() {
	if (correctAnswer == null) {
	$('#answerStatus').text("There is no answer yet!");
	} else {
	$('#answerStatus').text("Answer is: " + correctAnswer)
}
}

//Calculate Guesses remaining and message
function displayChances() {
	if (numberGuesses == 0) {
		var temp = correctAnswer;
		correctAnswer = null;
		return ("You are out of guesses. Sorry! The correct answer was: " + temp + ". Play again?");
	} else {
	return (numberGuesses + " guesses remaining.");
}
}


// Store guesses so far into Results Array to be displayed on bottom
function addResults () {
	var tempString = "";
	var finalString = "";
	if(currentGuess == correctAnswer) {
		tempString = currentGuess + ": Correct Answer!"
	} else if (numberGuesses == 0) {
		tempString = currentGuess + ": And you are out of Answers!";
	}
	else {
		tempString = currentGuess + ": " + hotOrCold();
	}

	resultsArray.push(tempString);

	for (var i = 0; i < resultsArray.length; i++) {
		if (i < resultsArray.length - 1) {
			finalString = finalString + resultsArray[i] + "\n";
		} else {
			finalString = finalString + resultsArray[i];
		}
	}

	$('#resultsTable').text(finalString);
}