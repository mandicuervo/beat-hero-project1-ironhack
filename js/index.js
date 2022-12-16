let game; // new Game('canvas', passionfruit);

//game sounds
const menuSong = new Audio(); //menu song
menuSong.src = "./music/menu-song.wav";
const winSong = new Audio(); //win song in score-page
winSong.src = ".music/win-song.wav"; 

//GAME AND MENU PAGE
const displayGame = document.getElementById('display-game'); //canvas game page and score
const pauseButton = document.getElementById('pause-button'); //pause button in display game
const menuPage = document.getElementById('menu-page');  //menu page

//about the game
const aboutBtn = document.getElementById('about-button'); //about the game button
const aboutPage = document.getElementById('about-page'); //about the game page
const backButton = document.getElementById('back-button') //button back to menu in about page

//how to play
const howButton = document.getElementById('how-button'); //how to play button
const howPage = document.getElementById('how-page'); //how to play page
const backButton2 = document.getElementById('back-button2');//back button in how to play page


//lab music
const labButton = document.getElementById('lab-button'); 
const labPage = document.getElementById('lab-page'); 
const backButton5 = document.getElementById('back-button5'); //back to menu button in lab paeg

//choose your song page and buttons
const chooseButton = document.getElementById('choose-button'); 
const songsPage = document.getElementById('choose-page');
const backButton4 = document.getElementById('back-button4'); //back to menu in choose your songs page
//songs buttons
const passionfruitBtn = document.getElementById('passionfruit-btn'); 
const laCombiVersaceBtn = document.getElementById('la-combi-btn'); 

//game over page and button
const gameOver = document.getElementById('game-over'); //game over page
const backButton3 = document.getElementById('back-button3'); //back to menu in game over page 'try again'

//speaker container in display game page
const speakerContainer = document.getElementById('speaker-container')

//choose your song button in menu page to go choose your song page
chooseButton.addEventListener('click', () => {
  menuPage.classList.add('transparent');
  songsPage.classList.remove('transparent')
});

backButton4.addEventListener('click', () => {
  songsPage.classList.add('transparent');
  menuPage.classList.remove('transparent');
});

passionfruitBtn.addEventListener('click', () => {
  songsPage.classList.add('transparent');
  displayGame.classList.remove('transparent')
  game = new Game('canvas', passionfruit);
  game.start()
});

laCombiVersaceBtn.addEventListener('click', () => {
  songsPage.classList.add('transparent');
  displayGame.classList.remove('transparent')
  game = new Game('canvas', laCombiVersace);
  game.start()
});

//about the game button in menu page to go about page
aboutBtn.addEventListener('click', () => {
  menuPage.classList.add('transparent');
  aboutPage.classList.remove('transparent');
});

//back button in about the game page to go to the menu page
backButton.addEventListener('click', () => {
  aboutPage.classList.add('transparent');
  menuPage.classList.remove('transparent');
});

//how to play button in menu page to go to the how to play page
howButton.addEventListener('click', () => {
  menuPage.classList.add('transparent');
  howPage.classList.remove('transparent')
})

//back to menu in how to play page
backButton2.addEventListener('click', () => {
  howPage.classList.add('transparent');
  menuPage.classList.remove('transparent');
});

//lab button in menu page 
labButton.addEventListener('click', () => {
  pauseButton.classList.add('transparent');
  speakerContainer.style.display =  'none';
  menuPage.classList.add('transparent');
  displayGame.classList.remove('transparent');
  displayGame.style.justifyContent = 'flex-start';
  labPage.classList.remove('transparent')
  game = new Game2('canvas', hiphop);
  game.start()
});

//lab style buttons
const hiphopBtn = document.getElementById('hip-hop');
const electronicBtn = document.getElementById('electronic');

electronicBtn.addEventListener('click', () => {
  electronicBtn.classList.add('selected')
  hiphopBtn.classList.remove('selected')
  if(game) game.pause()
  game = new Game2('canvas', eletronic);
  game.start()
})

hiphopBtn.addEventListener('click', () => {
  hiphopBtn.classList.add('selected')
  electronicBtn.classList.remove('selected')
  if(game) game.pause()
  game = new Game2('canvas', hiphop);
  game.start()
})

//back to menu in LAB PAGE
backButton5.addEventListener('click', () => {
  labPage.classList.add('transparent');
  menuPage.classList.remove('transparent');
});

//PAUSE BUTTON/PLAY BUTTON
document.addEventListener('keydown', (event) => {
  if (event.keyCode === 32) {
    event.preventDefault();
    if(pauseButton.innerText === 'PAUSE') {
      game.pause()
      pauseButton.innerText = 'PLAY';
    } else {
      game.start(true)
      pauseButton.innerText = 'PAUSE';
    }
  } else {
    game.pad.onKeyEvent(event);
  }
});
  
  document.addEventListener('keyup', (event) => {
    game.pad.onKeyEvent(event)
});


