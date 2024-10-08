//Globals
let tostContainar = null;
const defaultColor = {
    red: 221,
    green: 222,
    blue: 238,
}

//Onload Handeler
window.onload = () => {
      main(); 
      updateColorCodeToDom(defaultColor);
};

//Main or boot function 
function main() {
//domRefarance
  const generateRandomColorBtn = document.getElementById("generate-random-color");
  const colorModeHexInp = document.getElementById("input-hex");
  const copyToClipboard = document.getElementById("copy-to-clipboard");
  const colorSliderRed =  document.getElementById("color-slider-red");
  const colorSliderGreen =  document.getElementById("color-slider-green");
  const colorSliderBlue = document.getElementById("color-slider-blue");
  
 

//eventListoner
  generateRandomColorBtn.addEventListener("click", handelRandomColorBtn);
  colorModeHexInp.addEventListener("keyup", inpColorHandeler);
       
  colorSliderRed.addEventListener("change",handelColorSliders(colorSliderRed,colorSliderGreen,colorSliderBlue));
  
 colorSliderGreen.addEventListener("change",handelColorSliders(colorSliderRed,colorSliderGreen,colorSliderBlue));
 colorSliderBlue.addEventListener("change",handelColorSliders(colorSliderRed,colorSliderGreen,colorSliderBlue))  ; 
  
copyToClipboard.addEventListener("click", copyToClipBordHandeler);
}
//main function end

//Event Handeler
function handelRandomColorBtn() {
    const color = generateDecimal()
    updateColorCodeToDom(color)
  }
  
function inpColorHandeler(e){
      const hexColor = e.target.value;
      if (hexColor) {
          this.value = hexColor.toUpperCase();
      }
      if (isValidHex(hexColor)) {
          const color = HexToDecimalColor(hexColor);
          updateColorCodeToDom(color);
          
      }
}


function handelColorSliders(colorSliderRed,colorSliderGreen,colorSliderBlue){
      return function(){
          const color = {
          red:parseInt(colorSliderRed.value),
          green:parseInt(colorSliderGreen.value),
          blue:parseInt(colorSliderBlue.value)
      }
      updateColorCodeToDom(color);
      }
      
  }

//Dom Handeler 
function generateTostMassage(msg){
     tostContainar = document.createElement("div")
    tostContainar.innerText = msg; 
    tostContainar.className ="toast-message toast-message-slide-in"
    tostContainar.addEventListener("click",function() {
        tostContainar.classList.remove("toast-message-slide-in");
        tostContainar.classList.add("toast-message-slide-out")
        tostContainar.addEventListener("animationend",function(){
            tostContainar.remove();
            tostContainar=null;
        })

    })
    document.body.appendChild(tostContainar);    
}

function  getChekedValueFromRadios(nodes) {
    let cheakedValue = null;
    for (i = 0; i < nodes.length; i++) {
        if (nodes[i].checked) {
            cheakedValue = nodes[i].value;
            break;
        }
    }
    return cheakedValue;
}


function  updateColorCodeToDom(color) {
    const hexColor = generateHexColor(color)
    const rgbColor = generateRgbColor(color);
     document.getElementById("color-display").style.background = `#${hexColor}`;
     document.getElementById("input-hex").value = hexColor.toUpperCase();
     document.getElementById("input-rgb").value = rgbColor;
     
     
     document.getElementById("color-slider-red").value = color.red;
     document.getElementById("color-slider-red-label").innerText = color.red;
     document.getElementById("color-slider-green").value = color.green;
     document.getElementById("color-slider-green-label").innerText = color.green;
     document.getElementById("color-slider-blue").value = color.blue;
     document.getElementById("color-slider-blue-label").innerText = color.blue;
}


function copyToClipBordHandeler(){
    const colorModeRadios = document.getElementsByName("color-mode");
  const mode = getChekedValueFromRadios(colorModeRadios);
 
 
 if (mode == null){
     throw new error("Invalid Radio")
 }
 
 if (tostContainar !== null) {
     tostContainar.remove();
     tostContainar = null;
 }
 if (mode == "hex") {
  const displayHexColor = document.getElementById("input-hex").value;
   if (displayHexColor && isValidHex(displayHexColor)) {
       navigator.clipboard.writeText(`#${displayHexColor}`);
       generateTostMassage(`#${displayHexColor} copied.`)
   }
   else{
      alert("Invalid Hex Code!") 
   }
 }
 else{
     const displayRgbColor = document.getElementById("input-rgb").value;
     
     if(displayRgbColor){
         navigator.clipboard.writeText(`${displayRgbColor}`);
         generateTostMassage(`${displayRgbColor} copied.`)
     }
     else{
         alert("Invalid RGB Code!");
     }   
 }
}





//utilitys

function generateDecimal() {
    const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  return{
      red,
      green,
      blue,
  }
}

function generateHexColor({red,green,blue}) {
  function toColor(value) {
    const hex = value.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  }
  return `${toColor(red)}${toColor(green)}${toColor(blue)}`;
}

function generateRgbColor({red,green,blue}) {

    return `rgb(${red},${green},${blue})`
}

function HexToDecimalColor(hex) {
    const red = parseInt(hex.slice(0, 2),16);
    const green = parseInt(hex.slice(2, 4),16);
    const blue = parseInt(hex.slice(4),16);
    return {
        red,
        green,
        blue
    }
}

 function isValidHex(color) {
    if (color.length!==6){
        return false;
    }            
    
    return /^[0-9A-Fa-f]{6}$/i.test(color);
           
} 
