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

function validateForm() {
        document.getElementById("accountError").innerHTML = "";
        document.getElementById("nameError").innerHTML = "";
        document.getElementById("emailError").innerHTML = "";
        document.getElementById("passwordError").innerHTML = "";
        document.getElementById("confirmError").innerHTML = "";
        document.getElementById("termsError").innerHTML = "";

        var name = document.getElementById("fullname").value;
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        var confirmPassword = document.getElementById("confirmPassword").value;
        var agree = document.getElementById("agree").checked;

        var nameError = document.getElementById("nameError");
        var emailError = document.getElementById("emailError");
        var passwordError = document.getElementById("passwordError");
        var confirmError = document.getElementById("confirmError");
        var termsError = document.getElementById("termsError");

        var fullNamePattern = /^[a-zA-Z]{4,}(\s[a-zA-z]{4,})+$/;
        var emailPattern = /^[a-zA-Z0-9]{6,}@[a-zA-Z]{5,}.com$/;
        var passwordPattern = /[a-zA-z0-9]{9,}/;

        var isValid = true;

        if (!fullNamePattern.test(name)) {
          nameError.innerHTML = "Enter a valid full name";
          isValid = false;
        }

        if (!emailPattern.test(email)) {
          emailError.innerHTML = "Enter a valid email";
          isValid = false;
        }

        if (!passwordPattern.test(password)) {
          passwordError.innerHTML =
            "Password must be at least 9 characters (letters & numbers)";
          isValid = false;
        }

        if (password !== confirmPassword) {
          confirmError.innerHTML = "Passwords do not match";
          isValid = false;
        }

        if (!agree) {
          termsError.innerHTML = "You must agree to the terms and conditions";
          isValid = false;
        }

        if (!isValid) {
          return false;
        }

        var users = localStorage.getItem("users");

        if (users) {
          users = JSON.parse(users);
        } else {
          users = [];
        }

        for (var i = 0; i < users.length; i++) {
            if (users[i].email === email) {

                termsError.innerHTML = "You already have an account with this email";
                return false;
            
        }
  }


  var user = {
    name: name,
    email: email,
    password: password,
  };
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  window.location.href = "login.html";
  return false;
}