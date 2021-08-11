// Validation on user input
function isValid() {
	// Get Values from Page
	let bleepValue = parseInt(document.getElementById('bleepValue').value);
	let boopValue = parseInt(document.getElementById('boopValue').value);

	// Call Empty Table
	emptyTable();

	// Validates input (makes sure numbers are within rage, bleep:2-9 | boop 3-10)
	if (bleepValue < 2 || bleepValue > 9 || boopValue < 3 || boopValue > 10 || bleepValue === '' || boopValue === '') {
		alert('Please enter a correct Bleep Value (2-9) or Boop Value (3-10)');
	} else if (bleepValue === boopValue) {
		// or if they are the same
		alert('Please enter different Bleep and Boop Values: Bleep and Boop cannot be the same.');
	} else {
		iterateValues(bleepValue, boopValue);
	}
}

// Empty the Table of values on the page
function emptyTable() {
	let table = document.getElementById('results');
	table.innerHTML = "";
}

// Sequentially goes through numbers 1 through 100
function iterateValues(bleepValue, boopValue) {
	let start = 1;
	let end = 100;

	for (let num = start; num <= end; num++) {
		if (bleepBoop(num, bleepValue, boopValue)) { // if divisible by both
			printValues('BleepBoop');
		} else if (bleep(num, bleepValue)) { // if divisible by one
			printValues('Bleep');
		} else if (boop(num, boopValue)) { // if divisible by the other
			printValues('Boop');
		} else {
			printValues(num);
		}
	}
}

// Output Values to Page
function printValues(printValue) {
	let tr = document.createElement('tr');
	let td = document.createElement('td');

	document.getElementById('results').appendChild(tr).appendChild(td).innerHTML = printValue;
}

// This function checks if the current iteration number is divisable by the bleep and boop values
function bleepBoop(num, bleepValue, boopValue) {
	if (num % bleepValue === 0 && num % boopValue === 0) {
		return true;
	} else {
		return false;
	}
}

// This function checks if the current iteration number is divisable by the bleep value
function bleep(num, bleepValue) {
	if (num % bleepValue === 0) {
		return true;
	} else {
		return false;
	}
}

// This function checks if the current iteration number is divisable by the boop value
function boop(num, boopValue) {
	if (num % boopValue === 0) {
		return true;
	} else {
		return false;
	}
}