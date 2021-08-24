<?php include 'header.php'; ?>

    <h1>Racecar<br>Countdown</h1>

    <div id="inputField" onclick="countdown('carLeft', 5)">
        <h3>Start Countdown</h3>
    </div>
    
    <h2 id="cdDisplay"></h2>

    <div id="again" onclick="refresh()"><h3>Again!</h3></div>

    <div id="street">

      <img src="images/racecar.png" id="carLeft" height="30px" class="vehicle">

    </div>

  </body>

</html>