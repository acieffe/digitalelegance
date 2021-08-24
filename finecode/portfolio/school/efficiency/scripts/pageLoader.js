/*
  Assignment: Attraction Efficiency Tracker
  Author: Matthew Baugh
  Date: 8/13/2020
  Purpose: To provide the functionality pre-loading information when certain
    pages are loaded
  Credit: This is based on the Thyroid App in Chapter 5, 6, & 7
*/

/*
  Add an on pageshow handler for the document so that when a page is made
  active, it will pre-load any necessary information
*/
$(document).on("pageshow", function() {
  if ($(".ui-page-active").attr("id") == "pageAttrInfo") {
    showAttrForm();
  } else if ($(".ui-page-active").attr("id") == "pageAttrData") {
    loadAttrData();
    listData();
  } else if ($(".ui-page-active").attr("id") == "pageAdvice") {
    showAdvice();
    resizeCanvas();
  } else if ($(".ui-page-active").attr("id") == "pageGraph") {
    showGraph();
    resizeCanvas();
  }
});

/*
  resizeCanvas will check if the width of the window is less than 700px.  If it
  is then it will change the width of the advice canvas and graph canvas to be
  50px smaller than the window width
*/
function resizeCanvas() {
  if ($(window).width() < 700) {
    $("#AdviceCanvas").css({"width": $(window).width() - 50});
    $("#GraphCanvas").css({"width": $(window).width() - 50});
  }
}
