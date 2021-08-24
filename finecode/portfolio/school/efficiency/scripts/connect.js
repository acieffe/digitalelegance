/*
Assignment: Attraction Efficiency Tracker
Author: Matthew Baugh
Date: 8/13/2020
Purpose: To take user input from the initial page to check for attraction ID on
local storage, if local storage is not available an error will show. If code is
not correct, it will send the user to create one. As well as verify if the user
has accepted the efficiency tracker disclaimer
*/

/*
  addValueToCode takes in a value representing the key pressed. If it is
  'bksp' we remove the last character of the value in the AttrCode element.
  Otherwise, we concatenate the value onto the end of the current value in the
  attrCode element.
*/
function addValueToCode(key) {
  var currVal = $("#attrCode").val();
  if (key == 'bksp') {
    $("#attrCode").val(currVal.substring(0, currVal.length - 1));
  } else {
    $("#attrCode").val(currVal.concat(key));
  }
}

/*
  getAttrCode will check if local storage is available. If it's not, it will
  alert the user. Otherwise, it will check to see if a Attraction's Code exists
  in local storage. If it does, it will return that code. Otherwise, it
  will return a default code.
*/
function getAttrCode() {
  if (typeof(Storage) == "undefined") {
    alert("Your browser does not support HTML5 localStorage. Try upgrading.");
  } else if (localStorage.getItem("attr") != null) {
    return JSON.parse(localStorage.getItem("attr")).AttrCode;
  } else {
    return "012345"; // default ID code
  }
}

/*
  Add an onclick function to the btnEnter element. It will get the value of
  the attrCode element and call getAttrCode to check if the values match. If
  they do match, then it will proceed into the app. If they don't match, it
  will alert the user to try again.
*/
$("#btnEnter").click( function() {
  var enteredAttrCode = $("#attrCode").val();
  var storedAttrCode = getAttrCode();

  if(enteredAttrCode == storedAttrCode) {
    // check if they have agreed to the efficiency tracker disclaimer
    if (localStorage.getItem("agreedToNotice") == null) {
      $("#btnEnter").attr("href", "#effNotice").button();
    } else if (localStorage.getItem("agreedToNotice") == "true") {
      // check if a user profile has been saved yet
      if (localStorage.getItem("attr") == null) {
        $("#btnEnter").attr("href", "#pageAttrInfo").button();
      } else {
        $("#btnEnter").attr("href", "#pageMenu").button();
      }
    }
  } else {
    alert("Incorrect Attraction ID Code, please try again.");
  }
});

/*
  Add an onclick function to the noticeYes element.  It will store a value of
  true for the itme agreedToNotice in localStorage
*/
$("#noticeYes").click( function() {
  try {
    localStorage.setItem("agreedToNotice", "true");
  }  catch(e) {
    if (window.navigator.vendor === "Google Inc.") {
      if(e === DOMException.QUOTA_EXCEEDED_ERR) {
        alert("Error: Saving to local storage.");
      }
    } else if (e === QUOTA_EXCEEDED_ERR) {
      alert("Error: Saving to local storage.");
    }

    console.log(e);
  }
});
