document.addEventListener("DOMContentLoaded", function () {
  // Sign Up
  var signUpBtn = document.getElementById("signUpBtn");
  if (signUpBtn) {
    signUpBtn.addEventListener("click", function () {
      var name = document.getElementById("signUpName").value;
      var email = document.getElementById("signUpEmail").value;
      var password = document.getElementById("signUpPassword").value;

      if (name ==="" || email==="" || password==="") {
       Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Fields cannot be empty!",
  footer: '<a href="#">Why do I have this issue?</a>'
});
        return;
      }

      if (password.length < 6) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Password must be at least 6 characters.",
          footer: '<a href="#">Why do I have this issue?</a>'
        });
        return;
      }

      var users = JSON.parse(localStorage.getItem("users")) || [];

      if (users.find(function(user) { return user.email === email })) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "This email is already registered.",
          footer: '<a href="#">Why do I have this issue?</a>'
        });
        return;
      }

      users.push({ name: name, email: email, password: password });
      localStorage.setItem("users", JSON.stringify(users));
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Account created successfully!",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
      window.location.href = "index.html";
    });
  }

  // Sign In
  var loginBtn = document.getElementById("loginBtn");
  if (loginBtn) {
    loginBtn.addEventListener("click", function () {
      var email = document.getElementById("signInEmail").value;
      var password = document.getElementById("signInPassword").value;

      var users = JSON.parse(localStorage.getItem("users")) || [];
      var foundUser = users.find(function(user) {
        return user.email === email && user.password === password;
      });

      if (foundUser) {
        localStorage.setItem("loggedInUser", JSON.stringify(foundUser));

        Swal.fire({
          icon: "success",
          title: "Login successful!",
          footer: '<a href="#">Why do I have this issue?</a>'
        });
        window.location.href = "home.html";
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Incorrect email or password.",
          footer: '<a href="#">Why do I have this issue?</a>'
        });
      }
    });
  }

  // Home Page
  if (window.location.pathname.includes("home.html")) {
    var user = JSON.parse(localStorage.getItem("loggedInUser"));
    var welcome = document.getElementById("welcomeMsg");
    var logoutBtn = document.getElementById("logoutBtn");

    if (!user) {
      window.location.href = "index.html";
    } else {
      welcome.textContent = "Welcome, " + user.name + "!";
    }

    logoutBtn.addEventListener("click", function () {
      localStorage.removeItem("loggedInUser");
      window.location.href = "index.html";
    });
  }
});


