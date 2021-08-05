// Validation on user input
function isValid() {
	// Get Values from Page
	let startValue = parseInt(document.getElementById('startValue').value);
	let endValue = parseInt(document.getElementById('endValue').value);

	// Call Empty Table
	emptyTable();

	// Validates input (makes sure numbers are within rage, start:1-20 | end 21-1,000,000)
	if (startValue < 1 || startValue > 20 || endValue < 21 || endValue > 1000000) {
		alert('Please enter a correct Start Value (1-20) or End Value (21-1,000,000)');
	} else {
		calcValues(startValue, endValue);
	}
}

// Empty the Table of values on the page
function emptyTable() {
	let table = document.getElementById('results');
	while (table.firstChild) {
		table.removeChild(table.firstChild);
	}
}

// Calculate Values
function calcValues(startValue, endValue) {
	// Generate squence numbers
	let fibNum01 = startValue;
	let fibNum02 = startValue;

	// Loop Through numbers till endValue
	while (fibNum01 <= endValue) {
		// Call printValue
		printValue(fibNum01);

		// Advance numbers in sequence
		fibRes = fibNum01 + fibNum02;
		fibNum01 = fibNum02;
		fibNum02 = fibRes;
	}
}

// Output Values to Page
function printValue(resultNum) {
	let tr = document.createElement('tr');
	let td = document.createElement('td');
	let b = document.createElement('b');

	// Calls isPrime to give different output if it is a prime number
	if (isPrime(resultNum)) {
		document.getElementById('results').appendChild(tr).appendChild(td).appendChild(b).innerHTML = resultNum + ' is Prime!';
	} else {
		document.getElementById('results').appendChild(tr).appendChild(td).innerHTML = resultNum;
	}
}

// Checks if number is Prime
function isPrime(num) {
	let sum = true;
	if (num > 1) {
		for (let i = num - 1; i > 1; i--) {
			if (num % i === 0) {
				sum = false;
				break;
			}
		}
	} else {
		sum = false;
	}
	return sum;
}
