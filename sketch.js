var player,enemy1,bullet,background,sound,restart;
var playerImage,enemyImage,bulletImage,backgroundImage,restartImage;
var EnemyGroup,bulletGroup;
var score=0;
var planet1,planet2,blast;
var planetGrp;
var gameState = "play";
var planetImg1, planetImg2,blastImage;
var index = 0;

function preload(){
  sound=loadSound("sound.mp3");
  playerImage=loadImage("Images/Player.png");
  enemyImage=loadImage("Images/Enemy.png");
  bulletImage=loadImage("Images/Bullet.png");
  backgroundImage=loadImage("Images/Background.png");
  restartImage=loadImage("Images/Restart.png");
  planetImg1=loadImage("Images/Planet1.png");
  planetImg2=loadImage("Images/Planet2.png");
  blastImage=loadImage("Images/Blast.png")
}

function setup(){
  background=createSprite(0,0);
  background.addImage(backgroundImage);
  background.scale=4;
  player= createSprite(190,windowHeight-80,10,10);
  player.addImage(playerImage);
  player.scale=1.00;
  //restart=createSprite(windowWidth/2-80,windowHeight/2+50);
  //restart.addImage(restartImage);
 //restart.visible=false;
  bulletGroup=new Group();
  enemyGroup=new Group();
  planetGrp = new Group();
}
function draw() {
  createCanvas(windowWidth-130,windowHeight);
     background.velocityY=5;
  if(background.y>windowHeight){
     background.y=background.height/2;
  }
   enemy();
    
  if(gameState==="play"){
    player.x=World.mouseX; 
    if (keyDown("Ctrl") ) {
      createBullet();   
    }   
  }
  //score=52;
  if(score>5){
    createPlanets();
  }
  if(planetGrp.isTouching(player)|| enemyGroup.isTouching(player)){
      //player.destroy();
      gameState = "end";
  }

  
  drawSprites();
  textSize(20);
  fill("yellow");
  text("score :"+score,1100,100);
  

  if (gameState === "end"){
    player.addImage(blastImage);
    player.scale=0.5;
    //player.lifetime=10;
    //restart.visible=true;
    if(keyDown("R")||keyDown("r")){
      console.log("mouse pressed");
       reset();
    }
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", World.width/2 - 80,World.height/2);
    text("Press R to restart", World.width/2 - 80,World.height/2-50);
  }
}

function enemy(){

  if(frameCount % 60 === 0){
     enemy1=createSprite(100,125,10,10);
     enemy1.addImage(enemyImage);
     enemy1.scale=0.8;
     enemy1.x=Math.round(random(0,displayWidth));
     enemy1.velocityY=2+3*score/100;
     enemy1.lifetime=1000;
     enemyGroup.add(enemy1);
    
  }
for(var x=0;x<enemyGroup.size();x++){  
    if(bulletGroup.isTouching(enemyGroup.get(x))){
      bulletGroup.destroyEach();
      enemyGroup.get(x).destroy();
      score++;
    }
}
}

function createBullet(){
  bullet=createSprite(300,50,10,10);
  bullet.addImage(bulletImage);
  bullet.scale=0.09;
  bullet.velocityY=-15;
  bullet.x=player.x;
  bullet.y=600
  bullet.lifetime=600;
  bulletGroup.add(bullet);
  
}


function createPlanets(){
  if (World.frameCount % 280 === 0) {
   planet1 = createSprite(Math.round(random(50,400)),0);
   planet1.scale = 0.3;
   planet1.addImage(planetImg1);
   planet1.velocityY = Math.round(random(10,20));
   planet1.velocityX = Math.round(random(20,40));
   planet1.lifetime=500;
   planetGrp.add(planet1);
 }
  if (World.frameCount % 250 === 0) {
   planet2 = createSprite(Math.round(random(50,400)),0);
   planet2.scale = 0.3;
   planet2.addImage(planetImg2);
   planet2.velocityY = Math.round(random(10,15));
   planet2.velocityX = Math.round(random(30,55));
   planet2.lifetime=500;
   planetGrp.add(planet2);
}



}
function reset(){
  gameState="play";
  player.addImage(playerImage);
  player.scale=1;+
  score=0;
}

