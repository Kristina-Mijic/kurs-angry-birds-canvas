let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

//Ucitavanje slika:
let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeNorth = new Image();
let pipeSouth = new Image();

bird.src = "slike/bird.png";
bg.src = "slike/bg.png";
fg.src = "slike/fg.png";
pipeNorth.src = "slike/pipeNorth.png";
pipeSouth.src = "slike/pipeSouth.png";

//Promenljive:
let gap = 85;
let constant;

let bX = 10; //x ptica
let bY = 150; //y ptica
let gravity = 1.5; //stepen gravitacije, vuce za y na dole.
let score = 0;

//On keyDown:
let moveUp = () => {
  bY -= 25;
}
document.addEventListener('keydown', moveUp);


//koordinate slika cevi:
let pipe = [];
pipe[0] = {
  x: cvs.width,
  y: 0
};

// draw images
let draw = () => {
  
  ctx.drawImage(bg, 0, 0);

  for(let i = 0; i < pipe.length; i++){
    constant = pipeNorth.height + gap;
    ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);
         
    pipe[i].x--;
   
    if( pipe[i].x == 125 ){
      pipe.push({
        x : cvs.width,
        y : Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
      });
    }

    // detect collision
    if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY + bird.height >= pipe[i].y+constant) || bY + bird.height >=  cvs.height - fg.height){
      location.reload(); // reload the page
    }
   
    if(pipe[i].x == 5) {
      score++; 
    }  
  };

  ctx.drawImage(fg, 0, cvs.height - fg.height);
  ctx.drawImage(bird, bX, bY);
  bY += gravity;
  ctx.fillStyle = '#000';
  ctx.font = '20px Verdana';
  ctx.fillText('Score : ' + score, 10, cvs.height - 20)
  requestAnimationFrame(draw);
}
draw();


