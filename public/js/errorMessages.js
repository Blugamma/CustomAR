var closeForm = document.getElementById("closeForm");
var mainArea = document.getElementById("main");
var loginTitle = document.getElementById("loginTitle");
var registerTitle = document.getElementById("registerTitle");
var accountLoginForm = document.getElementById("accountForm");
var registerForm = document.getElementById("registerInputs");
var loginForm = document.getElementById("loginInputs");

function getCookie(name)
{
  var re = new RegExp(name + "=([^;]+)");
  var value = re.exec(document.cookie);
  return (value != null) ? unescape(value[1]) : null;
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

var passwordErrorCookie = getCookie('passwordError');
var emailErrorCookie = getCookie('emailError');
var emailRegErrorCookie = getCookie('emailRegError');

    

var socket = io.connect('/');
  socket.on('passwordLoginError', function(data) {
    if (passwordErrorCookie == "true"){
      var loginTitle = document.getElementById("loginTitle");
      var registerTitle = document.getElementById("registerTitle");
      var accountLoginForm = document.getElementById("accountForm");
      var registerForm = document.getElementById("registerInputs");
      var loginForm = document.getElementById("loginInputs");
      var passwordLoginError = document.getElementById("passwordLoginError");
       
        accountLoginForm.style = "display:block";
        registerForm.style = "display:none";
        loginForm.style = "display:block;"
        loginTitle.style = "background-color: #38aa82; color: white;";
        registerTitle.style = "background-color: none; color: #38aa82;";
        passwordLoginError.innerHTML = data.message;
        setCookie('usernameError', 'true', 365);
    }

    if (passwordErrorCookie == "false"){
      var passwordLoginError = document.getElementById("passwordLoginError");
      passwordLoginError.innerHTML = "";
    }
  });

    socket.on('emailLoginError', function(data) {
      if (emailErrorCookie == "true"){
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
          emailLoginError.innerHTML = data.message ;
          setCookie('passwordError', 'true', 365);
      }

      if (emailErrorCookie == "false"){
        var emailLoginError = document.getElementById("emailLoginError");
        emailLoginError.innerHTML = "";
        emailRegError();
      }
    
  });

  
function emailRegError(){
    socket.on('emailRegError', function(data) {
        if (emailRegErrorCookie == "true"){
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
            emailRegError.innerHTML = data.message ;
            
        }
      
        if (emailRegErrorCookie == "false"){
          var emailRegError = document.getElementById("emailRegError");
          emailRegError.innerHTML = "";
        }
      
      });
}
