/*
  Author: Matthew Baugh
  Date: 7/29/2020
  Credit: Based on the Duration App in Week 3 and 4 Reading
  Purpose: Java Script functions that takes data from the user and creates
	a table of randomly generated number that are weighted toward accurate
	occurances of party sizes at theme park attractions */

 /*
  This is a contant array of cumulitive percentages to give weight to party size
	It is spread out for ease of adjusting
 */
const probability = [
			0,      // 0 - 2
		0.145,    // 2 = 14.5%
		0.275,    // 3 = 13.0%
		0.455,    // 4 = 18.0%
		0.61,     // 5 = 15.5%
		0.77,     // 6 = 16.0%
		0.86,     // 7 =  9.0%
		0.94,     // 8 =  8.0%
		0.955,    // 9 =  1.5%
		0.9725,   // 10-40 = remaining 4.5%
		0.9775,
		0.9955,
		0.9956,
		0.9957,
		0.9961,   // 15
		0.9965,
		0.9966,
		0.9968,
		0.9969,
		0.9971,   // 20
		0.9972,
		0.9973,
		0.9974,
		0.9977,
		0.9978,   // 25
		0.9979,
		0.998,
		0.9981,
		0.9982,
		0.9984,   // 30
		0.9985,
		0.9988,
		0.9989,
		0.999,
		0.9991,   // 35
		0.9992,
		0.9993,
		0.9994,
		0.9995,
		1         // 40
	];

/*
  initialize adds event listeners to handle data validation on the party size
  element and the parties element when they lose focus
*/
function initialize() {
  var partySize = document.getElementById("maxPartySize");
  partySize.addEventListener("blur", validatePartySize);

  var parties = document.getElementById("maxParties");
  parties.addEventListener("blur", validateParties);
}

/*
  validateAngle provides an alert if the angle element's value is less than 1
  or greater than 90.  If it is invalid it also clears the current value.
*/
function validatePartySize() {
  var partySize = document.getElementById("maxPartySize");
  if (partySize.value != "") {
    if (partySize.value < 2 || partySize.value > 40) {
      alert ("Please Choose a Party Size Between 2 and 40.");
      partySize.value = "";
    }
  }
}

/*
  validateParties provides an alert if the parties element's value is less
  than 1 or greater than 10. If it is invalid it also clears the
  current value.
*/
function validateParties() {
  var parties = document.getElementById("maxParties");
  if (parties.value != "") {
    if (parties.value < 1 || parties.value > 10) {
      alert ("Please Choose a Number of Upcoming Parties Between 1 and 10.");
      parties.value = "";
    }
  }
}

function verifyNumbers() {
	var partySize = document.getElementById("maxPartySize").value;
  var parties = document.getElementById("maxParties").value;

  if(partySize === "") {
    alert ("You need to enter a valid value for the Party Size");
  } else if (parties === "") {
    alert ("You need to enter a valid value for the parties");
  } else {
    showParties(partySize, parties);
  }
}


/*
	This function will first verify the user submitted parameters then create
	a table of random numbers created in the getParty function
*/
function showParties(maxPartySize, maxParties) {
	clearTable();

	// Create a Table of Next Parties
	var partyTable = document.createElement("TABLE");
	partyTable.border = 1;
	document.getElementById("upcomingParties").appendChild(partyTable);

	// create headers for the table
  var thead = partyTable.createTHead();
  var row = thead.insertRow(0);
  var tableHeaders = ["Party Number", "Party Size"];
  for(var i = 0; i < tableHeaders.length; i++){
    var headerCell = document.createElement("th");
    headerCell.innerHTML = tableHeaders[i];
    row.appendChild(headerCell);
  }

	// Create a Cell for each of the user defined parties
	for (var i = 0; i < maxParties; i++) {
		var nextParty = getParty(maxPartySize); // retrieve party size
		var currentRow = partyTable.insertRow(-1);
		var firstCell = currentRow.insertCell(0);
		firstCell.innerHTML = i+1;

		var secondCell = currentRow.insertCell(1);
		secondCell.innerHTML = nextParty;
	}
}


/*
	This function searches the array for the closest number to the random numbers
	without going over and returns the index or place holder for that number
*/
function getParty(maxPartySize) {
	randomNumber = Math.random();
	/*
		Generate new random number within user defined parameters to prevent
		undefined number outside of scope
	*/
	while (randomNumber > probability[maxPartySize-1]) {
		randomNumber = Math.random();
	}

	for (var j = 0; j < maxPartySize; j++) { // runs through user defined indices
	if (probability[j] >= randomNumber) {
			return j+1; // Lowest party number is 2
		}
	}
}

// Fuction to clear the div holding the tables
function clearTable() {
	document.getElementById("upcomingParties").innerHTML = "";
}
