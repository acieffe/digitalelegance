// Validation on user input
function isValid() {
	// Get Values from Page
	let usrInput = document.getElementById('usrInput').value;

	// Validates input (makes sure input is not empty)
	if (usrInput === '') {
		alert('Please enter a word or phrase');
	} else {
		emptyOutput();
		printOuput(usrInput, modify(usrInput), reversify(modify(usrInput)));
	}
}

// Empty the results on the page
function emptyOutput() {
	let output = document.getElementById('results');
	output.innerHTML = '***Results Go Here***';
}

// This function takes out punctuation and changes everything to lowercase
function modify(str) {
	let modStr = '';

	for (let i = 0; i < str.length; i++) {
		if (/[a-zA-Z0-9]/.test(str[i])) {
			// tests if the string is alphanumeric
			modStr += str[i].toLowerCase();
		}
	}
	return modStr;
}

// This function reverses the passed string
function reversify(str) {
	let revStr = '';

	for (let i = str.length - 1; i >= 0; i--) {
		revStr += str[i];
	}
	return revStr;
}

// This function gived the appropriate output if it is or isn't a palindrome
function printOuput(usrInput, modified, reversed) {
	if (modified === reversed) {
		document.getElementById('results').innerHTML = `<h4>${usrInput} is absolutely a Palindrome</h4><p>${modified} is the same as ${reversed}!</p>`;
	} else {
		document.getElementById(
			'results'
		).innerHTML = `<h4>${usrInput} is <span class="text-danger">not</span> a Palindrome</h4><p>${modified} and ${reversed} don't appear to be the same.</p>`;
	}
}
