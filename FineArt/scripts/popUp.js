var maxTime = 40;
var i = 0;

$(function () {
  popUp();
});

function popUp() {
  var delayTime = delayTimeGen(maxTime);
  setTimeout(function () {
    $( "#itemSold" ).slideDown( 1000 );
    var aName = allTheNames[randomGenerator(allTheNames.length)];
    $("#buyerName").text(aName);
    $( "#itemSold" ).delay( 5000 ).slideUp( 1000 );
    i++;
    if (i < allTheNames.length) {
      popUp();
    }
  }, delayTime)
};

function delayTimeGen(max) {
  return randomGenerator(max) * 1000 + 10000;
};

function randomGenerator(top) {
  return Math.floor(Math.random() * Math.floor(top));
};
