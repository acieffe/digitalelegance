<?php include 'header.php'; ?>

    <h1>Bus<br>Countdown</h1>

    <div id="inputField" onclick="countdown('carLeft', 3)">
        <h3>Start!</h3>
    </div>
    
    <h2 id="cdDisplay"></h2>

    <div id="again" onclick="refresh()"><h3>Again!</h3></div>

    <div id="street">

      <img src="images/bus.gif" id="carLeft" height="40px" class="vehicle">

    </div>

  </body>

</html>