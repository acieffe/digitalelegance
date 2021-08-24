/*
  Author: Matthew Baugh
  Date: 7/20/2020
  Credit: Based on the Duration App in Week 3 Reading
  Purpose: Single function that takes user defined future date and subtracts
	today's date. Also takes a user defined wedding cost and divides it by the
	remaining days till the wedding */
function calculateCountdown() { // Function called from html file
	// Retrieve and store Data
	var todaysDate = Date.parse(Date()); // Utilizing Date to get current date
	var weddingDateElement = document.getElementById("weddingDate");
	var weddingDate = Date.parse(weddingDateElement.value);
	var weddingCostElement = document.getElementById("weddingCost");
	var weddingCost = weddingCostElement.value;
  // Calculations
	var countdown = weddingDate - todaysDate;
	countdown = countdown / (1000 * 3600 * 24);
	countdown = countdown.toFixed(0);
	var savings = weddingCost / countdown;
	savings = savings.toFixed(2);
  // Output
  var countdownElement = document.getElementById("countdown");
	countdownElement.innerHTML = countdown;
	var savingsElement = document.getElementById("savings");
	savingsElement.innerHTML = savings;
}
