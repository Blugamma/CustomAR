//Variables
var accountIcon = document.getElementById('accountIcon');
var closeForm = document.getElementById('closeForm');
var mainArea = document.getElementById('main');
var loginTitle = document.getElementById('loginTitle');
var registerTitle = document.getElementById('registerTitle');
var accountLoginForm = document.getElementById('accountForm');
var registerForm = document.getElementById('registerInputs');
var loginForm = document.getElementById('loginInputs');

//Opens the login/register form
$(accountIcon).click(function() {
	console.log('Open');
	accountLoginForm.style = 'display:block';
});

//when the user clicks the cross it closes the login/register form
$(closeForm).click(function() {
	console.log('Close');
	accountLoginForm.style = 'display:none';
});

//when the user clicks the main body it will close the login/register form
$(mainArea).click(function() {
	accountLoginForm.style = 'display:none';
});

//When the login title is clicked it will display the login form
$(loginTitle).click(function() {
	registerForm.style = 'display:none';
	loginForm.style = 'display:block;';
	loginTitle.style = 'background-color: #38aa82; color: white;';
	registerTitle.style = 'background-color: none; color: #38aa82;';
});

//when the register title is clicked it will display the register form
$(registerTitle).click(function() {
	registerForm.style = 'display:block ';
	loginForm.style = 'display:none;';
	loginTitle.style = 'background-color:none; color:#38aa82;';
	registerTitle.style = 'background-color: #38aa82; color: white;';
});

//getting a cooking value from a cookie called login state
var loginState = getCookie('loginState');

//if the user is logged in it will load this
if (loginState == 'true') {
	console.log('logged in');
	var loginMessage = document.getElementById('loginMessage');
	var accountIcon = document.getElementById('accountIcon');
	accountIcon.innerHTML = '<a href="/logout"><i class="fas fa-sign-out-alt"></i></a>';
	$(accountIcon).click(function() {
		accountLoginForm.style = 'display:none';
	});
} else {
	//When the user is logged out it will load this
	console.log('logged out');
	var loginMessage = document.getElementById('loginMessage');
	var accountIcon = document.getElementById('accountIcon');
	accountIcon.innerHTML = '<i class="fas fa-user-circle"></i>';
	$(accountIcon).click(function() {
		console.log('Open');
		accountLoginForm.style = 'display:block';
	});
}
