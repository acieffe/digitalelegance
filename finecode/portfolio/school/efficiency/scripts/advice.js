/*
  Assignment: Attraction Efficiency Tracker
  Author: Matthew Baugh
  Date: 8/20/2020
  Purpose: To provide advice based on the user input of attraction hourly
    people count.
  Credit: This is based on the Thyroid App in Chapter 5, 6 & 7
/*

/*
  showAdvice will first attempt to get data from localstorage, if there isn't
  anything there, it will alert the user and go back to main.
*/
function showAdvice() {
  try {
    var tbData = JSON.parse(localStorage.getItem("tbData"));

    if (tbData == null) {
      alert("No data found");

      $(location).attr("href", "#pageMenu");
    } else {
      var attr = JSON.parse(localStorage.getItem("attr"));
      var durationInSecs = convertToSecs(attr.DurMin, attr.DurSec);
      var intervalInSecs = convertToSecs(attr.IntMin, attr.IntSec);
      var targetPeople = calcTarget(durationInSecs, intervalInSecs,
        attr.Vehicles, attr.Capacity);

      var total = tbData[tbData.length -1].Total;

      var canvas = document.getElementById("AdviceCanvas");
      var context = canvas.getContext("2d");
      context.fillStyle = "#C0C0C0";
      context.fillRect(0, 0, 550, 550);
      context.font = "22px Arial";
      drawAdviceCanvas(context, total, targetPeople);
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
  drawAdviceCanvas takes in a 2d context of a canvas, a target amount of
  people, and the recent total people seen value. It will add text to the
  context stating the most recent people seen & the target amount. It also
  expresses in what color range it falls in and then advice based on that range.
  It then creates the ranges for the gauge and passes those values to be drawn.
*/
function drawAdviceCanvas(context, total, targetPeople) {
  context.font = "22px Arial";
  context.fillStyle = "black";
  context.fillText("Most recent number of people seen: " + total, 25, 320);
  context.fillText("The target number of people is: " + targetPeople, 25, 350);

  var percentage = (total / targetPeople * 100).toFixed(2);

  adviceWrite(context, percentage);

  if (percentage > 100) {
    var gauge = new RGraph.CornerGauge("AdviceCanvas", 50,
      percentage, percentage)
    .Set("chart.colors.ranges", [[50, 74.99, "red"], [75, 89.99, "yellow"],
    [90, 100, "green"], [100, percentage, "lime"]]);
  } else if (percentage < 50) {
      var gauge = new RGraph.CornerGauge("AdviceCanvas", 0, 100,
        percentage)
      .Set("chart.colors.ranges", [[0, 49.99, "red"],
      [50, 74.99, "red"], [75, 89.99, "yellow"], [90, 100, "green"]]);
  } else {
    var gauge = new RGraph.CornerGauge("AdviceCanvas", 50, 100, percentage)
    .Set("chart.colors.ranges", [[50, 74.99, "red"], [75, 89.99, "yellow"],
    [90, 100, "green"]]);
  }
  drawMeter(gauge);
}

/*
  adviceWrite will take in a 2d context of a canvas and the percentage. It will
  write the advice to the context based on the percentage of the most recent
  total people.
*/
function adviceWrite(context, percentage) {
  var level = "";
  var adviceLine1 = "";
  var adviceLine2 = "";

  if (percentage >= 90) {
    level = "green";
    adviceLine1 = "Fantastic job!";
    adviceLine2 = "Keep up the good work";
  } else if ((percentage > 75) && (percentage < 90)) {
    level = "yellow";
    adviceLine1 = "If sustained wait and no down times,";
    adviceLine2 = "Please look to fix load times";
  } else {
    level = "red";
    adviceLine1 = "If sustained wait and no down times,";
    adviceLine2 = "Please reevaluate load times";
  }
  context.fillText("Your percentage in the " + level + " range.", 25, 380);
  context.fillText(adviceLine1, 25, 410);
  context.fillText(adviceLine2, 25, 440);
}


/*
  drawMeter will take in a corner gauge object and apply final settings for
  this gauge representing the number of people in a percentage of target
  numbers desired and draw it
*/
function drawMeter(gauge) {
  gauge.Set("chart.value.text.units.post", " %")
    .Set("chart.value.text.boxed", false)
    .Set("chart.value.text.size", 14)
    .Set("chart.value.text.font", "Verdana")
    .Set("chart.value.text.bold", true)
    .Set("chart.value.text.decimals", 2)
    .Set("chart.shadow.offsetx", 5)
    .Set("chart.shadow.offsety", 5)
    .Set("chart.scale.decimals", 0)
    .Set("chart.title", "Percent of Target")
    .Set("chart.radius", 250)
    .Set("chart.centerx", 50)
    .Set("chart.centery", 250)
    .Draw();
}
