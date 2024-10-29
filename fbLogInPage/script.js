const password = document.getElementById('password');
const hideShow = document.getElementById('hide-show');
let State =0;
let value = password.value;
password.addEventListener('focus',() => {
    hideShow.style.display='block'
    hideShow.src ="./hide.svg";  
    handelHideShow ();
}); 



function handelHideShow (){    
hideShow.addEventListener('click',() =>{
       if(State==0) {
       hideShow.src = './show.svg';
       password.type='text';
       State = 1;  
       console.log(value);  
       }
       else if(State==1) {
       hideShow.src = './hide.svg';
       password.type='password';
       State= 0;  
       console.log(value); 
       }
  })
}