var jack
var gameState = "start"
var wall1,wall2,wall3,wall4,wall5;
var treasure
var edges
var jackLeft
var bullet,bullets;
var life=3
var jackImg,chestImg,forestImg,bulletImg,wallImg
var jack1
var music

function preload(){
    jack1 = loadImage("project/k1.png")
    jackImg = loadAnimation("project/k1.png","project/k2.png","project/k3.png",
    "project/k4.png","project/k5.png","project/k6.png","project/k7.png") 

    jackLeft = loadAnimation("project/p1.png","project/p2.png","project/p3.png",
    "project/p4.png","project/p5.png","project/p6.png","project/p7.png") 

   

    bulletImg=loadImage("bullet.png")
    forestImg=loadImage("forest.jpg")
    chestImg=loadImage("chest.png")
    wallImg=loadImage("wall.png")
}
function setup(){
    createCanvas(500,500)
    jack = createSprite(50,450,20,20)
    jack.addAnimation("jack",jackImg)
    jack.addAnimation("jackLeft",jackLeft)
    jack.scale=0.3
    wall1 = createSprite(120,400,250,10)
    wall1.shapeColor = "black"


    wall2 = createSprite(300,300,400,10)
    wall2.shapeColor = "black"
    wall3 = createSprite(120,250,250,10)
    wall3.shapeColor = "black"
    wall4 = createSprite(350,350,300,10)
    wall4.shapeColor = "black"
    wall5 = createSprite(300,200,350,10)
    wall5.shapeColor = "black"

    treasure = createSprite(450,75,10,10)
    treasure.addImage(chestImg)
    treasure.scale=0.5
    bullets=new Group()
}

function draw(){
    if(gameState==="start"){
        background("yellow")
        textSize(30)
        fill("red")
        text("The Treasure Hunt",100,250)
        fill("blue")
        textSize(20)
        text("Press SPACE to start!!",120,350)
        music.play()
    if(keyCode===32){
            gameState = "play"
        }
        
    }
    if(gameState==="play"){
     
    

    background(forestImg)
    fill("yellow")
    textSize(15)
    text("Life: "+life,50,50)
if(keyDown("right_arrow")){
    jack.x=jack.x+3
    jack.changeAnimation("jackImg",jackImg)
}
if(keyDown("left_arrow")){
    jack.x=jack.x-3
    jack.changeAnimation("jackLeft",jackLeft)
    
}
if(keyDown("right_arrow")){
   
    jack.changeAnimation("jackImg",jackImg)
}
if(keyDown("up_arrow")){
    jack.y=jack.y-3
    
}
if(keyDown("down_arrow")){
    jack.y=jack.y+3
    
}
    edges=createEdgeSprites();
    jack.bounceOff(wall1)
    jack.bounceOff(wall2)
    jack.bounceOff(wall3)
    jack.bounceOff(wall4)
    jack.bounceOff(wall5)
    jack.bounceOff(edges)

if(life<1){
    gameState = "end"
}
if(gameState==="end"){
    textSize(35)
    text("Game over:(",120,250)
    textSize(30)
    text("better luck next time...",100,300)
    bullets.destroy()
}
if(jack.isTouching(treasure)){
    fill("blue")
    textSize(35)
    text("You Win!",120,250)
    bullets.destroyEach();
    wall1.visible=false
    wall2.visible=false
    wall3.visible=false
    wall4.visible=false
    wall5.visible=false
    jack.changeAnimtion("jack1",jack1)

    
}
if(World.frameCount%30===0){
    bullet=createSprite(-1,Math.round(random(100,450)))
    bullet.velocityX=Math.round(random(1,10))
    bullet.addImage(bulletImg)
    bullet.scale=0.1
    bullet.lifetime=400
        bullets.add(bullet)
if(bullets.isTouching(jack)){
    jack.x=50
    jack.y=450
    life=life-1
}
}
    drawSprites()
}
}
