var loginState = getCookie('loginState');
if (loginState == 'true') {
	var canvasPreset = document.getElementById('canvasPreset');
	canvasPreset.style = 'display:block';
	var saveDesign = document.getElementById('saveDesign');
	saveDesign.style = 'display:block';
	var NameOfDesign = document.getElementById('nameOfDesign');
	NameOfDesign.style = 'display:block';
} else {
	var loadDesign = document.getElementById('loadDesign');
	loadDesign.style = 'display:none';
	var saveDesign = document.getElementById('saveDesign');
	saveDesign.style = 'display:none';
	$('#overlay2').css('top', '25%');
	$('#overlayToggle').css('top', '40%');
}
var personaliseNow = document.getElementById('personaliseNow');
var canvasForm = document.getElementById('personaliseForm');

var clicked = false;
$(personaliseNow).click(function() {
	if (clicked == false) {
		personaliseNow.innerHTML = 'Hide Personalise Menu';
		canvasForm.style = 'display:block';
		clicked = true;
	} else {
		personaliseNow.innerHTML = 'Show Personalise Menu';
		canvasForm.style = 'diplay:none';
		clicked = false;
	}
});

//Model Colour overlay show/hide
$('#modelColour').click(function() {
	console.log('testjda');
	$('#modelColourMenu').slideToggle('slow');
	$('#presetMenu').css('display', 'none');
	$('#imageMenu').css('display', 'none');
	$('#personalTextMenu').css('display', 'none');
	$('#saveDesignMenu').css('display', 'none');
	$('#imageMenu').css('display', 'none');
	$('#imageUpload').attr('data-click-state', 0);
	$('#imageUpload').css('pointer-events', 'auto');
});

//Load Design overlay show/hide
$('#loadDesign').click(function() {
	$('#presetMenu').slideToggle('slow');
	$('#modelColourMenu').css('display', 'none');
	$('#imageMenu').css('display', 'none');
	$('#personalTextMenu').css('display', 'none');
	$('#saveDesignMenu').css('display', 'none');
	$('#imageMenu').css('display', 'none');
	$('#imageUpload').attr('data-click-state', 0);
	$('#imageUpload').css('pointer-events', 'auto');
});

$('#imageUpload').click(function() {
	$('#imageMenu').slideToggle('slow');
	$('#modelColourMenu').css('display', 'none');
	$('#presetMenu').css('display', 'none');
	$('#personalTextMenu').css('display', 'none');
	$('#saveDesignMenu').css('display', 'none');
});

//Personal Text overlay show/hide
$('#personalText').click(function() {
	$('#personalTextMenu').slideToggle('slow');
	$('#modelColourMenu').css('display', 'none');
	$('#presetMenu').css('display', 'none');
	$('#imageMenu').css('display', 'none');
	$('#saveDesignMenu').css('display', 'none');
	$('#imageMenu').css('display', 'none');
	$('#imageUpload').attr('data-click-state', 0);
	$('#imageUpload').css('pointer-events', 'auto');
});

//Save Design overlay show/hide
$('#saveDesign').click(function() {
	$('#saveDesignMenu').slideToggle('slow');
	$('#modelColourMenu').css('display', 'none');
	$('#presetMenu').css('display', 'none');
	$('#imageMenu').css('display', 'none');
	$('#personalTextMenu').css('display', 'none');
	$('#imageMenu').css('display', 'none');
	$('#imageUpload').attr('data-click-state', 0);
	$('#imageUpload').css('pointer-events', 'auto');
});

//Toggle for opening the main overlay
$('#overlayToggle').click(function() {
	$('#overlay2').animate({ width: 'toggle' }, 350);
	if ($(this).attr('data-click-state') == 1) {
		$(this).attr('data-click-state', 0);
		$(this).css('left', '80px');
		$(this).html('<i class="fas fa-chevron-left"></i>');
		$('#imageUpload').attr('data-click-state', 0);
		$('#imageUpload').css('pointer-events', 'auto');
	} else {
		$(this).attr('data-click-state', 1);
		$(this).css('left', '0px');
		$(this).html('<i class="fas fa-chevron-right"></i>');
		$('#modelColourMenu').css('display', 'none');
		$('#presetMenu').css('display', 'none');
		$('#imageMenu').css('display', 'none');
		$('#personalTextMenu').css('display', 'none');
		$('#saveDesignMenu').css('display', 'none');
		$('#imageMenu').css('display', 'none');
	}
});

//Closes all menus when user clicks on the camera view
$('#aFrameScene').click(function() {
	$('#overlay2').css('display', 'none');
	$('#overlayToggle').attr('data-click-state', 1);
	$('#overlayToggle').css('left', '0px');
	$('#overlayToggle').html('<i class="fas fa-chevron-right"></i>');
	$('#modelColourMenu').css('display', 'none');
	$('#presetMenu').css('display', 'none');
	$('#imageMenu').css('display', 'none');
	$('#personalTextMenu').css('display', 'none');
	$('#saveDesignMenu').css('display', 'none');
	$('#imageMenu').css('display', 'none');
	$('#imageUpload').attr('data-click-state', 0);
	$('#imageUpload').css('pointer-events', 'auto');
});

var readURL = function(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		reader.onload = function(e) {
			var w = $('#imageMenu').width();
			$('#imageCropper').croppie({
				url: e.target.result,
				viewport: { width: 380, height: 380 },
				boundary: { width: w, height: 550 },
				showZoomer: false,
				enableResize: false,
				enableOrientation: true
			});
		};
		reader.readAsDataURL(input.files[0]);
	}
};

$('#image').on('change', function() {
	$('#imageCropper').croppie('destroy');
	readURL(this);
});

$('#imageUpload').on('click', function() {
	if ($(this).attr('data-click-state') == 1) {
		$(this).attr('data-click-state', 0);
		console.log('close');
		$('#image').click();
		$('#imageUpload').css('pointer-events', 'auto');
	} else {
		console.log('open');
		$('#image').click();
		$('#imageUpload').css('pointer-events', 'none');
		$(this).attr('data-click-state', 1);
	}
});
