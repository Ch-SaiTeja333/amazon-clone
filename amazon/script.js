const imgSliders=document.querySelectorAll('.image-sliders ul img');
const lefttoright=document.querySelector('.left-button');
const righttoleft=document.querySelector('.right-button');
let n =0 ;
function handleSlider() {
   for(let i=0 ; i< imgSliders.length ; i++ ) {
        imgSliders[i].style.display='none';
    }
    imgSliders[n].style.display='block';
}
handleSlider();
lefttoright.addEventListener('click',(ele)=>{
    if(n === imgSliders.length-1) n=0;
    else n+=1;
    handleSlider();
})

righttoleft.addEventListener('click',(e) =>{
    if(n > 0 ) n=n-1;
    else n=imgSliders.length -1;
    handleSlider();
    // console.log("right to left")
})

