var closeForm = document.getElementById("closeForm");
var mainArea = document.getElementById("main");
var loginTitle = document.getElementById("loginTitle");
var registerTitle = document.getElementById("registerTitle");
var accountLoginForm = document.getElementById("accountForm");
var registerForm = document.getElementById("registerInputs");
var loginForm = document.getElementById("loginInputs");

var passwordErrorCookie = getCookie('passwordError');
var emailErrorCookie = getCookie('emailError');
var emailRegErrorCookie = getCookie('emailRegError');

if (passwordErrorCookie == "true") {

  var loginTitle = document.getElementById("loginTitle");
  var registerTitle = document.getElementById("registerTitle");
  var accountLoginForm = document.getElementById("accountForm");
  var registerForm = document.getElementById("registerInputs");
  var loginForm = document.getElementById("loginInputs");
  var passwordLoginError = document.getElementById("passwordLoginError");

  console.log(accountLoginForm);
  accountLoginForm.style.display = "block";
  registerForm.style = "display:none";
  loginForm.style = "display:block;"
  loginTitle.style = "background-color: #38aa82; color: white;";
  registerTitle.style = "background-color: none; color: #38aa82;";
  passwordLoginError.innerHTML = "Password is incorrect!";
  setCookie('usernameError', 'true', 365);
  //socket.emit("unsubscribe", { room: "global" });

} else {
  var passwordLoginError = document.getElementById("passwordLoginError");
  passwordLoginError.innerHTML = "";
}

if (emailErrorCookie == "true") {
  var loginTitle = document.getElementById("loginTitle");
  var registerTitle = document.getElementById("registerTitle");
  var accountLoginForm = document.getElementById("accountForm");
  var registerForm = document.getElementById("registerInputs");
  var loginForm = document.getElementById("loginInputs");
  var emailLoginError = document.getElementById("emailLoginError");

  accountLoginForm.style = "display:block";
  registerForm.style = "display:none";
  loginForm.style = "display:block;"
  loginTitle.style = "background-color: #38aa82; color: white;";
  registerTitle.style = "background-color: none; color: #38aa82;";
  emailLoginError.innerHTML = "Account doesn't exist!";
  setCookie('passwordError', 'false', 365);
}

if (emailErrorCookie == "false") {
  var emailLoginError = document.getElementById("emailLoginError");
  emailLoginError.innerHTML = "";
}

if (emailRegErrorCookie == "true") {
  var loginTitle = document.getElementById("loginTitle");
  var registerTitle = document.getElementById("registerTitle");
  var accountLoginForm = document.getElementById("accountForm");
  var registerForm = document.getElementById("registerInputs");
  var loginForm = document.getElementById("loginInputs");
  var emailRegError = document.getElementById("emailRegError");

  accountLoginForm.style = "display:block";
  registerForm.style = "display:block";
  loginForm.style = "display:none;"
  loginTitle.style = "background-color: none; color: #38aa82;";
  registerTitle.style = "background-color: #38aa82; color: white;";
  emailRegError.innerHTML = data.message;

}

if (emailRegErrorCookie == "false") {
  var emailRegError = document.getElementById("emailRegError");
  emailRegError.innerHTML = "";
}