//Model Colour Canvas
var modelColourCanvas = document.createElement('canvas');
modelColourCanvas.id = 'modelColourCanvas';
modelColourCanvas.width = 2448;
modelColourCanvas.height = 800;
var modelColourCtx = modelColourCanvas.getContext('2d');

//Image Canvas
var imageCanvas = document.createElement('canvas');
imageCanvas.id = 'imageCanvas';
imageCanvas.width = 480;
imageCanvas.height = 480;
var imageCtx = imageCanvas.getContext('2d');

//Font Canvas
var fontCanvas = document.createElement('canvas');
fontCanvas.id = 'fontCanvas';
fontCanvas.width = 480;
fontCanvas.height = 60;
var fontCtx = fontCanvas.getContext('2d');

//Recieves the current URL
function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
		vars[key] = value;
	});
	return vars;
}

//Gets the model parameter from the current URL
var url = getUrlVars()['model'];
//canvas customisation
AFRAME.registerComponent('start', {
	init: function() {
		this.canvas = document.getElementById('canvas');
		this.canvas.width = 2448;
		this.canvas.height = 800;
		this.ctx = this.canvas.getContext('2d');

		//Fix for blurry text on the canvas
		this.devicePixelRatio = window.devicePixelRatio || 1;
		this.backingStoreRatio =
			this.ctx.webkitBackingStorePixelRatio ||
			this.ctx.mozBackingStorePixelRatio ||
			this.ctx.msBackingStorePixelRatio ||
			this.ctx.oBackingStorePixelRatio ||
			this.ctx.backingStorePixelRatio ||
			1;

		this.ratio = this.devicePixelRatio / this.backingStoreRatio;
		if (this.devicePixelRatio !== this.backingStoreRatio) {
			var oldWidth = this.canvas.width;
			var oldHeight = this.canvas.height;

			this.canvas.width = oldWidth * this.ratio;
			this.canvas.height = oldHeight * this.ratio;

			this.canvas.style.width = oldWidth + 'px';
			this.canvas.style.height = oldHeight + 'px';

			this.ctx.scale(this.ratio, this.ratio);
		}
		this.ctx.fillStyle = '#FFFFFF';
		this.ctx.fillRect(0, 0, 2448, 800);
		//When a new background colour is applied it will run this code
		$('#mugJscolor').change(function() {
			this.canvas = document.getElementById('canvas');
			this.ctx = canvas.getContext('2d');
			var colorPicker = document.getElementById('mugJscolor');
			var colorPickerValue = colorPicker.style.backgroundColor;
			modelColourCtx.fillStyle = colorPickerValue;
			modelColourCtx.fillRect(0, 0, 2448, 800);
			$('#personalTextMenu').change();
			if (url == 'cushion') {
				this.ctx.drawImage(modelColourCanvas, 0, 0, 2448, 800);
				this.ctx.drawImage(fontCanvas, 1100, 480, 480, 60);
				this.ctx.drawImage(imageCanvas, 1100, 400, 240, 220);
			}
			if (url == 'mug') {
				this.ctx.drawImage(modelColourCanvas, 0, 0, 2448, 800);
				this.ctx.drawImage(fontCanvas, 300, 610, 480, 60);
				this.ctx.drawImage(imageCanvas, 300, 110, 480, 480);
			}
		});

		//When a new image is uploaded it will generate the image onto the canvas
		$('#imageMenu').change(function() {
			this.canvas = document.getElementById('canvas');
			this.ctx = canvas.getContext('2d');
			//Image Canvas
			console.log(url);
			var img = new Image();
			var canvasImage = document.getElementById('image');
			img.onload = function() {
				this.canvas = document.getElementById('canvas');
				this.ctx = this.canvas.getContext('2d');

				if (url == 'cushion') {
					imageCtx.drawImage(this, 0, 0, 480, 220);
					this.ctx.drawImage(modelColourCanvas, 0, 0, 2448, 800);
					this.ctx.drawImage(fontCanvas, 1100, 480, 480, 60);
					this.ctx.drawImage(imageCanvas, 1100, 400, 240, 220);
				}
				if (url == 'mug') {
					imageCtx.drawImage(
						/*image src */ this,
						/*image canvasX */ 0,
						/*image canvasY */ 0,
						/*image canvasWidth */ 480,
						/*image canvasHeight */ 480
					);
					this.ctx.drawImage(modelColourCanvas, 0, 0, 2448, 800);
					this.ctx.drawImage(fontCanvas, 300, 610, 480, 60);
					this.ctx.drawImage(imageCanvas, 300, 110, 480, 480);
				}
			};
			if (canvasImage.files[0] != undefined) {
				$('#imageCropBtn').click(function() {
					$('#imageUpload').css('pointer-events', 'auto');
					$('#imageUpload').attr('data-click-state', 0);
					$('#imageCropper')
						.croppie('result', {
							type: 'base64',
							format: 'jpeg',
							quality: 0.8
						})
						.then(function(resp) {
							img.src = resp;
							var imageBase64 = document.getElementById('imageBase64');
							imageBase64.value = '';
							imageBase64.value = resp;
						});
					$('#imageCropper').croppie('destroy');
					$('#imageMenu').css('display', 'none');
				});
			} else {
				console.log('image not selected');
			}
			//When the user is logged in the pre-set dropdown gets populated with the designs the user has created
			if (loginState == 'true') {
				var personalPreset = document.getElementById('canvasPresets');
				var personalPresetValue = personalPreset.options[personalPreset.selectedIndex].value;
				$.getJSON(presetLink, function(json) {
					for (var i = 0; i < json.length; i++) {
						var nameofDesign = json[i].nameOfDesign;
						if (nameofDesign == personalPresetValue) {
							img.src = json[i].image;
							console.log(json[i].image);
						}
					}
				});
			}
		});

		//When a change is made in the personal text menu it will run this code.
		$('#personalTextMenu').change(function() {
			this.canvas = document.getElementById('canvas');
			this.ctx = canvas.getContext('2d');

			var fontSize = document.getElementById('fontSize').value;
			var colorPicker = document.getElementById('mugJscolor');
			var colorPickerValue = colorPicker.style.backgroundColor;
			var textColorPicker = document.getElementById('textJscolor');
			var textColorPickerValue = textColorPicker.style.backgroundColor;
			var personalisedTxt = document.getElementById('personaliseTxt').value;
			fontCtx.fillStyle = colorPickerValue;
			fontCtx.fillRect(0, 0, 480, 60);
			//Font Canvas
			fontCtx.fillStyle = textColorPickerValue;
			if (url == 'cushion') {
				fontCtx.font = fontSize + 'px' + ' Arial';
				fontCtx.textAlign = 'center';
				fontCtx.fillText(personalisedTxt, 120, 50);
				this.ctx.drawImage(modelColourCanvas, 0, 0, 2448, 800);
				this.ctx.drawImage(fontCanvas, 1100, 480, 480, 60);
				this.ctx.drawImage(imageCanvas, 1100, 400, 240, 220);
			}
			if (url == 'mug') {
				fontCtx.font = fontSize * 2 + 'px' + ' Arial';
				fontCtx.textAlign = 'center';
				//fontCtx.fillText(personalisedTxt, 500, 700);
				fontCtx.fillText(personalisedTxt, 240, 50);
				this.ctx.drawImage(modelColourCanvas, 0, 0, 2448, 800);
				this.ctx.drawImage(fontCanvas, 300, 610, 480, 60);
				this.ctx.drawImage(imageCanvas, 300, 110, 480, 480);
			}
		});
	}
});
