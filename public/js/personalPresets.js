$('#personaliseForm').change(function () {
    var personalPreset = document.getElementById("canvasPresets");
    var personalPresetValue = personalPreset.options[personalPreset.selectedIndex].value;

    console.log(personalPresetValue);
    $.getJSON("https://api.mlab.com/api/1/databases/personalisar/collections/personalcanvas?apiKey=QcMYUxzSPh1UFvwhGMNJHciyVqHemZmC", function (json) {
        for (var i = 0; i < json.length; i++) {

            var nameofDesign = json[i].nameOfDesign;
            if (nameofDesign == personalPresetValue) {
                console.log("test");
                $("#personaliseForm").trigger("change");
                document.getElementById("mugJscolor").value = json[i].modelColour;

            }
            //console.log("JSON Data: " + json[i].nameOfDesign);

        }

    });

});