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
fontCanvas.height = 50;
var fontCtx = fontCanvas.getContext('2d');

function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
		vars[key] = value;
	});
	return vars;
}

var url = getUrlVars()['model'];
//Mug canvas personalisation
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

		//Defaults for Canvas
		this.ctx.fillStyle = 'white';
		this.ctx.fillRect(0, 0, 2448, 800);

		this.ctx.fillStyle = 'black';
		this.ctx.fillText('Text Here', 40, 100);
		$('#mugJscolor').change(function() {
			this.canvas = document.getElementById('canvas');
			this.ctx = canvas.getContext('2d');
			var colorPicker = document.getElementById('mugJscolor');
			var colorPickerValue = colorPicker.style.backgroundColor;
			modelColourCtx.fillStyle = colorPickerValue;
			modelColourCtx.fillRect(0, 0, 2448, 800);
			$('#personalTextMenu').change();
			this.ctx.drawImage(modelColourCanvas, 0, 0, 2448, 800);
			this.ctx.drawImage(fontCanvas, 300, 610, 480, 50);
			this.ctx.drawImage(imageCanvas, 300, 110, 480, 480);
		});

		$('#image').change(function() {
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
					imageCtx.drawImage(this, 1100, 400, 480 / 2, 480 / 5);
				}
				if (url == 'mug') {
					imageCtx.drawImage(
						/*image src */ this,
						/*image canvasX */ 0,
						/*image canvasY */ 0,
						/*image canvasWidth */ 480,
						/*image canvasHeight */ 480
					);
					this.ctx.drawImage(imageCanvas, 300, 110, 480, 480);
				}
			};
			if (canvasImage.files[0] != undefined) {
				$('#imageCropper').attr('src', URL.createObjectURL(canvasImage.files[0]));
				var resize = new Croppie($('#imageCropper')[0], {
					viewport: { width: 480, height: 480 },
					boundary: { width: 600, height: 600 },
					showZoomer: false,
					enableResize: false,
					enableOrientation: true
				});
				$('#imageCropBtn').click(function() {
					resize.result('base64').then(function(dataImg) {
						img.src = dataImg;
					});
				});
			} else {
				console.log('image not selected');
			}

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

			this.ctx.drawImage(modelColourCanvas, 0, 0, 2448, 800);
			this.ctx.drawImage(fontCanvas, 300, 610, 480, 50);
			this.ctx.drawImage(imageCanvas, 300, 110, 480, 480);
		});
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
			fontCtx.fillRect(0, 0, 480, 50);
			//Font Canvas
			fontCtx.fillStyle = textColorPickerValue;
			if (url == 'cushion') {
				fontCtx.font = fontSize + 'px' + ' Arial';
				fontCtx.textAlign = 'center';
				fontCtx.fillText(personalisedTxt, 1190, 525);
			}
			if (url == 'mug') {
				fontCtx.font = fontSize * 2 + 'px' + ' Arial';
				fontCtx.textAlign = 'center';
				//fontCtx.fillText(personalisedTxt, 500, 700);
				fontCtx.fillText(personalisedTxt, 240, 50);
			}

			this.ctx.drawImage(modelColourCanvas, 0, 0, 2448, 800);
			this.ctx.drawImage(fontCanvas, 300, 610, 480, 50);
			this.ctx.drawImage(imageCanvas, 300, 110, 480, 480);
		});
	}
});
