<!--
  Assignment: Title Hints
  Author: Matthew Baugh
  Date: 11/8/2020
  Purpose: This page will search through the array for 
    matching movie titles and display all that match.
-->

<?php include('header.php');?>
<div id="content">
  <h1>Movie List Search</h1>
  <h2>
    Enter the first word in the movie title to see all 
    the movies in this list that begin with that word:
  </h2>
  <form>
    <h3>
      First Word: <input type="text" onkeyup="showHint(this.value)" size="20" />
    </h3>
  </form>
  <p>
    <strong>Suggestions:</strong>
  </p>
  <p><span id="txtHint"></span></p>
  
</div>

</html>