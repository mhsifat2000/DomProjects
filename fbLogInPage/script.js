const password = document.getElementById('password');
const hideShow = document.getElementById('hide-show');
password.addEventListener('focus',() => {
    hideShow.style.display='block'
    hideShow.src ="./hide.svg";  
    handelHideShow ();
}); 



function handelHideShow (){    
    let State =0;
hideShow.addEventListener('click',() =>{
       if(State==0) {
       hideShow.src = './show.svg';
       password.type='text';
       State = 1;  
       
       }
       else if(State==1) {
       hideShow.src = './hide.svg';
       password.type='password';
       State= 0;  
     }
  })
}
