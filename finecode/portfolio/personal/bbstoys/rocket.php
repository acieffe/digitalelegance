<?php include 'header.php'; ?>

    <h1>Rocket<br>Countdown</h1>

    <div id="inputField" onclick="countdown('rocket', 10)">
        <h3>Start!</h3>
    </div>

    <img src="images/rocket.png" id="rocket" height="100" width="87" class="vehicle">

    <h2 id="cdDisplay"></h2>

    <div id="again" onclick="refresh()"><h3>Again!</h3></div>

  </body>

</html>