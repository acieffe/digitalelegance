/*
  Assignment: Dice Game
  Author: Matthew Baugh
  Date: 8/22/2020
  Purpose: This is a game of dice wars. The user will press a button to
    roll the 4 dice (2 for the player and 2 for the computer) the winner
    gets the points added to their running total. If the winner had doubles
    the points are doubled. If there is a tie, no  points are awarded. The 
    game continues until there is a winner or the user chooses to quit the 
    game. This file creates random generated number and calculate totals.
    It also will determine the winner.
*/

/*
  roll checks if either score is over 100, if it is it clears the scores or else
  it will randomly generate dice rolls for player and computer and diplay the
  winner of the roll or of the game if the score goes over 100.
*/
function roll() {
  var topScore = 100; // High Score to Win
  // grab totals from page (starts at 00)
  var playGameTot = parseInt(document.getElementById("playScore").innerHTML);
  var compGameTot = parseInt(document.getElementById("compScore").innerHTML);

  if (playGameTot < topScore && compGameTot < topScore) { // if no one has won yet
    // Get Dice numbers
    var playDie01 = randomGen(); // New Player's Die 1 Random Roll
    var playDie02 = randomGen(); // New Player's Die 2 Random Roll
    var compDie01 = randomGen(); // New Computer's Die 1 Random Roll
    var compDie02 = randomGen(); // New Computer's Die 2 Random Roll

    // add Dice
    var playDiceTot = playDie01 + playDie02; // Player's Dice Total
    var compDiceTot = compDie01 + compDie02; // Copmuter's Dice Total

    // display dice numbers
    var die1 = document.getElementById("playDie01"); // img element for player die 1
    var die2 = document.getElementById("playDie02"); // img element for player die 2
    var die3 = document.getElementById("compDie01"); // img element for computer die 1
    var die4 = document.getElementById("compDie02"); // img element for computer die 2

    die1.src = "images/play" + playDie01 + ".png"; // replace image with corresponding number
    die2.src = "images/play" + playDie02 + ".png"; // replace image with corresponding number
    die3.src = "images/comp" + compDie01 + ".png"; // replace image with corresponding number
    die4.src = "images/comp" + compDie02 + ".png"; // replace image with corresponding number

    // display quit and show roll buttons
    document.getElementById("rollBtn").style = "display: block;";
    document.getElementById("startBtn").style = "display: none;";
    document.getElementById("quitBtn").style = "display: block;";

    // determine winner

    winner = document.getElementById("winner"); // Winner h1 tag
    winTot = winTot; // Winning Total h2 tag

    // if there is a tie
    if (playDiceTot == compDiceTot) {
      winner.innerHTML = "No Winner!";
      winTot.innerHTML = "with " + playDiceTot;
      // Shows when the Player wins
    } else if (playDiceTot > compDiceTot) {
      winner.innerHTML = "Player Wins!";
      // Double score if doubles
      if (playDie01 == playDie02) {
        playGameTot += (playDiceTot * 2);
        winTot.innerHTML = "with DOUBLES " + (playDiceTot * 2);
      } else {
        playGameTot += playDiceTot;
        winTot.innerHTML = "with " + playDiceTot;
      }
      document.getElementById("playScore").innerHTML = playGameTot;
      // Shows when the Computer wins
    } else {
      winner.innerHTML = "Computer Wins!";
      // Double score if doubles
      if (compDie01 == compDie02) {
        compGameTot += (compDiceTot * 2);
        winTot.innerHTML = "with DOUBLES " + (compDiceTot * 2);
      } else {
        compGameTot += compDiceTot;
        winTot.innerHTML = "with " + compDiceTot;
      }
      document.getElementById("compScore").innerHTML = compGameTot;
    }

    if (playGameTot >= 100 || compGameTot >= 100) {
      // hide the quit button and switch roll to start over button
      document.getElementById("rollBtn").style = "display: none;"
      document.getElementById("startBtn").style = "display: block;"
      document.getElementById("quitBtn").style = "display: none;";
      // Show who won the game with totals
      if (playGameTot >= 100) {
        winTot.innerHTML = playGameTot +
          " to " + compGameTot;
      } else {
        winTot.innerHTML = compGameTot +
          " to " + playGameTot;
      }
    }
  } else {
    // if there is a winner, this will clear everything
    clearScores(); 
  }
}

// randomGen creates a random number 1-6
function randomGen() {
  return Math.floor(Math.random() * 6 + 1);
}

// clearScores clears numbers stored and resets the game board
function clearScores() {
  var playDiceTot = 0;
  var playGameTot = 0;
  var compDiceTot = 0;
  var compGameTot = 0;

  // Display zero scores
  document.getElementById("winner").innerHTML = "";
  document.getElementById("winTot").innerHTML = "";
  document.getElementById("playScore").innerHTML = "00";
  document.getElementById("compScore").innerHTML = "00";

  // hide quit button
  document.getElementById("quitBtn").style = "display: none;";
  document.getElementById("rollBtn").style = "display: block;";
  document.getElementById("startBtn").style = "display: none;";

}
