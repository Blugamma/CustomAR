/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  
  /* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }

    //Mug canvas personalisation
    AFRAME.registerComponent('start', {
      init: function () {
          this.canvas = document.getElementById('canvas');
          this.ctx = this.canvas.getContext("2d");
    
          //Fix for blurry text on the canvas
          this.devicePixelRatio = window.devicePixelRatio || 1;
          this.backingStoreRatio = this.ctx.webkitBackingStorePixelRatio ||
          this.ctx.mozBackingStorePixelRatio ||
          this.ctx.msBackingStorePixelRatio ||
          this.ctx.oBackingStorePixelRatio ||
          this.ctx.backingStorePixelRatio || 1;
    
          this.ratio = this.devicePixelRatio / this.backingStoreRatio;
          if (this.devicePixelRatio !== this.backingStoreRatio){
              var oldWidth = this.canvas.width;
              var oldHeight = this.canvas.height;
    
              this.canvas.width = oldWidth * this.ratio;
              this.canvas.height = oldHeight * this.ratio;
    
              this.canvas.style.width = oldWidth + 'px';
              this.canvas.style.height = oldHeight + 'px';
    
              this.ctx.scale(this.ratio, this.ratio);
          }
    
          //Defaults for Canvas
          this.ctx.fillStyle = "white";
          this.ctx.fillRect(0, 0, 2448, 800);
          
          this.ctx.fillStyle = "black";
          this.ctx.fillText("Text Here", 40, 100);
    
        
          
          
          
          //personalised overlay form checking for changes
          $("#personaliseForm").change(function() {
            this.canvas = document.getElementById('canvas');
            this.ctx = canvas.getContext("2d");
    
            //Variables for Canvas
            var colorPicker = document.getElementById("mugJscolor");
            var textColorPicker = document.getElementById("textJscolor");
            var textColorPickerValue = textColorPicker.style.backgroundColor;
            var colorPickerValue = colorPicker.style.backgroundColor;
            var personalisedTxt = document.getElementById("personaliseTxt").value;   
           
              
            //Background Color
            this.ctx.fillStyle = colorPickerValue;
            this.ctx.fillRect(0, 0, 2448, 800);
              
            //Image Canvas
            var img = new Image();
            var canvasImage = document.getElementById("image");
            img.onload = function(){
                this.canvas = document.getElementById('canvas');
                this.ctx = canvas.getContext("2d");
                this.ctx.drawImage(this, 70,30, 50, 50);
            }
            if (canvasImage.files[0] != undefined){
                img.src = URL.createObjectURL(canvasImage.files[0]);
            }
            else{
            console.log("image not selected");
            }
              
            
            //Font Size
            var fontSize = document.getElementById("fontSize").value;
           console.log(fontSize);
              
              
             

             
             
              
          

            
              this.ctx.font = fontSize + "px" + " Arial";
              this.ctx.fillStyle = textColorPickerValue;
              this.ctx.fillText(personalisedTxt, 70, 100);
            
            
            //Font Canvas
            
    
              
          });
      }
    });

