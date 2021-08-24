/****** All Variables ******/

// Static Buttons
var lockBtn = document.getElementById('lock');
var fullScreen = document.getElementById("fullScreen");
var helpFileAr = document.getElementById("helpFile");
var bestIf = document.getElementById("bestIf");
// Buttons on the Top level
var drawingBtn = document.getElementById('drawing');
var drawImg = document.getElementById('drawImg');
var erasingBtn = document.getElementById('erasing');
var eraseImg = document.getElementById('eraseImg');
var clearBtn = document.getElementById('clearDraw');

var drawSpace = document.getElementById('topLayer')
var keypadBtn = document.getElementById('keypadView')
var keypadArea = document.getElementById('keypadHolderShow')

var allColors = document.getElementById('colorChoice');
var colorsView = document.getElementById('colorPickerShow');
var colorHolder = document.getElementById('colorHolder');
var colorUrl = colorHolder.src.replace("black.png", "");
var colorNow = "black";

var allSizes = document.getElementById('lineSize');
var lineView = document.getElementById('lineSizeShow');
var lineSizeHolder = document.getElementById('lineSizeHolder');
var lineUrl = lineSizeHolder.src.replace("51.png", "");
var sizeNow = "51";

var allOpacity = document.getElementById('lineOpacity');
var opacityView = document.getElementById('opacityShow');
var opacityHolder = document.getElementById('opacityHolder');

var grouper = document.getElementById("grouperName");
var grouperSubmit = document.getElementById("grouperSubmit");

var groupHolder = [];
var notepad = document.getElementById("output");
var cap = 25;

/*********************************
*
* All HTML Elements
*
***********************************/
//Room Elements
var room1 =document.getElementById('room01');
var room2 =document.getElementById('room02');
var room3 =document.getElementById('room03');
var room4 =document.getElementById('room04');
var firstHeader = document.getElementById('header01');
var secondHeader = document.getElementById('header02');
var thirdHeader = document.getElementById('header03');
var forthHeader = document.getElementById('header04');
var rr1h1 = document.getElementById('rr1h1');
var rr1Wedge = document.getElementById('rr1Wedge');
var rr1h2 = document.getElementById('rr1h2');
var rr2h1 = document.getElementById('rr2h1');
var rr2Wedge = document.getElementById('rr2Wedge');
var rr2h2 = document.getElementById('rr2h2');
var rr3h1 = document.getElementById('rr3h1');
var rr3Wedge = document.getElementById('rr3Wedge');
var rr3h2 = document.getElementById('rr3h2');
var rr4h1 = document.getElementById('rr4h1');
var rr4Wedge = document.getElementById('rr4Wedge');
var rr4h2 = document.getElementById('rr4h2');
var newImg = document.createElement("img");

/*********************************
*
* This section is for creating all
* of the Seat and Grouper objects
*
***********************************/
function Seat(seatId, rideRoom, riderLevel, seatNumber, goodImage, downImage) {
  this.seatId = seatId;
	this.rideRoom = rideRoom;
	this.riderLevel = riderLevel;
  this.seatNumber = seatNumber;
	this.goodImage = goodImage;
  this.downImage = downImage;
  this.seatClass = "seat";
  this.seatStatus = "Good";
}

function Grouper(grouperName, rideRoom1, rideRoomLevel1, rideRoom2, rideRoomLevel2, rideRoom3, rideRoomLevel3, rideRoom4, rideRoomLevel4) {
  this.grouperName = grouperName;
  this.rideRoom1 = rideRoom1;
  this.rideRoomLevel1 = rideRoomLevel1;
  this.rideRoom2 = rideRoom2;
  this.rideRoomLevel2 = rideRoomLevel2;
  this.rideRoom3 = rideRoom3;
  this.rideRoomLevel3 = rideRoomLevel3;
  this.rideRoom4 = rideRoom4;
  this.rideRoomLevel4 = rideRoomLevel4;
}

/*********************************
*
* Creating Every Seat Object in an
* array of seats
*
***********************************/
var seats = [];
var capacity = 192;
var rrNames = ["A", "B", "C", "D"];
var rrLevels = 3;
var roomCapacity = 16;
var x = 0;

for (var r = 0; r < rrNames.length; r++) {
	for (var l = 1; l < rrLevels+1; l++) {
    for (var s = 1; s < roomCapacity+1; s++) {
      seats[x] = new Seat("r" + rrNames[r] + "l" + l + "s" + s, rrNames[r], l, s, "images/s" + s + "Good.png", "images/s" + s + "Down.png")
			x++;
		}
  }
}

/*********************************
*
* Creating Every Grouper Object in an
* array of Groupers
*
***********************************/
var groupers = [];

groupers[0] = new Grouper("grouper1", "A", 1, "B", 1, "C", 1, "D", 1);
groupers[1] = new Grouper("grouper2", "A", 2, "B", 2, "C", 3, "D", 3);
groupers[2] = new Grouper("grouper3", "A", 3, "B", 3, "C", 2, "D", 2);
groupers[3] = new Grouper("grouper2l", "A", 2, "A", 3, "B", 2, "B", 3);
groupers[4] = new Grouper("grouper3r", "C", 2, "C", 3, "D", 2, "D", 3);

/* Lock Button To Draw, Unlock to Access Seats */
function toggleCanvas() {
  if (lockBtn.outerHTML.includes("Close")) {
      lockBtn.src = 'images/lockOpen.png';
      drawSpace.style = 'display:none;'
    } else {
      lockBtn.src = 'images/lockClose.png';
      drawSpace.style = 'display:flex;'
    }
}

/************************************
*
* This is the area for Canvas Drawing
*
************************************/

//Canvas
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

//Variables
var hue = 0;
var {x: canvasx, y: canvasy} = canvas.getBoundingClientRect();
var last_mousex = last_mousey = 0;
var mousex = mousey = 0;
var mousedown = false;
var tooltype = 'draw';
var theColor = 'black';
var theSize = 51;
var theOpacity = 1;

if ($( window ).width() < $( window ).height()) {
  canvas.width = $( "#topLayer" ).height();
  canvas.height = $( "#topLayer" ).width();
  canvasy = $( window ).width() - canvas.height;
} else {
  canvas.width = $( "#topLayer" ).width();
  canvas.height = $( "#topLayer" ).height();
  canvasy = $( document ).height() - canvas.height;
}


// choose the best event type
var [down, up, move, out] = (
  'onpointermove' in document.body ?
    ['pointerdown', 'pointerup', 'pointermove', 'pointerout']  :
  'ontouchmove' in document.body ?
    ['touchstart', 'touchend', 'touchmove', 'touchend'] :
  // else
    ['mousedown', 'mouseup', 'mousemove', 'mouseout']
)

//Mousedown
$(canvas).on(down, function(e) {
  last_mousex = mousex = parseInt(e.clientX-canvasx);
	last_mousey = mousey = parseInt(e.clientY-canvasy);
  mousedown = true;
  drawSomething();

});

//Mouseup
$(canvas).on(up, function(e) {
    mousedown = false;
});

//Mousemove
$(canvas).on(move, function(e) {
    mousex = parseInt(e.clientX-canvasx);
    mousey = parseInt(e.clientY-canvasy);
    drawSomething();
});

function drawSomething () {
    if(mousedown) {
        ctx.beginPath();
        if(tooltype=='draw') {
            ctx.globalCompositeOperation = 'source-over';
            if (theColor === "rainbow") {
              ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
              hue++
              if (hue >= 360) {
                hue = 0;
              }
            } else {
              ctx.strokeStyle = theColor; // reads color from picker
            }
            ctx.lineWidth = theSize; // reads pen size from range
            ctx.globalAlpha = theOpacity; // Opacity for drawing color;
        } else {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.globalAlpha = theOpacity;
            ctx.lineWidth = theSize; // reads pen size from range
        }
        ctx.moveTo(last_mousex, last_mousey);
        ctx.lineTo(mousex, mousey);
        ctx.lineJoin = ctx.lineCap = 'round';
        ctx.stroke();
    }
    last_mousex = mousex;
    last_mousey = mousey;
}

//Use draw|erase
use_tool = function(tool) {
    tooltype = tool; //update
}

/* Canvas Controls */

// Draw On Canvas Button
drawingBtn.addEventListener('click', function() {
  switchToDraw();
});

function switchToDraw() {
  use_tool('draw');
  drawingBtn.className = "controlBtnDown";
  erasingBtn.className = "controlBtnUp";
  drawImg.src = "images/drawingDown.png"
  eraseImg.src = "images/eraserUp.png"
}

// Erase Current Drawings Button
erasingBtn.addEventListener('click', function() {
  use_tool('erase');
  drawingBtn.className = "controlBtnUp";
  erasingBtn.className = "controlBtnDown";
  drawImg.src = "images/drawingUp.png"
  eraseImg.src = "images/eraserDown.png"
  theOpacity = 1;
  opacityHolder.style = "opacity: 1;";
});

// Clear All Drawings Button
function eraseCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

/* Keypad Display and Hide From View */
keypadBtn.addEventListener('click', function() {
  if (keypadArea.id.includes("Show")) {
    keypadArea.style = 'display:flex;'
    keypadView.className = "controlBtnDown";
    keypadArea.id = "keypadHolderHide";
    allColors.className = "controlBtnUp";
    colorsView.style = 'display:none;'
    colorsView.id = colorsView.id.replace("Hide", "Show");
    allSizes.className = "controlBtnUp";
    lineView.style = 'display:none;'
    lineView.id = lineView.id.replace("Hide", "Show");
    allOpacity.className = "controlBtnUp";
    opacityView.style = 'display:none;'
    opacityView.id = opacityView.id.replace("Hide", "Show");
  } else {
      keypadArea.style = 'display:none;';
      keypadView.className = "controlBtnUp";
      keypadArea.id = "keypadHolderShow";
    }
});

// Buttons on Bottom Level of Controls

// Color Selection Button
allColors.addEventListener('click', function() {
  if (colorsView.id.includes("Show")) {
      allColors.className = "controlBtnDown";
      colorsView.style = 'display: flex;'
      colorsView.id = colorsView.id.replace("Show", "Hide");
      allSizes.className = "controlBtnUp";
      lineView.style = 'display:none;'
      lineView.id = lineView.id.replace("Hide", "Show");
      allOpacity.className = "controlBtnUp";
      opacityView.style = 'display:none;'
      opacityView.id = opacityView.id.replace("Hide", "Show");
      keypadArea.style = 'display:none;';
      keypadView.className = "controlBtnUp";
      keypadArea.id = "keypadHolderShow";
    } else {
      allColors.className = "controlBtnUp";
      colorsView.style = 'display:none;'
      colorsView.id = colorsView.id.replace("Hide", "Show");
      switchToDraw();
    }
});

/**************************************
*
* Change The Color of The Displayed Color
* In Drawing Controls & Send New Color To
* Drawing Function
*
***************************************/

function replaceColor(colorImport) {
  colorNow = colorHolder.src.replace(colorUrl, "");
  colorNow = colorNow.replace(".png", "");
  colorHolder.src = colorHolder.src.replace(colorNow, colorImport);
  theColor = colorImport;
  allColors.className = "controlBtnUp";
  colorsView.style = 'display:none;'
  colorsView.id = colorsView.id.replace("Hide", "Show");
  switchToDraw();
}

// Line Size Selection Button

allSizes.addEventListener('click', function() {
  if (lineView.id.includes("Show")) {
      allSizes.className = "controlBtnDown";
      lineView.style = 'display: flex;'
      lineView.id = lineView.id.replace("Show", "Hide");
      allColors.className = "controlBtnUp";
      colorsView.style = 'display:none;'
      colorsView.id = colorsView.id.replace("Hide", "Show");
      allOpacity.className = "controlBtnUp";
      opacityView.style = 'display:none;'
      opacityView.id = opacityView.id.replace("Hide", "Show");
      keypadArea.style = 'display:none;';
      keypadView.className = "controlBtnUp";
      keypadArea.id = "keypadHolderShow";
    } else {
      allSizes.className = "controlBtnUp";
      lineView.style = 'display:none;'
      lineView.id = lineView.id.replace("Hide", "Show");
    }
});

function lineSize(sizeNumber) {
  sizeNow = lineSizeHolder.src.replace(lineUrl, "");
  sizeNow = sizeNow.replace(".png", "");
  lineSizeHolder.src = lineSizeHolder.src.replace(sizeNow, sizeNumber);
  theSize = sizeNumber;
  allSizes.className = "controlBtnUp";
  lineView.style = 'display:none;'
  lineView.id = lineView.id.replace("Hide", "Show");
}

// Line Opacity
allOpacity.addEventListener('click', function() {
  if (opacityView.id.includes("Show")) {
      allOpacity.className = "controlBtnDown";
      opacityView.style = 'display: flex;'
      opacityView.id = opacityView.id.replace("Show", "Hide");
      allColors.className = "controlBtnUp";
      colorsView.style = 'display:none;'
      colorsView.id = colorsView.id.replace("Hide", "Show");
      allSizes.className = "controlBtnUp";
      lineView.style = 'display:none;'
      lineView.id = lineView.id.replace("Hide", "Show");
      keypadArea.style = 'display:none;';
      keypadView.className = "controlBtnUp";
      keypadArea.id = "keypadHolderShow";
    } else {
      allOpacity.className = "controlBtnUp";
      opacityView.style = 'display:none;'
      opacityView.id = opacityView.id.replace("Hide", "Show");
    }
});

function opacity(opacityNumber) {
  opacityHolder.style.opacity = opacityNumber;
  theOpacity = opacityNumber;
  allOpacity.className = "controlBtnUp";
  opacityView.style = 'display:none;'
  opacityView.id = opacityView.id.replace("Hide", "Show");
}


/************************************
*
* This is the area for keypad display
*
************************************/

function comingUp(keypadId) {
  if(groupHolder.length <= cap) {
    if (keypadId === "F") {
      combine("&#128106,");
    } else {
    combine(keypadId);
    }
  }
}

function comingUpClear() {
  if (notepad.innerHTML === "223") {
    document.getElementById("easterEgg").style = "display: block;";
  }
  groupHolder = [];
  notepad.innerHTML = "Group<br/>Numbers";
}

function backBtn() {
  groupHolder.pop();
  if (groupHolder.length === 0) {
    notepad.innerHTML = "Group<br/>Numbers";
  } else {
  notepad.innerHTML = groupHolder.join('');
  }
}

function combine(number) {
  groupHolder.push(number);
  notepad.innerHTML = groupHolder.join('');
}

/************************************
*
* This is the area for the fullscreen
* button control
*
************************************/

fullScreen.addEventListener("click", function() {
	if (fullScreen.outerHTML.includes("min")) {
		fullScreen.src = "images/maxScreen.png";
    bestIf.style = "display: none;";
    openFullscreen();
	}
	else {
		fullScreen.src = "images/minScreen.png";
    bestIf.style = "display: inherit;";
    closeFullscreen();
	}
});

/* Get the documentElement (<html>) to display the page in fullscreen */
var elem = document.documentElement;

/* View in fullscreen */
function openFullscreen() {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  } else if (document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen();
  } else if (document.documentElement.webkitRequestFullscreen) {
    document.documentElement.webkitRequestFullscreen();
  } else if (document.documentElement.msRequestFullscreen) {
    document.documentElement.msRequestFullscreen();
  }
  screen.orientation.lock('landscape-primary');
}

function lock (orientation) {
  // Go into full screen first
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  } else if (document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen();
  } else if (document.documentElement.webkitRequestFullscreen) {
    document.documentElement.webkitRequestFullscreen();
  } else if (document.documentElement.msRequestFullscreen) {
    document.documentElement.msRequestFullscreen();
  }
  screen.orientation.lock('landscape-primary');
}

/* Close fullscreen */
function closeFullscreen() {
  screen.orientation.unlock();

  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE/Edge */
    document.msExitFullscreen();
  }
}

/* Shows Help File */
function showHelp() {
  if (document.getElementById("helpFile").style.display === "none") {
    document.getElementById("helpFile").style = "display: block;";
    document.getElementById('allRooms').style = "display: none;";
    toggleCanvas();
  } else {
    document.getElementById("helpFile").style = "display: block;";
    document.getElementById('allRooms').style = "display: none;";
  }
}

function disappearHelp() {
  document.getElementById("helpFile").style = "display: none;";
  document.getElementById("allRooms").style = "display: inherit;";
}

function disappearEgg() {
  document.getElementById("easterEgg").style = "display: none;";
}


/*********************************
*
* Event Listener for which grouper
*
***********************************/

grouperSubmit.addEventListener('click', function() {
  disappearHelp();
  toggleCanvas();
  eraseCanvas();
  room1.className = "roomsGood";
  room2.className = "roomsGood";
  room3.className = "roomsGood";
  room4.className = "roomsGood";
	createRoom(grouper.value);
});

/*********************************
*
* Clear All Seats Function
*
***********************************/
function clearRooms() {
  while (rr1h1.firstChild) { // Devaring All Seats
    rr1h1.removeChild(rr1h1.lastChild);
    rr1h2.removeChild(rr1h2.lastChild);
    rr2h1.removeChild(rr2h1.lastChild);
    rr2h2.removeChild(rr2h2.lastChild);
    rr3h1.removeChild(rr3h1.lastChild);
    rr3h2.removeChild(rr3h2.lastChild);
    rr4h1.removeChild(rr4h1.lastChild);
    rr4h2.removeChild(rr4h2.lastChild);
  }
  while (rr1Wedge.firstChild) { // Devaring Any Wedges
    rr1Wedge.removeChild(rr1Wedge.lastChild);
    rr2Wedge.removeChild(rr2Wedge.lastChild);
    rr3Wedge.removeChild(rr3Wedge.lastChild);
    rr4Wedge.removeChild(rr4Wedge.lastChild);
  }
}

/*********************************
*
* Room Creation Function
*
***********************************/

function resetRoom(index) {
  firstHeader.innerHTML = groupers[index].rideRoom1+groupers[index].rideRoomLevel1;
  room1.className = "roomsGood";
  secondHeader.innerHTML = groupers[index].rideRoom2+groupers[index].rideRoomLevel2;
  room2.className = "roomsGood";
  thirdHeader.innerHTML = groupers[index].rideRoom3+groupers[index].rideRoomLevel3;
  room3.parentNode.className = "roomsGood";
  forthHeader.innerHTML = groupers[index].rideRoom4+groupers[index].rideRoomLevel4;
  room3.parentNode.className = "roomsGood";

}

function createRoom(grouper) {
  for (var i = 0; i < groupers.length; i++) {
    if (grouper === groupers[i].grouperName) {
      clearRooms(); // Empties room of old seats and wedge
      resetRoom(i); // Set Header names and clear style
      document.getElementById('divide1').style = "display: flex;";
      document.getElementById('divide2').style = "display: flex;";
      document.getElementById('divide3').style = "display: flex;";
      for (var m = 1; m < 9; m++) {
        rr1h1.appendChild(makeImgElement(groupers[i].rideRoom1, groupers[i].rideRoomLevel1, m));// Create Seats 1st Half
        rr2h1.appendChild(makeImgElement(groupers[i].rideRoom2, groupers[i].rideRoomLevel2, m));// Create Seats 1st Half
        rr3h1.appendChild(makeImgElement(groupers[i].rideRoom3, groupers[i].rideRoomLevel3, m));// Create Seats 1st Half
        rr4h1.appendChild(makeImgElement(groupers[i].rideRoom4, groupers[i].rideRoomLevel4, m));// Create Seats 1st Half
      }
      rr1Wedge.appendChild(newImg.cloneNode(true)).setAttribute("src", "images/WedgeGood.png");// Create Wedge
      rr2Wedge.appendChild(newImg.cloneNode(true)).setAttribute("src", "images/WedgeGood.png");// Create Wedge
      rr3Wedge.appendChild(newImg.cloneNode(true)).setAttribute("src", "images/WedgeGood.png");// Create Wedge
      rr4Wedge.appendChild(newImg.cloneNode(true)).setAttribute("src", "images/WedgeGood.png");// Create Wedge
      for (var m = 9; m < 17; m++) {
        rr1h2.appendChild(makeImgElement(groupers[i].rideRoom1, groupers[i].rideRoomLevel1, m));// Create Seats 1st Half
        rr2h2.appendChild(makeImgElement(groupers[i].rideRoom2, groupers[i].rideRoomLevel2, m));// Create Seats 1st Half
        rr3h2.appendChild(makeImgElement(groupers[i].rideRoom3, groupers[i].rideRoomLevel3, m));// Create Seats 1st Half
        rr4h2.appendChild(makeImgElement(groupers[i].rideRoom4, groupers[i].rideRoomLevel4, m));// Create Seats 1st Half
      }
    }
  }
}

/*********************************
*
* Function returns url for Good or
* Down seats by checking seatStatus
*
***********************************/

function goodOrDown(status, index) {
  if (status === "Good") {
    return seats[index].goodImage;
  }
  else {
    return seats[index].downImage;
  }
}

/*********************************
*
* Function creates img element for
* each seat with statused image and
* seatId as attributes
*
***********************************/

function makeImgElement(room, level, number) {
  var seatImage = document.createElement("img");
  for (var i = 0; i < seats.length; i++) {
    if (seats[i].rideRoom === room && seats[i].riderLevel === level && seats[i].seatNumber === number) {
      break;
    }
  }
  seatImage.src = goodOrDown(seats[i].seatStatus, i);
  seatImage.id = seats[i].seatId;
	var functionString = "changeSeatStatus('" + seatImage.id + "')";
  seatImage.setAttribute("class", seats[i].seatClass);
	seatImage.setAttribute("onclick", functionString);
  return seatImage;
}

/**************************
*
* Function to initiate swap
*
***************************/

function changeSeatStatus(seatId) {
	var seatElement = document.getElementById(seatId);
	for (var i = 0; i < seats.length; i++) {
		if (seats[i].seatId === seatId && seats[i].seatStatus === "Good") {
			seatElement.src = seats[i].downImage;
			seats[i].seatStatus = "Down";
		} else if (seats[i].seatId === seatId && seats[i].seatStatus === "Down") {
			seatElement.src = seats[i].goodImage;
			seats[i].seatStatus = "Good";
		}
	}
}

function whyGodNo(room) {
	var theRoomName = document.getElementById(room);
	var theRoom = document.getElementById(room).parentNode;
	var allMyChildren = theRoom.querySelectorAll('img');
	if (theRoom.className === "roomsGood") {
		for (var i = 0; i < allMyChildren.length; i++) {
			allMyChildren[i].src = allMyChildren[i].src.replace("Good", "Down");
		}
		theRoom.className = "roomsDown";
	} else {
		for (var i = 0; i < allMyChildren.length; i++) {
			if (allMyChildren[i].className !== "seat") {
				allMyChildren[i].src = allMyChildren[i].src.replace("Down", "Good");
			} else if (searchSeats(allMyChildren[i].id) === "Good") {
				allMyChildren[i].src = allMyChildren[i].src.replace("Down", "Good");
			}
		}
		theRoom.className = "roomsGood";
		}
	}

	function searchSeats(badgers) {
    for (var i = 0; i < seats.length; i++) {
			if (badgers === seats[i].seatId) {
				return seats[i].seatStatus;
			}
		}
	}
