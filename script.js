const container = document.querySelector('.container');
const btn = document.getElementById('random');
const autoBtn = document.getElementById('Auto');
const stopBtn = document.getElementById('Stop');
let intervalId
window.onload = () =>{
     btn.addEventListener('click',handelBoxes);
     autoBtn.addEventListener('click',handelAuto);
     stopBtn.addEventListener('click',handelStop);
     document.addEventListener('contextmenu', (event) => {
  event.preventDefault();
});

     
}
function RandomRGBColorCode(){
     const randomNumber = () => Math.floor(Math.random()*255)
     const RGBCode = `rgb(${randomNumber()},${randomNumber()},${randomNumber()})`
    return RGBCode;
     
}

function handelBoxes(){
     container.innerHTML='';
     for (i=1;i<=16; i++) {
      const boxes=document.createElement("div");
      const rgb = RandomRGBColorCode()
      boxes.classList.add("box") 
      
      boxes.style.backgroundColor = rgb;
      boxes.innerHTML = `<p class="p">${rgb} <p/>`;
      container.appendChild(boxes);
      boxes.addEventListener('click',copyToClipboard);
      boxes.addEventListener('hover',boxHoverEffect);
     }
}
function handelAuto(){
  intervalId =  setInterval(handelBoxes,500);
  autoBtn.disabled = true;
  stopBtn.disabled = false;
  btn.disabled = true;
}

function handelStop(){
     clearInterval(intervalId);
     autoBtn.disabled = false;
     stopBtn.disabled = true;
     btn.disabled = false;
}


function copyToClipboard(boxes){
  const local = this.innerText
     window.navigator.clipboard.writeText(`${local}`);
     window.alert(`${local} copied!`)
}

function boxHoverEffect(){
     
}
