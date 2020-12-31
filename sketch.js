const Engine = Matter.Engine
const World = Matter.World
const Bodies = Matter.Bodies
var alien = null
var axe = null
var score = 0
var gameState = 1
var level = 1
var alien2 = null
function preload(){
axeImage = loadImage("axe_diamond.png")
bg1 = loadImage("bg1.png")
gameOverImage = loadImage("images.png")
bg2 = loadImage("bg2.png")
}

function setup() {
  createCanvas(1030,400);
  engine = Engine.create();
  world = engine.world;
  ground1 = new Ground(400,390,1600,20)
  player = new Player(40,310,85,150)
  
}

function draw() {
  if(level ===1)
  background(bg1);
  if(level ===2)
  background(bg2)
  Engine.update(engine);
  ground1.display();
  player.display();
  if(alien){
  alien.display();
  Matter.Body.applyForce(alien.body,alien.body.position,{x:-20,y:0})
  }
  if(alien2){
    alien2.display();
    Matter.Body.applyForce(alien2.body,alien2.body.position,{x:-30,y:0})
    }
  spawnAxe()
  if(axe){
    axe.display();
  }
  if(alien&&alien.body.position.x<200&&alien.body.position.y>200&&alien.body.position.y<400){
    gameState = 2
  }
  if(alien2&&alien2.body.position.x<200&&alien2.body.position.y>200&&alien2.body.position.y<400){
    gameState = 2
  }
  if(gameState === 1&&frameCount%100 === 0 ){
    score = score+1
  }
  // if(level === 2){
  //   background(bg2)
  //   player.display()
  //   gameState = 1
  //   World.remove(world,alien)
  //   ground.display();
  // }
  if(score >5){
    level =2
    World.remove(world,alien)
  }
  image(axeImage,63,290,90,60)
  spawnAlien()
  fill("white")
  textSize(30);
  text("Score:"+score,350,100)
  if(gameState === 2){
    background(gameOverImage)

  }
}
function spawnAlien(){
  if(frameCount % 100 ===0){
    if(level ===1){
      alien = new Alien(1000,360,65,130)
    }else if(level ===2){
      alien2 = new Alien2(1000,360,65,130)
    }
  }
}
function spawnAxe(){
  
  if(keyDown("space")){
    axe = new Axe(63,290,90,60)
    
    Matter.Body.applyForce(axe.body,axe.body.position,{x:2000,y:-150})
  }
}