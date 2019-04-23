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

		//personalised overlay form checking for changes
		$('#personaliseForm').change(function() {
			this.canvas = document.getElementById('canvas');
			this.ctx = canvas.getContext('2d');

			//Variables for Canvas
			var colorPicker = document.getElementById('mugJscolor');
			var textColorPicker = document.getElementById('textJscolor');
			var textColorPickerValue = textColorPicker.style.backgroundColor;
			var colorPickerValue = colorPicker.style.backgroundColor;
			var personalisedTxt = document.getElementById('personaliseTxt').value;
			console.log('test32' + colorPickerValue);
			//Background Color
			this.ctx.fillStyle = colorPickerValue;
			this.ctx.fillRect(0, 0, 2448, 800);

			//Image Canvas
			console.log(url);
			var img = new Image();
			var canvasImage = document.getElementById('image');
			img.onload = function() {
				this.canvas = document.getElementById('canvas');
				this.ctx = canvas.getContext('2d');
				if (url == 'cushion') {
					this.ctx.drawImage(this, 1100, 400, 480 / 2, 480 / 5);
				}
				if (url == 'mug') {
					this.ctx.drawImage(
						/*image src */ this,
						/*image srcX */ 0,
						/*image srcY */ 150,
						/*image srcWidth */ 480,
						/*image srcHeight */ 480,
						/*image canvasX */ 300,
						/*image canvasY */ 110,
						/*image canvasWidth */ 480,
						/*image canvasHeight */ 480
					);
				}
			};
			if (canvasImage.files[0] != undefined) {
				img.src = URL.createObjectURL(canvasImage.files[0]);
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

			//Font Size
			var fontSize = document.getElementById('fontSize').value;
			console.log(fontSize);
			//Font Canvas
			this.ctx.fillStyle = textColorPickerValue;
			if (url == 'cushion') {
				this.ctx.font = fontSize + 'px' + ' Arial';
				this.ctx.fillText(personalisedTxt, 1190, 525);
			}
			if (url == 'mug') {
				this.ctx.font = fontSize * 4 + 'px' + ' Arial';
				this.ctx.fillText(personalisedTxt, 500, 700);
			}
		});
	}
});
