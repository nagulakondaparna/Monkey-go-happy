
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground;
var invisibleGround;
var survivalTime=0;
var beepsound;
var popsound;
var Happy;

function preload(){

  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  beepSound = loadSound("Camera-Beep-www.fesliyanstudios.com.mp3")
  popsound = loadSound("FireWorks-Double-Pop-www.fesliyanstudios.com.mp3")
}



function setup() {

createCanvas(600,600);

monkey = createSprite(80,315,20,20);
monkey.addAnimation("moving",monkey_running);
monkey.scale=0.1;

ground = createSprite(400,350,900,10);
ground.velocityX=-4;
ground.x=ground.width/2;
  
invisibleGround = createSprite(400,350,900,10);
invisibleGround.visible = false;
  
 obstacleGroup = createGroup();
FoodGroup = createGroup();
  
Happy=0;
  
  
}


function draw() {
  
background("Red");
stroke("black");
textSize(20);
fill("black");
text("Happy: "+ Happy, 400,50);
  

stroke("black");
textSize(20);
fill("black");
survivalTime = Math.ceil(frameCount/frameRate())  
 text("Survival Time:"+ survivalTime,100,50); 
  
   
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    } 
  
  if(keyDown("space")&& monkey.y >=200) {
     monkey.velocityY=-10;
        
    }
  monkey.velocityY = monkey.velocityY + 0.6
  monkey.collide(invisibleGround);
  
  Food();
  rocks();
  
  if(FoodGroup.isTouching(monkey)){
  FoodGroup.destroyEach();
  beepSound.play() 
  Happy=Happy+2;
  }
  
  if(obstacleGroup.isTouching(monkey)){
  obstacleGroup.destroyEach();
  popsound.play() 
  Happy=0;
  }
drawSprites();
  
}

function Food() {
if (frameCount % 80 === 0) {
var banana = createSprite(400,400,40,10);
banana.y = Math.round(random(100,180));
banana.addImage(bananaImage);
banana.scale=0.1;
banana.velocityX = -6;
banana.setlifetime = 200;
  
banana.depth = monkey.depth;
monkey.depth = monkey.depth + 1;  

FoodGroup.add(banana);

} 
}

function rocks() {
if (frameCount % 150 === 0) {
var rock = createSprite(400,330,900,10);
rock.y = Math.round(random(330,330));
rock.addImage(obstacleImage);
rock.scale=0.1;
rock.velocityX =-4;
rock.setlifetime = 200;

rock.depth = monkey.depth;
monkey.depth = monkey.depth + 1;

obstacleGroup.add(rock);

} 
}





