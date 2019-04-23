if (loginState == 'true') {
	$('#canvasPresets').change(function() {
		var personalPreset = document.getElementById('canvasPresets');
		var personalPresetValue = personalPreset.options[personalPreset.selectedIndex].value;
		console.log(personalPresetValue);

		$.getJSON(presetLink, function(json) {
			for (var i = 0; i < json.length; i++) {
				var nameofDesign = json[i].nameOfDesign;
				if (nameofDesign == personalPresetValue) {
					console.log('test');
					console.log(json[i]);
					//Change model colour
					document.getElementById('mugJscolor').value = json[i].modelColour;
					document.getElementById('mugJscolor').style = 'background-color: #' + json[i].modelColour + ';';
					//Change Personalised Text
					document.getElementById('personaliseTxt').value = json[i].personalText;
					//Change Text Colour
					document.getElementById('textJscolor').value = json[i].textColour;
					document.getElementById('textJscolor').style = 'background-color: #' + json[i].textColour + ';';

					//Change FontSize
					document.getElementById('fontSize').value = json[i].fontSize;

					$('#image').trigger('change');
					$('#mugJscolor').trigger('change');
					$('#personalTextMenu').trigger('change');
				}

				//console.log("JSON Data: " + json[i].nameOfDesign);
			}
		});
	});
}
