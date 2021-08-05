// Validation on user input
function isValid() {
	// Get Values from Page
	let usrInput = document.getElementById('usrInput').value;

	// Call Empty Table
	emptyTable();

	// Validates input (makes sure numbers are within rage, start:1-20 | end 21-1,000,000)
	if (usrInput === '') {
		alert('Please enter a word or phrase');
	} else {
		arrayify(usrInput);
	}
} 

// Empty the Table of values on the page
function emptyTable() {
	let table = document.getElementById('result');
	while (table.firstChild) {
		table.removeChild(table.firstChild);
	}
}

// Takes the user input string and makes it an array
function arrayify(usrInput) {
	let usrArray = [];

	for (let i = 0; i < usrInput.length; i++) {
		usrArray.push(usrInput[i]);
	}
	reversify(usrArray);
}

// Takes the array and pops off each letter into a reverse string
function reversify(usrArray) {
	let reverse = '';

	while (usrArray.length > 0) {
		reverse += usrArray.pop().toString();
	}
	printOutput(reverse);
}

// Output Reverse to Page
function printOutput(reverse) {
	let tr = document.createElement('tr');
	let td = document.createElement('td');

	document.getElementById('result').appendChild(tr).appendChild(td).innerHTML = reverse;
}
