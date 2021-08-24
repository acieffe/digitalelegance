<!--
  Assignment: Login Page
  Author: Matthew Baugh
  Date: 10/14/2020
  Purpose: This page will send the user to another page where their entered
    name will appear.
-->
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Page</title>

    <!-- CSS -->
    <link rel="stylesheet" href="css/styles.css">

  </head>

  <body cz-shortcut-listen="true">
    <h1>User Login</h1>

    <!-- Section to hold user input fields -->
    <div id="inputField">
      <form method="post" action="welcome.php">

        <table>
          <tr>
            <td>First Name: </td> <!-- User's First Name -->
            <td><input type="text" name="fname" /></td>
          </tr>
          <tr>
            <td>Last Name: </td> <!-- User's Last Name -->
            <td><input type="text" name="lname" /></td>
          </tr>          
          <br>
          <tr>
            <td colspan="2" align="center"> <!-- Submit Button -->
              <input type="submit" value="Submit" />
            </td>
          </tr>
        </table>


    </div>

  </body>
</html>