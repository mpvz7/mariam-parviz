const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const fond1 = new Image();
const fond2 = new Image();
const ski = new Image();

fond1.src = './pingouin/media/fond1.jpg';
fond2.src = './pingouin/media/fond2.jpg';
ski.src = './pingouin/media/ski.png';

// general settings
let gamePlaying = false;
const gravity = 1;
const speed = 6.2;
const size = [50,67];
const jump = -11.5;
const cTenth = (canvas.width / 5);
const pingouinHeight = canvas.height - size[1]*1.25;

let index = 0,
    bestScore = 0,
    currentScore = 0,
    pingouins = [],
    flight,
    flyHeight;

const pingouinsWidth = 147;
const pingouinsGap = 270;
const pingouinsLocation = () => Math.max(Math.random() * canvas.width, Math.random() * pingouinsGap)+canvas.width;

const setup = () => {
  currentScore = 0;
  flight = jump;

  // set initial flyHeight
  flyHeight = pingouinHeight;

  // setup first 3 pipes
  	pingouins = [pingouinsLocation(),pingouinsLocation(), pingouinsLocation()];
  	
}

const render = () => {
    index++;

    //background
    ctx.drawImage(fond1, -index*(speed/2)%canvas.width + canvas.width, 0,canvas.width, canvas.height);
    ctx.drawImage(fond2,  -index*(speed/2)%canvas.width, 0,canvas.width, canvas.height);


    if(gamePlaying){
        //pingouin qui ski à gauche quand on joue    
        ctx.drawImage(ski, cTenth, flyHeight, ...size);
        //pinguouin qui saute
    	flight += gravity;
   		flyHeight = Math.min(flyHeight + flight, pingouinHeight);
      flyHeight = Math.max(flyHeight, 0);

   		//pingouins display
   		for (let i = 0; i <3 ; i++) {
   			pingouins[i] -= speed;
			ctx.drawImage(ski, pingouins[i], pingouinHeight);

  			//touche top pingouins, end
  			if(Math.round(pingouins[i]) <= (cTenth + 25) && 
  				Math.round(pingouins[i]) >= (cTenth - 25) &&
  				flyHeight >= pingouinHeight){
  				gamePlaying = false;
  				setup();		
  			}

  			if(pingouins[i] <= -pingouinsWidth){
  				currentScore++;
  				bestScore = Math.max(bestScore, currentScore);
  				//remove pingouins and create new one
  				pingouins = [...pingouins.slice(1), pingouinsLocation()];
  			}
      }

    }else{
        //pingouin qui ski centrer quand on ne joue pas
        flyHeight = (canvas.width - size[0])/2;
        ctx.drawImage(ski, flyHeight, pingouinHeight);

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
ski.onload = render;

// start game
document.addEventListener('click', () => gamePlaying = true);
window.onclick = () => flight = jump;