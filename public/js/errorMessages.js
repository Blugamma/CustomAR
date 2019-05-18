//Element variables
var closeForm = document.getElementById('closeForm');
var mainArea = document.getElementById('main');
var loginTitle = document.getElementById('loginTitle');
var registerTitle = document.getElementById('registerTitle');
var accountLoginForm = document.getElementById('accountForm');
var registerForm = document.getElementById('registerInputs');
var loginForm = document.getElementById('loginInputs');

//Cookie varables
var passwordErrorCookie = getCookie('passwordError');
var emailErrorCookie = getCookie('emailError');
var emailRegErrorCookie = getCookie('emailRegError');

//When the password is incorrect it will show an error message
if (passwordErrorCookie == 'true') {
	var loginTitle = document.getElementById('loginTitle');
	var registerTitle = document.getElementById('registerTitle');
	var accountLoginForm = document.getElementById('accountForm');
	var registerForm = document.getElementById('registerInputs');
	var loginForm = document.getElementById('loginInputs');
	var passwordLoginError = document.getElementById('passwordLoginError');

	console.log(accountLoginForm);
	accountLoginForm.style.display = 'block';
	registerForm.style = 'display:none';
	loginForm.style = 'display:block;';
	loginTitle.style = 'background-color: #38aa82; color: white;';
	registerTitle.style = 'background-color: none; color: #38aa82;';
	passwordLoginError.innerHTML = 'Password is incorrect!';
	setCookie('usernameError', 'true', 365);
} else {
	//When the password is correct it will remove the error message
	var passwordLoginError = document.getElementById('passwordLoginError');
	passwordLoginError.innerHTML = '';
}

//When the email doesn't exist when logging in it will display an error message
if (emailErrorCookie == 'true') {
	var loginTitle = document.getElementById('loginTitle');
	var registerTitle = document.getElementById('registerTitle');
	var accountLoginForm = document.getElementById('accountForm');
	var registerForm = document.getElementById('registerInputs');
	var loginForm = document.getElementById('loginInputs');
	var emailLoginError = document.getElementById('emailLoginError');

	accountLoginForm.style = 'display:block';
	registerForm.style = 'display:none';
	loginForm.style = 'display:block;';
	loginTitle.style = 'background-color: #38aa82; color: white;';
	registerTitle.style = 'background-color: none; color: #38aa82;';
	emailLoginError.innerHTML = "Account doesn't exist!";
	setCookie('passwordError', 'false', 365);
}

//When logging in and the email is correct it will remove the error message
if (emailErrorCookie == 'false') {
	var emailLoginError = document.getElementById('emailLoginError');
	emailLoginError.innerHTML = '';
}

//When an email is entered incorrectly or is not found in the database it will display an error message
if (emailRegErrorCookie == 'true') {
	var loginTitle = document.getElementById('loginTitle');
	var registerTitle = document.getElementById('registerTitle');
	var accountLoginForm = document.getElementById('accountForm');
	var registerForm = document.getElementById('registerInputs');
	var loginForm = document.getElementById('loginInputs');
	var emailRegError = document.getElementById('emailRegError');

	accountLoginForm.style = 'display:block';
	registerForm.style = 'display:block';
	loginForm.style = 'display:none;';
	loginTitle.style = 'background-color: none; color: #38aa82;';
	registerTitle.style = 'background-color: #38aa82; color: white;';
	emailRegError.innerHTML = data.message;
}

//When an email gets entered in correctly it removes and error messages
if (emailRegErrorCookie == 'false') {
	var emailRegError = document.getElementById('emailRegError');
	emailRegError.innerHTML = '';
}
