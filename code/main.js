
import kaboom from "kaboom"

// initialize context
kaboom({
  font: "sink",
  background: [ 210, 210, 155,],
})

//let's load the sprites
loadSprite("player", "sprites/player.jpg");
loadSprite("bug", "sprites/bug.jpg");
loadSprite("coffee", "sprites/coffee.jpg");

//load the music
loadSound("coffee-tune", "sounds/coffee-tune.mp3");

//game variables define
let SPEED = 620
  let BSPEED = 2
let SCORE = 0
let scoreText;
let bg;

//lets define a function to display score
const displayScore = () => {
  destroy(scoreText)
  scoreText = add([
    text("Score: " + SCORE),
    scale(3),
    pos(width()-181, 21),
  ])
} 

//lets add the programmer
const gamer = add([
  sprite('player'),
  pos(120, 80),
  area(),
  scale(0.19),
  ])
//add events to our player
  onKeyDown('left', ()=> {
 
    gamer.move(-SPEED, 0)
  })
  
  onKeyDown('right', ()=> {
 
    gamer.move(SPEED, 0)
  })
  
  onKeyDown('up', ()=> {

    gamer.move(0, -SPEED)
  })
  
  onKeyDown('down', ()=> {
  
    gamer.move(0, SPEED)
  })
  //lets add the 4 bugs and a coffee on loop

loop(4, () => {
 for(let i =0; i<4; i++){
   let x = rand(0, width())
   let y = height()
   let c = add([
  sprite('bug'),
  pos(x, y),
  area(),
  scale(0.19),
     "bug"
  ])
   c.onUpdate(() => {
     c.moveTo(c.pos.x, c.pos.y - BSPEED)
   })
 } 
   let x = rand(0, width())
   let y = height()

  //introduce a coffee for our programmer
   let c = add([
  sprite('coffee'),
  pos(x, y),
  area(),
  scale(0.19),
    "coffee"
      ])

 
   c.onUpdate(() => {
     c.moveTo(c.pos.x, c.pos.y - BSPEED)
   })
  if(BSPEED<12){
  BSPEED +=1
  }
})

//oncollide
gamer.onCollide('bug', () => {

  destroy(gamer)
  addKaboom(gamer.pos)
  scoreText = add([
    text("game over"),
    scale(3),
    pos(10, 21),
    color(10, 10, 255)
  ])
  
})
gamer.onCollide('coffee', (coffee) => {
play("coffee-tune")
  destroy(coffee)
 SCORE += 1
  displayScore()
  
})

//display the score
displayScore()