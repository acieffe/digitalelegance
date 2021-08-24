/*
  Assignment: Attraction Efficiency Tracker
  Author: Matthew Baugh
  Date: 8/13/2020
  Purpose: To provide the functionality for the attraction profile page to
    validate the data, save the information to local storage, and show the
    information that is currently saved.
  Credit: This is based on the Thyroid App in Chapter 5, 6, & 7
*/

/*
  checkUserForm and it will ensure that each required input element of the form
  has a valid value.
*/
function checkAttrForm() {
  if ($("#txtAttrName").val() == "") {
    alert("You need to enter the attraction name.");
    return false;
  } else if ($("#txtParkLoc").val() == "") {
    alert("You need to enter attractionsion's park location.");
    return false;
  } else if ($("#txtAreaLoc").val() == "") {
    alert("You need to enter the attraction's area location");
    return false;
  } else if ($("#numAttrCode").val() == "") {
    alert("You need to enter the attraction's ID Code");
    return false;
  } else if ($("#numAttrCode").val() > 999999) {
    alert("Please check the attraction ID Code and try again.");
    return false;
  } else if ($("#numAttrCode").val() < 10101) {
    alert("Please check the attraction ID Code and try again.");
    return false;
  } else if ($("#numDurMin").val() == "") {
    alert("You need to enter the attraction's duration minutes value");
    return false;
  } else if ($("#numDurSec").val() == "") {
    alert("You need to enter the attraction's duration seconds value");
    return false;
  } else if ($("#numVehicles").val() == "") {
    alert("You need to enter the number of attraction vehicles");
    return false;
  } else if ($("#numCapacity").val() == "") {
    alert("You need to enter the attraction's vehicle capacity");
    return false;
  } else if ($("#numIntMin").val() == "") {
    alert("You need to enter the attraction's Dispatch Interval minutes value");
    return false;
  } else if ($("#numIntSec").val() == "") {
    alert("You need to enter the attraction's Dispatch Interval seconds value");
    return false;
  } else {
    return true;
  }
}

/*
  Add a submit handler for the frmAttrForm element that will call saveAttrForm
  and return false to prevent default behavior of submitting the form
*/
$("#frmAttrForm").submit( function() {
  saveAttrForm();
  return false;
})

/*
  saveAttrForm will check that the required inputs are all valid. If they are,
  then it will attempt to save the information in the form to localStorage
  saved with the attraction ID code
*/
function saveAttrForm() {
  if (checkAttrForm()) {
    var attr = {
      "AttrName" : $("#txtAttrName").val(),
      "ParkLoc" : $("#txtParkLoc").val(),
      "AreaLoc" : $("#txtAreaLoc").val(),
      "AttrCode" : $("#numAttrCode").val(),
      "DurMin" : $("#numDurMin").val(),
      "DurSec" : $("#numDurSec").val(),
      "Vehicles" : $("#numVehicles").val(),
      "Capacity" : $("#numCapacity").val(),
      "IntMin" : $("#numIntMin").val(),
      "IntSec" : $("#numIntSec").val(),
    };

    try {
      localStorage.setItem("attr", JSON.stringify(attr));
      alert("Saving Information");

      $.mobile.changePage("#pageMenu");
      window.location.reload();
    } catch(e) {
      if (window.navigator.vendor === "Google Inc.") {
        if(e === DOMException.QUOTA_EXCEEDED_ERR) {
          alert("Error: Saving to local storage.");
        }
      } else if (e === QUOTA_EXCEEDED_ERR) {
        alert("Error: Saving to local storage.");
      }

      console.log(e);
    }
  }
}

/*
  showAttrForm this will try to get the attraction information from
  localstorage.  If it exists, then it will load the information into the
  attraction information form based on the associated values.
*/
function showAttrForm() {
  try {
    var attr = JSON.parse(localStorage.getItem("attr"));
  } catch(e) {
    if (window.navigator.vendor === "Google Inc.") {
      if(e === DOMException.QUOTA_EXCEEDED_ERR) {
        alert("Error: Saving to local storage.");
      }
    } else if (e === QUOTA_EXCEEDED_ERR) {
      alert("Error: Saving to local storage.");
    }

    console.log(e);
  }

  if (attr != null) {
    $("#txtAttrName").val(attr.AttrName);
    $("#txtParkLoc").val(attr.ParkLoc);
    $("#txtAreaLoc").val(attr.AreaLoc);
    $("#numAttrCode").val(attr.AttrCode);
    $("#numDurMin").val(attr.DurMin);
    $("#numDurSec").val(attr.DurSec);
    $("#numVehicles").val(attr.Vehicles);
    $("#numCapacity").val(attr.Capacity);
    $("#numIntMin").val(attr.IntMin);
    $("#numIntSec").val(attr.IntSec)
  }
}
