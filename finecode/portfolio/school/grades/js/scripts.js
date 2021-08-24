/*
  Assignment: Letter Grade Generator
  Author: Matthew Baugh
  Date: 9/17/2020
  Purpose: Takes a grade and outputs the letter grade associated with it.
*/

/*
  gradeGenerator takes a number input from a user converts it to a 
  single decimal, then sends that to findLetter function to return 
  a letter and then outputs the grade to the page
*/
function gradeGenerator () {
  if(checkGrade()) {
    var grade = parseFloat(document.getElementById("numGrade").value);

    var head3 = document.getElementById("head3"); // h3 tag
    head3.innerHTML = "Your grade is:"; // display text to h3
    var showGrade = document.getElementById("showGrade"); // p tag
    // Display grade in p tag after finding letter grade
    showGrade.innerHTML = grade.toFixed(1) + "% = " + findLetter(grade); 
  }
}

/*
  checkGrade verifies the input is formated correctly
*/
function checkGrade() {
  num = document.getElementById("numGrade").value;
  if (num == ""){
    alert("Please enter a grade to begin");
    return false;
  } else if(num.length > 4) {
    alert("Please enter a grade with only one decimal place");
    return false;
  } else if(parseFloat(num) < 0 || parseFloat(num) > 100) {
    alert("Please enter a grade between 0-100");
    return false;
  } else {
    return true;
  }
}

/*
  findLetter takes number grade and returns the appropriate letter
*/
function findLetter(value) {
  if (value < 60) {
    return "F";
  } else if (value <= 69.5) {
    return  "D";
  } else if (value <= 79.5) {
    return  "C";
  } else if (value <= 89.5) {
    return  "B";
  } else {
    return  "A";
  }
}
