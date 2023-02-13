var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;
var score=0
var zombieGroup;
var bullet,bullet_img,bulletgroup
var PLAY=1
var END=0
var gamestate=PLAY
var diesound
var restart, restartImage, gameover, gameoverImage


function preload(){
  
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  zombieImg = loadImage("assets/zombie.png")

  bgImg = loadImage("assets/bg.jpeg")
  bullet_img= loadImage('assets/bullet.png')
  diesound= loadSound('assets/lose.mp3')
  gameoverImage=loadImage('assets/gameover.jpg')
  restartImage=loadImage('assets/restart.png')
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,200,20)
bg.addImage(bgImg)
bg.scale = 1.1
restart = createSprite(1000,900)
restart.addImage(restartImage)
restart.visible=false
restart.scale=0.2  

gameover = createSprite(1000,500)
gameover.addImage(gameoverImage)
gameover.visible=false
gameover.scale=0.5  
//creating the player sprite
player = createSprite(displayWidth-1600, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)


   //creating sprites to depict lives remaining
   heart1 = createSprite(displayWidth-150,40,20,20)
   heart1.visible = false
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.4

    heart2 = createSprite(displayWidth-100,40,20,20)
    heart2.visible = false
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.4

    heart3 = createSprite(displayWidth-150,40,20,20)
    heart3.addImage("heart3",heart3Img)
    heart3.scale = 0.4
   

    //creating group for zombies    
    zombieGroup = new Group();
    bulletgroup = new Group()
}

function draw() {
  background(0); 
if(gamestate===PLAY){


  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-20
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+20
}
/*if(keyDown("RIGHT_ARROW")||touches.length>0){
  player.x = player.x+15
}
if(keyDown("LEFT_ARROW")||touches.length>0){
 player.x = player.x-15
}
*/

//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  
  player.addImage(shooter_shooting)
  createBullet()
 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}


//destroy zombie when player touches it
if(zombieGroup.isTouching(player)){
 diesound.play()
gamestate=END
 /*for(var i=0;i<zombieGroup.length;i++){     
      
  if(zombieGroup[i].isTouching(player)){
       zombieGroup[i].destroy()
       } 
 }*/
}
if(bulletgroup.isTouching(zombieGroup)){

  zombieGroup.destroyEach();
  bulletgroup.destroyEach();
  score=score+1;
}
//calling the function to spawn zombies
enemy();
fill('cyan')
textSize(30)
text('SCORE:'+score,20,30)

}
else if(gamestate===END){
zombieGroup.setVelocityXEach(0)
bulletgroup.setVelocityXEach(0)
restart.visible=true
gameover.visible=true
if(mousePressedOver(restart)){
  location.reload()
}
}
drawSprites();
}



//creating function to spawn zombies
function enemy(){
  if(frameCount%95===0){

    //giving random x and y positions for zombie to appear
    zombie = createSprite(random(1700,1800),random(100,500),40,40)

    zombie.addImage(zombieImg)
    zombie.scale = 0.15
    zombie.velocityX = -7
    zombie.debug= true
    zombie.setCollider("rectangle",0,0,400,400)
   
    zombie.lifetime = 800
   zombieGroup.add(zombie)
  }

} 
function createBullet() {
  var bullet= createSprite(100, 100, 60, 10);
  bullet.addImage(bullet_img);
  bullet.x = player.x;
  bullet.y=player.y;
  bullet.velocityX = 4;
  bullet.lifetime = 200;
  bullet.scale = 0.05;
  bulletgroup.add(bullet);}
