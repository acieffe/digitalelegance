<!--
  Assignment: Title Hints
  Author: Matthew Baugh
  Date: 11/8/2020
  Purpose: This page will search through the array for 
    matching movie titles and display all that match.
-->

<?php

$movies[] = "Dead Poet's Society";
$movies[] = "Swing Kids";
$movies[] = "Newsies";
$movies[] = "The Last Starfighter";
$movies[] = "Goonies";
$movies[] = "Star Wars";
$movies[] = "Spider-Man";
$movies[] = "Bell; Book; and Candle";
$movies[] = "Watcher in the Woods";
$movies[] = "Fantasia";
$movies[] = "Flight of the Navigator";
$movies[] = "Gremlins";
$movies[] = "Ghostbusters";
$movies[] = "Toys";
$movies[] = "Lord of the Rings";
$movies[] = "Young Sherlock Holmes";
$movies[] = "Indiana Jones and the Last Crusade";
$movies[] = "The Best Two Years";
$movies[] = "Testiments";
$movies[] = "The Ultimate Gift";

$str = $_GET["str"];

if (strlen($str) > 0) {
  $hint="";
  for($i=0; $i<count($movies); $i++) {
    if (strtolower($str)==strtolower(substr($movies[$i],0,strlen($str)))) {
      if ($hint=="") {
        $hint=$movies[$i];
      }
      else {
        $hint=$hint." | ".$movies[$i];
      }
    }
  }
}

if ($hint == "") {
  $response="No Names Match";
} else {
  $response=$hint;
}

echo $response;
?>