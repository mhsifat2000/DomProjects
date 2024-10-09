//Globals
let tostContainar = null;
const defaultColor = {
    red: 221,
    green: 222,
    blue: 238,
};

const defaultPresetColors = [
	'#ffcdd2',
	'#f8bbd0',
	'#e1bee7',
	'#ff8a80',
	'#ff80ab',
	'#ea80fc',
	'#b39ddb',
	'#9fa8da',
	'#90caf9',
	'#b388ff',
	'#8c9eff',
	'#82b1ff',
	'#03a9f4',
	'#00bcd4',
	'#009688',
	'#80d8ff',
	'#84ffff',
	'#a7ffeb',
	'#c8e6c9',
	'#dcedc8',
	'#f0f4c3',
	'#b9f6ca',
	'#ccff90',
	'#ffcc80',
];
const customColors = [];

const copySound = new Audio('./audio/copy.mp3');

const hexCodeCopied = new Audio('./audio/hexCodeCopied.mp3');

const rgbCodeCopied = new Audio('./audio/RgbCodeCopied.mp3');

const randomCodeGenerated =new Audio('./audio/RandomCodeGenerated.mp3');

const hexModeSound = new Audio('./audio/hexMode.mp3');

const rgbModeSound = new Audio('./audio/rgbMode.mp3');

const colorModeRadios = document.getElementsByName("color-mode");

//Onload Handeler
window.onload = () => {
      main(); 
      updateColorCodeToDom(defaultColor);
      displayColorBoxes(document.getElementById("preset-colors"),defaultPresetColors)
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

  const colorPresetParent = document.getElementById("preset-colors");
  
  const saveToCustomBtn = document.getElementById("save-to-custom");
  
  const colorCustomParent = document.getElementById("custom-colors");
   

//eventListoner
  generateRandomColorBtn.addEventListener("click", handelRandomColorBtn);
 
  colorModeHexInp.addEventListener("keyup", inpColorHandeler);
       
  colorSliderRed.addEventListener("change",handelColorSliders(colorSliderRed,colorSliderGreen,colorSliderBlue));
  
 colorSliderGreen.addEventListener("change",handelColorSliders(colorSliderRed,colorSliderGreen,colorSliderBlue));

 colorSliderBlue.addEventListener("change",handelColorSliders(colorSliderRed,colorSliderGreen,colorSliderBlue))  ; 
  
copyToClipboard.addEventListener("click", copyToClipBordHandeler);

colorPresetParent.addEventListener("click",function (event) {
    const chield = event.target;
    if(chield.className == 'color-box'){
       navigator.clipboard.writeText(chield.getAttribute('data-color'));
       copySound.volium =0.2;
       copySound.play();
    }            
});

colorCustomParent.addEventListener("click",function (event) {
    const chield = event.target;
    if(chield.className == 'color-box'){
       navigator.clipboard.writeText(chield.getAttribute('data-color'));
       copySound.volium =0.2;
       copySound.play();
    }            
});


saveToCustomBtn.addEventListener("click",handelSaveToCustomBtn(colorCustomParent,colorModeHexInp));
};

//main function end

//Event Handeler
function handelRandomColorBtn() {
    const color = generateDecimal()
    updateColorCodeToDom(color)
    randomCodeGenerated.volium = 0.2;
    randomCodeGenerated.play();
};
  
function inpColorHandeler(e){
      const hexColor = e.target.value;
      if (hexColor) {
          this.value = hexColor.toUpperCase();
      }
      if (isValidHex(hexColor)) {
          const color = HexToDecimalColor(hexColor);
          updateColorCodeToDom(color);
          
      }
};


function handelColorSliders(colorSliderRed,colorSliderGreen,colorSliderBlue){
      return function(){
          const color = {
          red:parseInt(colorSliderRed.value),
          green:parseInt(colorSliderGreen.value),
          blue:parseInt(colorSliderBlue.value)
      }
      updateColorCodeToDom(color);
      }
};
  
  
function handelSaveToCustomBtn(colorCustomParent,inputHex) {  
   return function() {
       customColors.push(`#${inputHex.value}`);
   removeChieldren(colorCustomParent);
            displayColorBoxes(colorCustomParent,customColors);
   }
};

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
});
    document.body.appendChild(tostContainar);    
};

function  getChekedValueFromRadios(nodes) {
    let cheakedValue = null;
    for (i = 0; i < nodes.length; i++) {
        if (nodes[i].checked) {
            cheakedValue = nodes[i].value;
            break;
        }
    }
    return cheakedValue;
};


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
};


function copyToClipBordHandeler(){
  
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
       hexCodeCopied.volium =0.2;
       hexCodeCopied.play();
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
         rgbCodeCopied.volium =0.2;
         rgbCodeCopied.play();
     }
     else{
         alert("Invalid RGB Code!");
     }   
 }
};

function generateColorBox(color) {
    const div = document.createElement("div");
    div.className = "color-box";
    div.style.backgroundColor = color;
    div.setAttribute('data-color',color);
    return div;
};

function displayColorBoxes(parent, colors) {
	colors.forEach((color) => {
		const colorBox = generateColorBox(color);
		parent.appendChild(colorBox);
	});
};

function removeChieldren(parent) {
    let child = parent.lastElementChild;
    while (child) {
        parent.removeChild(child);
        child = parent.lastElementChild;
    }    
};

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
};

function generateHexColor({red,green,blue}) {
  function toColor(value) {
    const hex = value.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  }
  return `${toColor(red)}${toColor(green)}${toColor(blue)}`;
};

function generateRgbColor({red,green,blue}) {

    return `rgb(${red},${green},${blue})`
};

function HexToDecimalColor(hex) {
    const red = parseInt(hex.slice(0, 2),16);
    const green = parseInt(hex.slice(2, 4),16);
    const blue = parseInt(hex.slice(4),16);
    return {
        red,
        green,
        blue
    }
};

 function isValidHex(color) {
    if (color.length!==6){
        return false;
    }            
    
    return /^[0-9A-Fa-f]{6}$/i.test(color);       
 };
