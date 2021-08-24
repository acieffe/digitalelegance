<?php include 'header.php'; ?>

    <h1>Submarine<br>Countdown</h1>

    <div id="inputField" onclick="countdown('sub', 5)">
        <h3>Start!</h3>
    </div>
    
    <h2 id="cdDisplay"></h2>

    <div id="water">

      <img src="images/sub.gif" id="sub" height="50px">

      <div id="again" onclick="refresh()"><h3>Again!</h3></div>

    </div>

  </body>

</html>