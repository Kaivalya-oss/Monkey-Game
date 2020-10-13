var PLAY = 1;
var END = 0;
var gameState = PLAY;
var groud;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var gameover,gameoverImg
var restart , restartImg
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkeyImg = loadAnimation("sprite_0.png");
  
  
  banana_running = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  gameoverImage = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}



function setup() {
  createCanvas(500,400);
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("Movement",monkey_running);
  monkey.scale =0.1;
  
  ground = createSprite(200,350,1000,10);
  ground.x = ground.width/2; 
  ground.velocityX = -4;
  //console.log(ground.x);

  // for the gameover
  gameover = createSprite(220,180,20,20);
  gameover.addImage("overr",gameoverImage)
  gameover.visible = false;

  // for the  reset of the game
  restart = createSprite(220,200,20,20);
  restart.addImage("RS",restartImg);
  restart.scale = 0.5;
  restart.visible = false;
    // for the new group of banana and obstacle.
    FoodGroup = new Group();
    obstacleGroup = new Group();
}
score = 0;

function draw() {
  background(290);
   if (ground.x < 0){
     // for the ground to recure again and again.
      ground.x = ground.width/2;
    }

  if(gameState === PLAY){
    
    
  if(keyDown("Space")&&monkey.y>=310){
    // for the monkey to jump. 
    monkey.velocityY = -18;
    score = score-1;   
  }
   //console.log(monkey.y);
  // for the monkey to come at ground back after jump.
  monkey.velocityY = monkey.velocityY + 1;
  monkey.collide(ground);
  // for the banana to come in canvas.
  bananas();
        
  
  // for the obstacle.
  oobstacle();
  // for the end state
  if(score==-10){
     gameState = END;
  }
  if(monkey.isTouching(obstacleGroup)){
    gameState = END;
  
  
  }
  // increase in the score
    if(FoodGroup.isTouching(monkey)){
      score = score+2;
      FoodGroup.destroyEach();
    }
    // for the end monkey
    
  
  // for the restart of the game
  if(mousePressedOver(restart)) {
      reset();
    }
  
   }
  else if (gameState === END) {
    gameover.visible = true;
    monkey.visible = true;
    restart.visible = true;
    //set velcity of each game object to 0
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    // for the food to be destroyed
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
    // for the change of the monkey state.
    //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    monkey.addAnimation("stable",monkeyImg);
    monkey.changeAnimation("stable",monkeyImg);
    monkey.scale = 0.1;
  }
  if(mousePressedOver(restart)){
     reset();
     }
  
  drawSprites();
  
  fill(0);
  stroke(1);
  textSize(20)
  text("Survival Time  :  "+score,300,80);
}

function bananas(){
  if(frameCount%60==0){
    banana = createSprite(400,200,20,20);
    banana.addImage("banu",banana_running);
    banana.scale = 0.1;
  
    banana.velocityX=-(9+1*score/1);
    banana.y = Math.round(random(140,300));
    banana.lifetime = 60;
    FoodGroup.add(banana);

  }
}
function oobstacle(){
  if(frameCount%80==0){
    obstacle =createSprite(400,320,20,20);
    obstacle.addAnimation("obu",obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -9;
    obstacle.liftime= 5;
    obstacleGroup.add(obstacle);
  }
}

function reset(){
  score = 0
 gameState = PLAY;
  monkey.changeAnimation("Movement",monkey_running);
  monkey.scale =0.1;
   gameover.visible = false;
    restart.visible = false;
}

