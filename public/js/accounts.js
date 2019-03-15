var accountIcon = document.getElementById("accountIcon");
var closeForm = document.getElementById("closeForm");
var mainArea = document.getElementById("main");

  $(accountIcon).click(function(){
    console.log("Open");
    var accountLoginForm = document.getElementById("accountRegisterForm");
    accountLoginForm.style = "display:block";
  });

  $(closeForm).click(function(){
    console.log("Close");
    var accountLoginForm = document.getElementById("accountRegisterForm");
    accountLoginForm.style = "display:none";
  });

  $(mainArea).click(function(){
    var accountLoginForm = document.getElementById("accountRegisterForm");
    accountLoginForm.style = "display:none";
  });
  

