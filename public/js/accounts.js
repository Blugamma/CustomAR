var accountIcon = document.getElementById("accountIcon");
var closeForm = document.getElementById("closeForm");
var mainArea = document.getElementById("main");
var loginTitle = document.getElementById("loginTitle");
var registerTitle = document.getElementById("registerTitle");
var accountLoginForm = document.getElementById("accountForm");
var registerForm = document.getElementById("registerInputs");
var loginForm = document.getElementById("loginInputs");
  
  $(accountIcon).click(function(){
    console.log("Open");
    accountLoginForm.style = "display:block";
  });

  $(closeForm).click(function(){
    console.log("Close");
    accountLoginForm.style = "display:none";
  });

  $(mainArea).click(function(){
    accountLoginForm.style = "display:none";
  });

  $(loginTitle).click(function(){
    registerForm.style = "display:none";
    loginForm.style = "display:block;"
    loginTitle.style = "background-color: #38aa82; color: white;";
    registerTitle.style = "background-color: none; color: #38aa82;";
  });

  $(registerTitle).click(function(){
    registerForm.style = "display:block ";
    loginForm.style = "display:none;"
    loginTitle.style = "background-color:none; color:#38aa82;";
    registerTitle.style = "background-color: #38aa82; color: white;";
  });






function resetMenuState() {
    localStorage.removeItem('menu-state');
}


  

