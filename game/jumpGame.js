const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const fond1 = new Image();
const fond2 = new Image();
const character = new Image();
const obstacle = new Image();

fond1.src = './game/media/fond1.jpg';
fond2.src = './game/media/fond1.jpg';
character.src = './game/media/character.png';
obstacle.src = './game/media/obstacle.png'

// general settings
let gamePlaying = false;
const gravity = 0.5;
const speed = 3.2;
const size = [91,70];
const jump = -12.5;
const cTenth = (canvas.width / 8);
const characterHeight = canvas.height - size[1];

let index = 0,
    bestScore = 0,
    currentScore = 0,
    obstacles = [],
    flight,
    flyHeight;

const obstaclesWidth = size[1]/2;
const obstaclesGap =  canvas.width*3;
const obstaclesLocation = () =>Math.random(canvas.width*2, obstaclesGap)+canvas.width;

const setup = () => {
    currentScore = 0;
    flight = jump;

  // set initial flyHeight
    flyHeight = characterHeight;

  // setup first 3 pipes
  	obstacles = [obstaclesLocation(),obstaclesLocation(), obstaclesLocation()];
  	
}

const render = () => {
    index++;

    //background
    ctx.drawImage(fond1, -index*(speed/2)%canvas.width + canvas.width, 0,canvas.width, canvas.height);
    ctx.drawImage(fond2,  -index*(speed/2)%canvas.width, 0,canvas.width, canvas.height);

    if(gamePlaying){
        //character à gauche quand on joue    
        ctx.drawImage(character, cTenth, flyHeight, ...size);
        //character qui saute
    	flight += gravity;
   		flyHeight = Math.min(flyHeight + flight, characterHeight);
        flyHeight = Math.max(flyHeight, 0);

   		//obstacles display
   		for (let i = 0; i <3 ; i++) {
   			obstacles[i] -= speed;
			ctx.drawImage(obstacle, obstacles[i], characterHeight+size[1]/2, size[0]/2, size[1]/2);

  			//touche top obstacles, end
  			if(Math.round(obstacles[i]) <= (cTenth + 25) && 
  				Math.round(obstacles[i]) >= (cTenth - 25) &&
  				flyHeight >= characterHeight){
  				gamePlaying = false;
  				setup();		
  			}

  			if(obstacles[i] <= -obstaclesWidth){
  				currentScore++;
  				bestScore = Math.max(bestScore, currentScore);
  				//remove obstacles and create new one
  				obstacles = [...obstacles.slice(1), obstaclesLocation()];
  			}
      }

    }else{
        //character centre quand on ne joue pas
        flyHeight = (canvas.width - size[0])/2;
        ctx.drawImage(character, flyHeight, characterHeight);

        //texte sur le canvas quand on ne joue pas
        ctx.fillText(`Meilleur score : ${bestScore}`, 0, canvas.height/5);
        ctx.fillText('Cliquez pour jouer', 0, (canvas.height*2)/5);
        ctx.font = "bold 2rem courrier";
    }

    document.getElementById('bestScore').innerHTML = `Meilleur : ${bestScore}`;
    document.getElementById('currentScore').innerHTML = `Actuel : ${currentScore}`;

    window.requestAnimationFrame(render);
}
// launch setup
setup();
character.onload = render;

// start game
document.addEventListener('click', () => gamePlaying = true);
document.addEventListener('keyup', event => {
    if (event.code === 'Enter') {
        gamePlaying = true
    }
  })

function keyboard_off(e)
{
    if(e.keyCode > 0) e.returnValue = false;
    if(e.which > 0) return false;
}

window.onclick = () => {
    flight = jump;
}
document.body.onkeydown = function(e) {
    if (e.keyCode == 13){
        flight = jump;
        setTimeout(keyboard_off(e), 1000)
    }
};