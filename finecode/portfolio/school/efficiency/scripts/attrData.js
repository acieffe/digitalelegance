/*
Assignment: Attraction Efficiency Tracker
Author: Matthew Baugh
Date: 8/13/2020
  Purpose: To provide the functionality for loading information on the attraction
    data page, adding new attraction information, editing information, and
    deleting/clearing information.
  Credit: This is based on the Thyroid App in Chapter 5, 6, & 7
*/

/*
  loadAttrData is going to try to get attr from localStorage and load
  a summary of the information into the divAttrSection element
*/
function loadAttrData() {
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
    $("#divAttrSection").empty();

    var durationInSecs = convertToSecs(attr.DurMin, attr.DurSec);
    var intervalInSecs = convertToSecs(attr.IntMin, attr.IntSec);
    var targetPeople = calcTarget(durationInSecs, intervalInSecs,
      attr.Vehicles, attr.Capacity);

    $("#divAttrSection").append("<p>Attraction (ID code): <strong>" +
      attr.AttrName + " </strong>(<strong>" + attr.AttrCode + "</strong>)" +
      "<br>Park: <strong>" + attr.ParkLoc + "</strong><br>Area: <strong>" +
      attr.AreaLoc + "</strong>" + "<br>Duration: <strong>" + attr.DurMin +
      ":" + fullSeconds(attr.DurSec) + "</strong><br>Load Interval: " +
      "<strong>" + attr.IntMin + ":" + fullSeconds(attr.IntSec) + "</strong>" +
      "<br>Number of vehicles: <strong>" + attr.Vehicles + "</strong>" +
      "<br>Vehicle Capacity: <strong>" + attr.Capacity + "</strong>" +
      "<br>Target People per Hour: <strong>" + targetPeople + "</strong></p>");
    $("#divAttrSection").append("<a href='#pageAttrInfo' data-mini='true' " +
      "id='btnProfile' data-role='button' data-icon='edit' data-iconpos=" +
      "'left' data-inline='true'>Edit Attraction Information</a>");
    $("#btnProfile").button();
  }
}

/*
  convertToSecs takes minutes and seconds and combines them into purely seconds
*/
function convertToSecs(minutes, seconds) {
  return minutes * 60 + seconds * 1;
}

/*
  calcTarget finds the estimated number of people that should experience an
  attraction in one hour by looking at the attraction duration, the interval of
  how long it takes to load and dispatch, the vehicless on the track, and the
  vehicle capacity
*/
function calcTarget(duration, interval, vehicles, capacity) {
  var time = 60 * 60;
  var runTime = duration + interval;
  var full = capacity * vehicles;
  var target = Math.floor(time / runTime * full);
  return target;
}

/*
  fullSeconds takes a number and if less than 10 will add the preceeding zero
*/
function fullSeconds (seconds) {
  if (seconds < 10) {
    return seconds = "0" + seconds;
  } else {
    return seconds;
  }
}


/*
  Add a click handler function to the btnAddData element that will update the
  value of the btnSubmitData element to be "Add" and then refresh
*/
$("#btnAddData").click( function() {
  $("#btnSubmitData").val("Add");
  if ($("#btnSubmitData").hasClass("ui-btn-hidden")) {
    $("#btnSubmitData").button("refresh");
  }
});

/*
  Add an on pageshow handler function to the pageNewDataForm element.  If we
  are adding new data, then we will clear the form. If we are editing data,
  then it will pre-load the form with the saved data we are editing.
*/
$("#pageNewDataForm").on("pageshow", function() {
  var formOperation = $("#btnSubmitData").val();

  if (formOperation == "Add") {
    clearDataForm();
  } else if (formOperation == "Edit") {
    showDataForm($("#btnSubmitData").attr("indexToEdit"));
  }
});

/*
  clearDataForm will set the value of each input element on the
  pageNewDataForm element to be ""
*/
function clearDataForm() {
  $("#datInputDateTime").val("");
  $("#numTotalPeople").val("");
}

/*
  checkDataForm will check each attraction input element of the form on the
  Add New Data page. If an element has an invalid value, it will alert the
  user and return false. Otherwise, if they are all valid, it will return true
*/
function checkDataForm() {
  if ($("#datInputDateTime").val() == "") {
    alert("You need to enter a date and hour");
    return false;
  } else if ($("#datInputDateTime").val() > getCurrentTimeFormatted()) {
    alert("The input can't be more than one hour in the future");
    return false;
  } else if ($("#numTotalPeople").val() == "") {
    alert("You need to enter in how many people came through");
    return false;
  } else if ($("#numTotalPeople").val() < 0) {
    alert("You need to enter a positive number");
    return false;
  } else if ($("#numTotalPeople").val() > 4999) {
    alert("You need to enter number less than 5000");
    return false;
  } else {
    return true;
  }
}

/*
  getCurrentTimeFormatted will return the current date and time in the format
  "yyyy-mm-ddThh:mm"
*/
function getCurrentTimeFormatted() {
  var date = new Date();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var year = date.getFullYear();
  var hour = date.getHours() + 1;
  var minute = date.getMinutes();

  var formattedTime = year + "-" +
    (("" + month).length < 2 ? "0" : "") + month + "-" +
    (("" + day).length < 2 ? "0" : "") + day + "T" +
    (("" + hour).length < 2 ? "0" : "") + hour + ":" +
    (("" + minute).length < 2 ? "0" : "") + minute ;

  return formattedTime;
}

/*
  Add a submit form handler to the frmNewDataForm element.  If the value of
  the btnSubmitData element is "Add", then we will add data and
  change the page to pageAttrData.  If the value is "Edit", then we will save
  the updated data for that entry to tbData, change the page to
  pageAttrData, and remove the attribute for indexToEdit.
*/
$("#frmNewDataForm").submit(function() {
  var formOperation = $("#btnSubmitData").val();

  if (formOperation == "Add") {
    if (addData()) {
      $.mobile.changePage("#pageAttrData");
    }
  } else if (formOperation == "Edit") {
    if (editData($("#btnSubmitData").attr("indexToEdit"))) {
      $.mobile.changePage("#pageAttrData");
      $("#btnSubmitData").removeAttr("indexToEdit");
    }
  }

  return false;
});

/*
  addData will check if the data form is completed properly. If it is,
  then it will try to save the values of the input elements in the form
  to localStorage by adding them to the tbData key. If it successfully
  adds the data and saves it to localStorage it returns true. Otherwise,
  it will return false;
*/
function addData() {
  if (checkDataForm()) {
    var data = {
      "DateTime" : $("#datInputDateTime").val(),
      "Total" : $("#numTotalPeople").val(),
    }

    try {
      var tbData = JSON.parse(localStorage.getItem("tbData"));

      if(tbData == null) {
        tbData = [];
      }

      tbData.push(data);
      tbData.sort(compareTimes);
      localStorage.setItem("tbData", JSON.stringify(tbData));
      alert("Saving Information");
      clearDataForm();
      listData();

      return true;
    } catch(e) {
      if (window.navigator.vendor === "Google Inc.") {
        if(e === DOMException.QUOTA_EXCEEDED_ERR) {
          alert("Error: Saving to local storage.");
        }
      } else if (e === QUOTA_EXCEEDED_ERR) {
        alert("Error: Saving to local storage.");
      }

      console.log(e);

      return false;
    }
  } else {
    return false;
  }
}

/*
  listData will try to get tbData from localStorage. If it exists, then
  it will fill in a sorted table of all the data entries in tbData. It will be
  the tblData element that gets updated.
*/
function listData() {
  try {
    var tbData = JSON.parse(localStorage.getItem("tbData"));
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

  if (tbData != null) {
    tbData.sort(compareTimes);

    // initialize the table
    $("#tblData").html(
      "<thead>" +
      "  <tr>" +
      "    <th>Date & Time<br>yyyy-mm-dd</th>" +
      "    <th>Total People</th>" +
      "    <th>% of Target</th>" +
      "    <th>Edit / Delete</th>" +
      "  </tr>" +
      "</thead>" +
      "<tbody>" +
      "</tbody>"
    );

    // insert each data entry into the table
    for (var i = 0; i < tbData.length; i++) {
      var rec = tbData[i];
      $("#tblData tbody").append(
        "<tr>" +
        "  <td>" + formatTime(rec.DateTime) + "</td>" +
        "  <td>" + rec.Total + "</td>" +
        "  <td>" + findPercentage(rec.Total) + "%</td>" +
        "  <td><a data-inline='true' data-mini='true' data-role='button'" +
        "href='#pageNewDataForm' onclick='callEdit(" + i + ");' " +
        "data-icon='edit' data-iconpos='notext'></a>" +
        "    <a data-inline='true' data-mini='true' data-role='button' " +
        "href='#' onclick='callDelete(" + i + ");' data-icon='delete' " +
        "data-iconpos='notext'></a></td>" +
        "</tr>"
      );
    }

    $("#tblData [data-role='button']").button();
  } else {
    $("#tblData").html("");
  }
}

/*
  formatTime will return the given date and time in the format
  "yyyy-mm-dd hh:mm"
*/
function formatTime(time) {
  return time.replace("T", " ");
}

/*
  compareTimes will take in two dates and times values. If the first date and
  time value is greater than the second it will return 1. Otherwise,
  it returns -1.
*/
function compareTimes(date1, date2) {
  var d1 = new Date(date1.DateTime);
  var d2 = new Date(date2.DateTime);

  if (d1 > d2) {
    return 1;
  } else {
    return -1;
  }
}

/*
  findPercentage compares the data entry's total people to the attraction
  target people and returns a percentage.
*/
function findPercentage(total) {
  try {
    var attr = JSON.parse(localStorage.getItem("attr"));

    if(attr == null) {
      return "0%";
    }

    var durationInSecs = convertToSecs(attr.DurMin, attr.DurSec);
    var intervalInSecs = convertToSecs(attr.IntMin, attr.IntSec);
    var targetPeople = calcTarget(durationInSecs, intervalInSecs,
      attr.Vehicles, attr.Capacity);

    var percentage = (total / targetPeople * 100).toFixed(2);
    return percentage;

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

/*
  Add a click event handler to the btnClearData element. This will remove
  tbData from localStorage, call listData again, and alert the user
  to let them know thast all the data has been deleted.
*/
$("#btnClearData").click(function() {
  try {
    localStorage.removeItem("tbData");
    listData();
    alert("All data has been deleted.");
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
});

/*
  callDelete takes in an index representing the index of the data entry
  to remove from tbData in the localStorage. It will delete that entry
  from local storage and call listData to display the updated tbData.
*/
function callDelete(index) {
  deleteData(index);
  listData();
}

/*
  deleteData takes in an index of the data entry to remove from tbData in the
  localStorage. It will remove this entry and update the value of tbData
  in localStorage. If tbData no longer has any entries, it will be removed
  from localStorage.
*/
function deleteData(index) {
  try {
    var tbData = JSON.parse(localStorage.getItem("tbData"));

    tbData.splice(index, 1);

    if(tbData.length == 0) {
      localStorage.removeItem("tbData");
    } else {
      localStorage.setItem("tbData", JSON.stringify(tbData));
    }
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

/*
  callEdit takes in an index of a data entry in tbData to update. It will set
  the attribute indexToEdit on the btnSumbitData element to the given index.
  It will also set the value to Edit and refresh the button.
*/
function callEdit(index) {
  $("#btnSubmitData").attr("indexToEdit", index);
  $("#btnSubmitData").val("Edit");
  if ($("#btnSubmitData").hasClass("ui-btn-hidden")) {
    $("#btnSubmitData").button("refresh");
  }
}

/*
  showDataForm takes in an index of a data entry to edit. It gets the data at
  that index from tbData in localStrage and sets the values of the
  corresponding input elements in the form to those values.
*/
function showDataForm(index) {
  try {
    var tbData = JSON.parse(localStorage.getItem("tbData"));
    var rec = tbData[index];

    $("#datInputDateTime").val(rec.DateTime);
    $("#numTotalPeople").val(rec.Total);
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

/*
  editData will take in an index of a data entry to edit in tbData. It will
  try to get tbData from localStorage and update the value at the given
  index based on the values from the input elements in the frmNewDataForm,
  if all of the values are valid. If it is successful, it will return true.
  Otherwise, it returns false.
*/
function editData(index) {
  if (checkDataForm()) {
    try {
      var tbData = JSON.parse(localStorage.getItem("tbData"));
      tbData[index] = {
        "DateTime" : $("#datInputDateTime").val(),
        "Total" : $("#numTotalPeople").val(),
      }

      tbData.sort(compareTimes);
      localStorage.setItem("tbData", JSON.stringify(tbData));
      alert("Saving Information");
      clearDataForm();
      listData();

      return true;
    } catch(e) {
      if (window.navigator.vendor === "Google Inc.") {
        if(e === DOMException.QUOTA_EXCEEDED_ERR) {
          alert("Error: Saving to local storage.");
        }
      } else if (e === QUOTA_EXCEEDED_ERR) {
        alert("Error: Saving to local storage.");
      }

      console.log(e);

      return false;
    }
  } else {
    return false;
  }
}
