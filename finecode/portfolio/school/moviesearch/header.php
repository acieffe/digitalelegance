<html>

<head>
<title>Find the Title With PHP Hints</title>
<!-- stylesheet -->
<link href="styles.css" rel="stylesheet" type="text/css" /> 
<!-- 
  Script to connect main page content (title_hints.php) and 
  the list of movies (movies.php) 
-->
<script language="JavaScript" type="text/javascript">

function showHint(str) {
  // If empty, don't show anything yet 
  if (str.length==0) {
    document.getElementById("txtHint").innerHTML="";
    return;
  }

  // Compatibility with browsers
  if (window.XMLHttpRequest) { // current and updated browsers
    var xmlhttp = new XMLHttpRequest();
  } else { // older browsers that shouldn't be used
    var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  } 

  // Running the script anytime a user types a key stroke into the search
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      document.getElementById("txtHint").innerHTML=xmlhttp.responseText;
    }
  }
  
  // open will "GET" the server-side information from movies.php and 
  // search for the string from the search.
  xmlhttp.open("GET","movies.php?str="+str,true);
  xmlhttp.send();
}

</script>
</head>

<body>