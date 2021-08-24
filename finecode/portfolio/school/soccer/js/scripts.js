/*
  Assignment: Soccer Enrollment
  Author: Matthew Baugh
  Date: 8/23/2020
  Purpose: Takes in user input of age, validates it and then stores it in
    the appropriate league array and then shows the totals
*/

/*
  Global Variables
*/
var junior = [];
var intermediate = [];
var senior = [];

/*
  addChild checks form for valid age, if validated it will pass age to
  be sorted into league array
*/
function addChild () {
  if(checkForm()) {
    var age = document.getElementById("playAge").value;
    sortAge(age);
  }
}

/*
  checkForm makes sure there are entries in each input line
*/
function checkForm() {
  if (document.getElementById("playAge").value == ""){
    alert("Please enter a child's age to begin");
    return false;
  } else if(document.getElementById("playAge").value > 15 ||
    document.getElementById("playAge").value < 4) {
    alert("That child is not eligible to play, \nPlease enter a child's age between 4 and 15.");
    return false;
  } else {
    return true;
  }
}

/*
  sortAge will take the age of the child and add it to the appropriate league
  array then call to update page totals
*/
function sortAge(age) {
  if (age >= 4 && age <=7) {
    junior.push(age);
  } else if (age >= 8 && age <= 11) {
    intermediate.push(age);
  } else {
    senior.push(age);
  }
  updateTotal();
}

/*
  updateTotal will display the total of all children in the leagues and how
  many are in each league
*/
function updateTotal() {
  var results = document.getElementById("results");
  results.style = "display: block;"
  var showTotal = document.getElementById("showTotal");
  showTotal.innerHTML = junior.length + intermediate.length + senior.length;
  var jlPlay = document.getElementById("jlPlay");
  jlPlay.innerHTML = junior.length;
  var ilPlay = document.getElementById("ilPlay");
  ilPlay.innerHTML = intermediate.length;
  var slPlay = document.getElementById("slPlay");
  slPlay.innerHTML = senior.length;
}

function clearAll() {
  junior = [];
  intermediate = [];
  senior = [];
  document.getElementById("results").style = "display: none;";
  document.getElementById("playAge").value = "";
}
