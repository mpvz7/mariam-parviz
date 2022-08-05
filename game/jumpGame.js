const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const fond1 = new Image();
const fond2 = new Image();
const character = new Image();
const obstacle = new Image();

fond1.src = './game/media/fond1.jpg';
fond2.src = './game/media/fond2.jpg';
character.src = './game/media/character.png';
obstacle.src = './game/media/obstacle.png'

// general settings
let gamePlaying = false;
const gravity = 1;
const speed = 6.2;
const size = [50,67];
const jump = -11.5;
const cTenth = (canvas.width / 5);
const characterHeight = canvas.height - size[1]*1.25;

let index = 0,
    bestScore = 0,
    currentScore = 0,
    obstacles = [],
    flight,
    flyHeight;

const obstaclesWidth = 147;
const obstaclesGap = 270;
const obstaclesLocation = () => Math.max(Math.random() * canvas.width, Math.random() * obstaclesGap)+canvas.width;

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
        //pingouin qui character à gauche quand on joue    
        ctx.drawImage(character, cTenth, flyHeight, ...size);
        //pinguouin qui saute
    	flight += gravity;
   		flyHeight = Math.min(flyHeight + flight, characterHeight);
      flyHeight = Math.max(flyHeight, 0);

   		//obstacles display
   		for (let i = 0; i <3 ; i++) {
   			obstacles[i] -= speed;
			ctx.drawImage(obstacle, obstacles[i], characterHeight);

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
        //pingouin qui character centrer quand on ne joue pas
        flyHeight = (canvas.width - size[0])/2;
        ctx.drawImage(character, flyHeight, characterHeight);

        //texte sur le canvas quand on ne joue pas
        ctx.fillText(`Meilleur score : ${bestScore}`, canvas.width/5 , 50);
        ctx.fillText('Cliquez pour jouer', canvas.width/5, 190);
        ctx.font = "bold 30px courrier";
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
window.onclick = () => flight = jump;