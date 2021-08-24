/* Show the navbar in the page header shown on every page */
function showNav() {
  document.getElementById("showNav").style = "display:none;";
  document.getElementById("navigation").style = "display: block;";
}

/*
  countdown takes an initial number and display that number down to 0 
  with a second between numbers.
*/
function countdown(vehicle, counter) {
  document.getElementById("inputField").style = "display:none;";
  setTimeout(function () { // start countdown function
    var showCount = document.getElementById("cdDisplay"); // element to hold text
    showCount.innerHTML = counter; // number to display
    counter--; // decriment countdown
    if (counter >= 0) {
      countdown(vehicle, counter); // calls this whole function again with new count
    } else {
      if (vehicle == "rocket") {
        showCount.innerHTML = "Blast Off!"; // text display
        moveRocket(); // call function
      } else if (vehicle == "jet") {
        showCount.innerHTML = "Zoom!"; // text display
        moveJet(); // call function
      } else if (vehicle == "helicopter") {
        showCount.innerHTML = "Take Off!"; // text display
        moveHelicopter(); // call function
      } else if (vehicle == "carLeft") {
        showCount.innerHTML = "Vroom"; // text display
        moveCarLeft(); // call function
      } else if (vehicle == "carRight") {
        showCount.innerHTML = "Vroom"; // text display
        moveCarRight(); // call function
      } else if (vehicle == "boat") {
        showCount.innerHTML = "Sail!"; // text display
        moveBoat(); // call function
      } else if (vehicle == "sub") {
        showCount.innerHTML = "Dive!"; // text display
        moveSub(); // call function
      }
    }
  }, 1000) // one second delay
};

/*
  moveRocket animates the rocket at the bottom of the screen out the top
*/
function moveRocket() {
  var rocket = document.getElementById("rocket"); // rocket element
  var pos = 1; // starting point flush to bottom of screen
  var id = setInterval(frame, 10); // animation rate
  function frame() {
    if (pos > 1800) { // ending above screen viewport
      clearInterval(id);
      document.getElementById("again").style = "display:block;";
    } else {
      pos *= 1.01; // increasing screen position slow to fast
      rocket.style.bottom = pos + 'px'; // shows rocket higher on screen
    }
  }
}

// // Moves Jet in an accelorating curved diagonal line from bottom right position
function moveJet() {
  var jet = document.getElementById("jet"); // jet element
  var posx = 1; // starting point flush to bottom of screen
  var posy = 1;
  var id = setInterval(frame, 10); // animation rate
  function frame() {
    if (posx > 1800) { // ending above screen viewport
      clearInterval(id);
      document.getElementById("again").style = "display:block;";
    } else {
      if (posx < 40) {
        posx *= 1.015; // increasing screen position slow to fast
      } else {
        posx *= 1.015; // increasing screen position slow to fast
        posy *= 1.03; // increasing screen position slow to fast
      }
      jet.style.right = posx + 'px'; // shows jet higher on screen
      jet.style.bottom = posy +'px';
    }
  }
}

// Moves Helicopter in an accelorating diagonal line from bottom right position
function moveHelicopter() {
  var helicopter = document.getElementById("helicopter"); // helicopter element
  var pos = 1; // starting point flush to bottom of screen
  var id = setInterval(frame, 10); // animation rate
  function frame() {
    if (pos > 1800) { // ending above screen viewport
      clearInterval(id);
      document.getElementById("again").style = "display:block;";
    } else {
      pos *= 1.01; // increasing screen position slow to fast
      helicopter.style.right = pos + 'px'; // shows helicopter higher on screen
      helicopter.style.bottom = pos +'px';
    }
  }
}

// Moves a vehicle starting from the right position accelorating to the left
function moveCarRight() {
  var carRight = document.getElementById("carRight"); // carRight element
  var pos = 1; // starting point flush to bottom of screen
  var id = setInterval(frame, 10); // animation rate
  function frame() {
    if (pos > 1800) { // ending above screen viewport
      clearInterval(id);
      document.getElementById("again").style = "display:block;";
    } else {
      pos *= 1.01; // increasing screen position slow to fast
      carRight.style.right = pos + 'px'; // shows carRight higher on screen
    }
  }
}

// Moves a vehicle starting from the left position accelorating to the right
function moveCarLeft() {
  var carLeft = document.getElementById("carLeft"); // carLeft element
  var pos = 1; // starting point flush to bottom of screen
  var id = setInterval(frame, 10); // animation rate
  function frame() {
    if (pos > 1800) { // ending above screen viewport
      clearInterval(id);
      document.getElementById("again").style = "display:block;";
    } else {
      pos *= 1.01; // increasing screen position slow to fast
      carLeft.style.left = pos + 'px'; // shows carLeft higher on screen
    }
  }
}

// Moves a vehicle starting from the right position accelorating to the left
function moveBoat() {
  var boat = document.getElementById("boat"); // boat element
  var pos = 1; // starting point flush to bottom of screen
  var id = setInterval(frame, 10); // animation rate
  function frame() {
    if (pos > 1800) { // ending above screen viewport
      clearInterval(id);
      document.getElementById("again").style = "display:block;";
    } else {
      pos *= 1.01; // increasing screen position slow to fast
      boat.style.right = pos + 'px'; // shows boat higher on screen
    }
  }
}

// Moves the submarine from the top position accelorating down
function moveSub() {
  var sub = document.getElementById("sub"); // sub element
  var pos = 1; // starting point flush to bottom of screen
  var id = setInterval(frame, 10); // animation rate
  function frame() {
    if (pos > 1800) { // ending above screen viewport
      clearInterval(id);
      document.getElementById("again").style = "display:block;";
    } else {
      pos *= 1.01; // increasing screen position slow to fast
      sub.style.top = pos + 'px'; // shows sub higher on screen
    }
  }
}

/*
  refresh will reset the page to it's initial load state
*/
function refresh() {
  location.reload();
}