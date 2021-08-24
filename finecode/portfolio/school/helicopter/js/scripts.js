/*
  Assignment: Rocket Countdown
  Author: Matthew Baugh
  Date: 8/21/2020
  Purpose: Allow user to press a button and display a countdown.

  ***SIDE NOTE*** I could have used a simple for-loop to just display the
    number, but a for-loop counts all numbers too quickly and doesn't
    allow for the setTimeout to work.

    If done simply I could have used the code at the bottom of this script file
*/

/*
  countdown is called from the button and sends a starting countdown number to
  the display function. Basically created to avoid a gloabal variable ;)
*/
function countdown() {
  var countTop = 5; // starting countdown number "T-minus"
  countdownDisplay(countTop);
}


/*
  countdownDisplay takes an initial number and display that number down to 0 
  with a second between numbers then display Blast Off!, releasing the rocket.
*/
function countdownDisplay(counter) {
  document.getElementById("inputField").style = "display:none;";
  setTimeout(function () { // start countdown function
    var showCount = document.getElementById("cdDisplay"); // element to hold text
    showCount.innerHTML = counter; // number to display
    counter--; // decriment countdown
    if (counter >= 0) {
      countdownDisplay(counter); // calls this whole function again with new count
    } else {
      showCount.innerHTML = "FLY! "; // text display
      moveRocket(); // call function
    }
  }, 1000) // one second delay
};

/*
  moveRocket animates the rocket at the bottom of the screen out the top
*/
function moveRocket() {
  var rocket = document.getElementById("rocket"); // rocket element
  var pos = 1; // starting point flush to bottom of screen
  var id = setInterval(frame, 10); // animation rate
  function frame() {
    if (pos > 1800) { // ending above screen viewport
      clearInterval(id);
      document.getElementById("again").style = "display:block;";
    } else {
      pos *= 1.01; // increasing screen position slow to fast
      rocket.style.right = pos + 'px'; // shows rocket higher on screen
      rocket.style.bottom = pos +'px';
    }
  }
}

/*
  refresh will reset the page to it's initial load state
*/
function refresh() {
  document.getElementById("again").style = "display:none;";
  document.getElementById("inputField").style = "display:block;";
  document.getElementById("cdDisplay").innerHTML = "";
  document.getElementById("rocket").style.right = '0px';
  document.getElementById("rocket").style.bottom = '0px';
}

/*
  This countdown function uses a for-loop to display the numbers 10-0 and
  then Blast Off! And then sets the rocket loose.

function countdown() {
  var counting = 10;
  var cdDisplay = document.getElementById("cdDisplay");
  cdDisplay.innerHTML = counting;
  for (var i = 10; i > 0; i--) {
    counting = counting + ", " + (i - 1);
    cdDisplay.innerHTML = counting;
  }
  counting = counting + ", Blast Off!";
  cdDisplay.innerHTML = counting;
  moveRocket();
}
*/
