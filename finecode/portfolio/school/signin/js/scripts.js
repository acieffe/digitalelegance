/*
  Assignment: Sign_In
  Author: Matthew Baugh
  Date: 8/23/2020
  Purpose: Stores User Information in local storage and validates
  phone number and password
*/

/*
  storeInfo checks form for entries, if validated information is stored
  in local storage if available
*/
function storeInfo () {
  if(checkForm()) {
    var user = {
      "FName" : document.getElementById("fName").value,
      "LName" : document.getElementById("lName").value,
      "Address" : document.getElementById("address").value,
      "City" : document.getElementById("city").value,
      "State" : document.getElementById("state").value,
      "Email" : document.getElementById("email").value,
      "Phone" : document.getElementById("phone").value,
      "Username" : "",
      "Password" : "",
    };

    try {
      localStorage.setItem("user", JSON.stringify(user));
      alert("Saving Information");

      window.location = "sign_in3.html";
    } catch(e) {
      if (window.navigator.vendor === "Google Inc.") {
        if(e === DOMException.QUOTA_EXCEEDED_ERR) {
          alert("Error: Saving to local storage.");
        }
      } else if (e === QUOTA_EXCEEDED_ERR) {
        alert("Error: Saving to local storage.");
      }

      console.log(e);
    }
  }
}

/*
  checkForm makes sure there are entries in each input line
*/
function checkForm() {
  if(document.getElementById("fName").value == "") {
    alert("Please enter your First Name");
    return false;
  } else if(document.getElementById("lName").value == "") {
    alert("Please enter your Last Name");
    return false;
  } else if(document.getElementById("address").value == "") {
    alert("Please enter your Street Address");
    return false;
  } else if(document.getElementById("city").value == "") {
    alert("Please enter your City");
    return false;
  } else if(document.getElementById("state").value == "") {
    alert("Please enter your State");
    return false;
  } else if(document.getElementById("email").value == "") {
    alert("Please enter your Email");
    return false;
  } else if(document.getElementById("email").value != "" && validateEmail()) {
    return false;
  } else if(document.getElementById("phone").value == "") {
    alert("Please enter your Phone Number");
    return false;
  } else if(document.getElementById("phone").value != "" && validatePhone()) {
    return false;
  } else {
    return true;
  }
}

/*
  validateEmail uses regex instead of multiple passes and for & while loops
  to make sure the email fits normal criteria
*/
function validateEmail() {
  var email = document.getElementById("email").value;

  var emailTest = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if(!emailTest.test(email)) {
    alert("Please format the email as follows: name@domain.com");
    return true;
  } else {
    return false;
  }
}

/*
  validatePhone uses regex instead of multiple passes and for & while loops
  to make sure the phone number fits specification and format (XXX)XXX-XXXX
*/
function validatePhone() {
  var phone = document.getElementById("phone").value;

  var phoneTest = /\(\d{3}\)\d{3}\-\d{4}/;
  if(!phoneTest.test(phone)) {
    alert("Please format the Phone Number as follows: (555)555-5555");
    return true;
  } else {
    return false;
  }
}

/*
  storeUserPass checks id the input fields are correct and then stores data
  into local storage if available
*/
function storeUserPass() {
  if (checkUserPass()) {
    try {
      var user = JSON.parse(localStorage.getItem("user"));
      user.Username = document.getElementById("username").value;
      user.Password = document.getElementById("password").value;
      localStorage.setItem("user", JSON.stringify(user));
      alert("Saving Information");
      window.location = "sign_in2.html";
    } catch(e) {
      if (window.navigator.vendor === "Google Inc.") {
        if(e === DOMException.QUOTA_EXCEEDED_ERR) {
          alert("Error: Saving to local storage.");
        }
      } else if (e === QUOTA_EXCEEDED_ERR) {
        alert("Error: Saving to local storage.");
      }

      console.log(e);
    }
  }
}

/*
  checkUserPass validates correct entries into user input fields
*/
function checkUserPass() {
  if(document.getElementById("username").value == "") {
    alert("Please enter your Username");
    return false;
  } else if(document.getElementById("password").value == "") {
    alert("Please enter your Password");
    return false;
  } else if (document.getElementById("password").value != "" && passVal()) {
    return false;
  } else {
    return true;
  }
}

/*
  passVal uses regex instead of multiple passes and for & while loops
  to make sure the password meets specified criteria
  -One Uppercase Letter
  -One Lowercase Letter
  -One Digit (0-9)
  -One Special Character (@#$%)
  -Password must be 4-12 characters long
*/
function passVal() {
  var pass = document.getElementById("password").value;

  var passTest = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%])[0-9a-zA-Z@#$%]{4,12}$/;
  if(!passTest.test(pass)) {
    alert("Make sure your password contains each of the following: \n*One Uppercase Letter \n*One Lowercase Letter \n *One Digit (0-9) \n*One Special Character (@#$%) \n Password must be 4-12 characters long");
    return true;
  } else {
    return false;
  }
}
