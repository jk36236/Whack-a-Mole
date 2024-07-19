let scoreH2=document.querySelector('#score');
let timeLeftH2=document.querySelector('#timeLeft');
let startBtn=document.querySelector('#startNewGame');
let pauseBtn=document.querySelector('#pauseGame');
let squares=document.querySelectorAll('.square');//this will be an array
let grid=document.querySelector('.grid');

let gameMusic= new Audio('./Assets/gameMusic.mp3');
let hitMusic= new Audio('./Assets/hitMusic.mp3');

let score=0;
let timeLeft=0;
let hitPosition=null;
let timerId=null;
let randomMoleId=null;


//for randomly placing mole------------------
function randomMole(){
  //removing maole class from squares
  squares.forEach(square =>{
      square.classList.remove('mole');
  })
   //finding position of mole to place it
   let randomSquare=squares[Math.floor(Math.random()*squares.length)];
  randomSquare.classList.add('mole');
  hitPosition=randomSquare.id;
}


//for timeLeft---------------------
function countDown(){
   timeLeft--;
   timeLeftH2.innerText=`Time Left: ${timeLeft}`;

  //  stop everything if timeleft= 0 
   if(timeLeft === 0){
    //to stop the setinterval
     clearInterval(timerId);
     clearInterval(randomMoleId);
     grid.style.display='none';
     gameMusic.pause();
     pauseBtn.style.display='none';
   }
}

//will run on click of startGame btn--------------
function startGame(){
   score=0;
   timeLeft=60;
   scoreH2.innerHTML=`Your Score: 0`;
   timeLeftH2.innerHTML=`Time Left: 60`;
   grid.style.display='flex';
   pauseBtn.style.display='inline-block';
   pauseBtn.innerHTML='Pause';
   gameMusic.play();
   timerId=setInterval(randomMole,1000);
   randomMoleId=setInterval(countDown,1000);
}  


//pause resume game------------------------
function pauseResumeGame(){

  if(pauseBtn.textContent === 'Pause'){
    gameMusic.pause();
    //stop the setinterval
    clearInterval(timerId);
    clearInterval(randomMoleId); 
    //make id's null
    timerId=null;
    randomMoleId=null;
    pauseBtn.textContent='Resume';
  }else{
    gameMusic.play();
    timerId=setInterval(randomMole,1000);
    randomMoleId=setInterval(countDown,1000);
    pauseBtn.textContent='Pause';
  }
}





//adding eventlistener to squares and updating score
squares.forEach(square =>{
  square.addEventListener('mousedown',()=>{
//if game is started 
    if(timerId !== null){
    if(square.id === hitPosition){
      hitMusic.play();
      setTimeout(()=>{
        hitMusic.pause();
      },1000);
      score++;
      scoreH2.innerHTML=`Your Score: ${score}`;
      hitPosition=null;
    }
  }
  })
})
startBtn.addEventListener('click',startGame);
pauseBtn.addEventListener('click',pauseResumeGame);