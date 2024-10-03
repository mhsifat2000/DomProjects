window.onload = () => {
      main(); 
};
let div = null;

function main() {
  const root = document.getElementById("root");
  const btn = document.getElementById("btn");
  const output = document.getElementById("output");
  const copy = document.getElementById("copy");

  btn.addEventListener("click", function () {
    const bgColor = generateRgbColor();
    root.style.backgroundColor = bgColor;
    output.value=bgColor;
  });
  copy.addEventListener("click", function () {
    navigator.clipboard.writeText(output.value);
    if (div!=null) {
        div.remove();
        div=null;
    }
    generateTostMassage(`${output.value} Copied`);
  });
}

function generateRgbColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
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