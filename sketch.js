const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var engine, world;
var wall1, wall2, bridge, link, ground, zombie, group;
var zombieImg, bgImg
var stones = [];
var flag = false
var button;

function preload() {
  zombieImg = loadImage("./assets/zombie.png");
  bgImg = loadImage("./assets/background.png");
}

function setup() {

  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(60);

  wall1 = new Base(20, 400, 300, 200);
  bridge = new Bridge(int((width-600)/50), {x: 15, y: 400});
  wall2 = new Base(width-20, 400, 300, 200);
  ground = new Base(width/2, 1000, width, 20);
  zombie = createSprite(100, 200);
  zombie.addImage(zombieImg);
  zombie.scale = 0.2;

  button = createImg("./assets/axe.png");
  button.position(width-100, 400);
  button.size(50, 50);
  button.mouseClicked(drop);

  Composite.add(bridge.body, wall2)
  link = new Link(bridge, wall2, -150);

  for (var i = 0; i < 15; i++) {
    var stone = new Stone();
    stones.push(stone);
  }
}

function draw() {
  background(51);
  imageMode(CENTER);
  image(bgImg, width/2, height/2, width, height);
  Engine.update(engine);

  wall1.display();
  wall2.display();
  bridge.show();
  //bridge.showConstraints(link);
  ground.display();

  if (zombie.x > width) {
    flag = true
    zombie.velocityX = -7;
  } else if (flag == false || zombie.x < 0) {
    zombie.velocityX = 7;
  }

  for (var i = 0; i < stones.length; i++) {
    stones[i].display();
  }

  drawSprites();
}

function drop() {
  bridge.break();
  link.detach();
}
