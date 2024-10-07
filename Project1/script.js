window.onload = () => {
      main(); 
};



let div = null;



function main() {
  const root = document.getElementById("root");
  const btn = document.getElementById("btn");
  const output = document.getElementById("output");
  const copy = document.getElementById("copy");
  const output2 = document.getElementById("output2");
  const copy2 = document.getElementById("copy2");
  

  btn.addEventListener("click", function () {
    const color = generateDecimal()
    const bgColor = generateHexColor(color);
    const RgbColor = generateRgbColor(color);
    root.style.backgroundColor = `#${bgColor}`;
    
    output.value=bgColor.toUpperCase()
    output2.value =RgbColor
  });
  copy.addEventListener("click", function () {
    navigator.clipboard.writeText(output.value);
    if (div!=null) {
        div.remove();
        div=null;
    }
    generateTostMassage(`#${output.value} Copied`);
  });
  copy2.addEventListener("click", function () {
    navigator.clipboard.writeText(output2.value);
    if (div!=null) {
        div.remove();
        div=null;
    }
    generateTostMassage(`#${output2.value} Copied`);
  });
  output.addEventListener('keyup', function (e) {
    const color = e.target.value;
    if (color) {
        output.value=color.toUpperCase()
        if (isValidHex(color)) {
      root.style.backgroundColor = `#${color}`;
      output2.value = HexToRgb(color);
    }
      
         if (div!=null) {
        div.remove();
        div=null;
        }  
        generateTostMassage("Correct hexadecimal color code:", color);
  
    }else {
      if (div!=null) {
        div.remove();
        div=null;
        }
      generateTostMassage("Invalid hexadecimal color code:",color);
    }
  });
}


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

function generateTostMassage(msg){
     div = document.createElement("div")
    div.innerText = msg; 
    div.className ="tost-massage tost-massage-in"
    div.addEventListener("click",function() {
        div.classList.remove("tost-massage-in");
        div.classList.add("tost-massage-out")
        div.addEventListener("animationend",function(){
            div.remove();
            div=null;
        })

    })
    document.body.appendChild(div);
    
}
function HexToRgb(hex) {
    const red = parseInt(hex.slice(0, 2),16);
    const green = parseInt(hex.slice(2, 4),16);
    const blue = parseInt(hex.slice(4),16);
    return`rgb(${red},${green},${blue})`
}

 function isValidHex (color) {
    if (color.length!==6){
        return false;
    }            
    
    return /^[0-9A-Fa-f]{6}$/i.test(color);
           
} 