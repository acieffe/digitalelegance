<?php include 'header.php'; ?>

    <h1>Fire Truck<br>Countdown</h1>

    <div id="inputField" onclick="countdown('carRight', 5)">
        <h3>Start!</h3>
    </div>
    
    <h2 id="cdDisplay"></h2>

    <div id="again" onclick="refresh()"><h3>Again!</h3></div>

    <div id="street">

      <img src="images/firetruck.gif" id="carRight" height="60px" width="70px" class="vehicle">

    </div>

  </body>

</html>