var database;
var dog,dogImage,happyDog,happyDogImage;
var foodS,foodStock;

function preload()
{
  dogImage=loadImage("images/dogImg.png");
	happydogImage=loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  database=firebase.database();
  console.log(database);

  dog=createSprite(250,250);
  dog.addImage(dogImage);
  dog.scale=0.2;
  dog.mirrorX(dog.mirrorX()*(-1));   

  foodStock=database.ref("Food");
  foodStock.on("value",readStock);
}


function draw() {  
background(46,139,87);
textSize(20);
fill(255);
noStroke();
text("Food Remaining: "+foodS,20,100)
textSize(15);
text("Note: Press UP_ARROW key to Feed Drago Milk",20,130);
if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(happydogImage);
}

drawSprites();
  

}

function readStock(data){
  foodS=data.val();   //return 20
  console.log(foodS);
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref("/").update({
    Food:x
  })
}

