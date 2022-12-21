var PLAY = 1;
var END = 0;
var gameState = PLAY;
var santa, santaRunning, santaDead;
var bg, bgImg;
var invisibleGround;
var obstacle, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacleGroup;
var restart, restartImg;
var score = 0;
var christmasSong;


function preload() {
  santaRunning = loadAnimation("Run (1).png", "Run (2).png", "Run (3).png","Run (4).png","Run (5).png","Run (6).png","Run (7).png","Run (8).png","Run (9).png","Run (10).png","Run (11).png");
  bgImg = loadImage("town.png");
  obstacle1 = loadImage("snowball1.png");
  santaDead = loadAnimation("Dead (1).png");
  christmasSong = loadSound("Song.mp3");
  restartImg = loadImage("gameover.png");
  obstacle2 = loadImage("cane.png");
  obstacle3 = loadImage("stocking.png");
  obstacle4 = loadImage("hat.png");
  obstacle5 = loadImage("gift.png");
  obstacle6 = loadImage("laugh.png");
}
 
function setup() {
  createCanvas(800, 400);
  bg = createSprite(400, 200);
  bg.addImage("town", bgImg);
  bg.scale = 0.5;
  santa = createSprite(60, 325, 20, 50);
  santa.addAnimation("running", santaRunning);
  santa.addAnimation("santaDead", santaDead);
  santa.scale = 0.2;

  santa.setCollider("rectangle", 0, 0, 60, 500);
  invisibleGround = createSprite(400, 390, 800, 40);
  invisibleGround.visible = false;
  obstacleGroup = createGroup();

  restart = createSprite(400, 175);
  restart.addImage(restartImg);
  restart.visible = false;

  christmasSong.play();
}

function spawnObstacles() {
  if (frameCount % 60 === 0) {
  obstacle = createSprite(800, 350, 30, 30);
  var rand = Math.round(random(1, 6));
  switch(rand) {
    case 1: obstacle.addImage(obstacle1);
          break;
    case 2: obstacle.addImage(obstacle2);
          break;
    case 3: obstacle.addImage(obstacle3);
          break;
    case 4: obstacle.addImage(obstacle4);
          break;
    case 5: obstacle.addImage(obstacle5);
          break;
    case 6: obstacle.addImage(obstacle6);
          break;
    default: break;
  }
  obstacle.velocityX = -6;
  obstacle.scale = 0.25;
  obstacle.lifetime = width / 6;
  obstacle.depth = santa.depth;
  obstacle.depth -= 1;
  obstacleGroup.add(obstacle);
  }
}

function draw() {
  background("transparent");
  if (gameState === PLAY) { 
    score += 1;
    bg.velocityX = -20;
    if (bg.x < 285) {
      bg.x = width / 2;
    }
    if(keyDown("space") && santa.y >= 320) {
      santa.velocityY = -15;
    }
    spawnObstacles();
    santa.velocityY = santa.velocityY + 0.8;
    if(santa.isTouching(obstacleGroup)) {
      gameState = END;
    }
  }
  else if(gameState === END) {
    christmasSong.stop();
    bg.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    santa.changeAnimation("santaDead", santaDead);
    santa.velocityY = 0;
    obstacleGroup.setLifetimeEach(-1);
    restart.visible = true;
    if (mousePressedOver(restart)) {
      reset();
    }
  }
  santa.collide(invisibleGround);
  drawSprites();
  textSize(32);
  fill("yellow");
  text("Score: "+ score, 325,50);
}

function reset() {
  christmasSong.play();
  gameState = PLAY;
  restart.visible = false;
  obstacleGroup.destroyEach();
  santa.changeAnimation("running", santaRunning);
  score = 0;
}