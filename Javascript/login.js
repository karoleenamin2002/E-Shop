var loggedIn = JSON.parse(localStorage.getItem("LoggedIn"))
if (loggedIn == false) {
    localStorage.setItem("counter", 0);
}

if (localStorage.getItem("LoggedIn") === null) {  
        localStorage.setItem("LoggedIn", false);
}
if (localStorage.getItem("UserName") === null) {  
        localStorage.setItem("UserName", "user");
}


var form = document.getElementById("loginForm");
form.onsubmit = function() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var loginError = document.getElementById("loginError");
  var emailError = document.getElementById("emailError");
  var passwordError = document.getElementById("passwordError");

  loginError.innerHTML = "";
  emailError.innerHTML = "";
  passwordError.innerHTML = "";

  var emailPattern = /^[a-zA-Z0-9]{6,}@[a-zA-Z]{5,}.com$/;
  var passwordPattern = /[a-zA-Z0-9]{9,}/;

  if (!emailPattern.test(email)) {
    emailError.innerHTML = "Enter a valid email";
    return false;
  }

  if (!passwordPattern.test(password)) {
    passwordError.innerHTML = "Enter a password with at least 9 characters";
    return false;
  }

  var users = localStorage.getItem("users");

  if (!users) {
    loginError.innerHTML = "You don't have an account, please sign up first";
    return false;
  }

  users = JSON.parse(users);
  var emailFound = false;

  for (var i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      emailFound = true;

      if (users[i].password !== password) {
        passwordError.innerHTML = "Incorrect password";
        return false;
      }

      localStorage.setItem("LoggedIn", true); 
      localStorage.setItem("UserName", users[i].name);
      window.location.href = "home.html";
      return false;
    }
  }

  if (!emailFound) {
    loginError.innerHTML = "You don't have an account, please sign up first";
  }

  return false; 
};