<?php include 'header.php'; ?>

    <h1>Car<br>Countdown</h1>

    <div id="inputField" onclick="countdown('carLeft', 5)">
        <h3>Start!</h3>
    </div>
    
    <h2 id="cdDisplay"></h2>

    <div id="again" onclick="refresh()"><h3>Again!</h3></div>

    <div id="street">

      <img src="images/car.gif" id="carLeft" height="30px" class="vehicle">

    </div>

  </body>

</html>