/*
  Assignment: Attraction Efficiency Tracker
  Author: Matthew Baugh
  Date: 8/21/2020
  Purpose: To provide a graphical view of data stored in local storage of
    attraction hourly counts over time.
  Credit: This is based on the Thyroid App in Chapter 5, 6 & 7
*/

/*
  showGraph will first attempt to get data from localstorage, if there isn't
  anything there, it will alert the attr and go back to main. It will then
  setup the canvas and blank arrays which will hold the total people, the date
  & time, and the target amount of people. Then it will pass those values to
  be drawn on the canvas with labels
*/

function showGraph() {
  try {
    var tbData = JSON.parse(localStorage.getItem("tbData"));

    if (tbData == null) {
      alert("No data found");

      $(location).attr("href", "#pageMenu");
    } else {
      setupCanvas();

      var totalArr = new Array();
      var dateTimeArr = new Array();
      getTotalHistory(totalArr, dateTimeArr);

      var targetLine = new Array(2);
      getTargetLine(targetLine);
      drawLines(totalArr, dateTimeArr, targetLine);
      labelAxes();
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
  setupCanvas will get the GraphCanvas element and will add a rectangle for
  the background to the context of the canvas
*/
function setupCanvas() {
  var canvas = document.getElementById("GraphCanvas");
  var context = canvas.getContext("2d");

  context.fillStyle = "#FFFFFF";
  context.fillRect(0, 0, 500, 500);
}

/*
  getTotalHistory will take in an empty array for total people values and
  an empty array for date and time values and try to fill it with the values
  from tbData in local storage.
*/
function getTotalHistory(totalArr, dateTimeArr) {
  try {
    var tbData = JSON.parse(localStorage.getItem("tbData"));

    for (var i = 0; i < tbData.length; i++) {
      var currData = tbData[i];

      var dateTime = new Date(currData.DateTime);
      var month = dateTime.getMonth() + 1;
      var day = dateTime.getDate();
      var hour = dateTime.getHours();
      dateTimeArr[i] = (month + "/" + day + " " + hour + ":00");

      totalArr[i] = parseFloat(currData.Total);
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
  getTargetLine will attempt to get the attraction data from local storage,
  if it does, it finds the target number of people from the attraction data and
  saves that in the array targetLine
*/
function getTargetLine(targetLine) {
  try {
    var attr = JSON.parse(localStorage.getItem("attr"));

    var durationInSecs = convertToSecs(attr.DurMin, attr.DurSec);
    var intervalInSecs = convertToSecs(attr.IntMin, attr.IntSec);
    var targetPeople = calcTarget(durationInSecs, intervalInSecs,
      attr.Vehicles, attr.Capacity);

    targetLine[0] = targetLine[1] = targetPeople;
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
  drawLines will take in an array representing the Total People values &
  an array representing the date and time values. It will use these values
  to draw a line graph and add it to the GraphCanvas element.
*/
function drawLines(totalArr, dateTimeArr, targetLine) {
  var totalLine = new RGraph.Line("GraphCanvas", totalArr, targetLine)
    .Set("labels", dateTimeArr)
    .Set("colors", ["blue", "green"])
    .Set("shadow", true)
    .Set("shadow.offsetx", 1)
    .Set("shadow.offsety", 1)
    .Set("linewidth", 1)
    .Set("numxticks", 6)
    .Set("scale.decimals", 0)
    .Set("xaxispos", "bottom")
    .Set("gutter.left", 50)
    .Set("gutter.top", 50)
    .Set("gutter.bottom", 75)
    .Set("tickmarks", "filledcircle")
    .Set("chart.text.angle", 45)
    .Set("ticksize", 5)
    .Set("chart.labels.ingraph", [,["Total", "blue", "yellow", 1, 25]])
    .Set("chart.title", "Total People in an Hour")
    .Draw();
}

/*
  labelAxes will get the context of the GraphCanvas element and add text
  for the x and y axis labels
*/
function labelAxes() {
  var canvas = document.getElementById("GraphCanvas");
  var context = canvas.getContext("2d");

  context.font = "11px Georgia";
  context.fillStyle = "green";
  context.fillText("Date & Time (MM/DD HH)", 360, 420);
  context.rotate(-Math.PI / 2);
  context.textAlign = "center";
  context.fillText("Total People", -250, 10);
}
