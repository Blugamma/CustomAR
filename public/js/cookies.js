//Javascript Cookie functions
function getCookie(name) {
	var re = new RegExp(name + '=([^;]+)');
	var value = re.exec(document.cookie);
	return value != null ? unescape(value[1]) : null;
}

function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
	var expires = 'expires=' + d.toUTCString();
	document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}
