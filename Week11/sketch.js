let player;
let obstacles = [];
let staticObstacle = null;
let exitZone;
let gameWon = false;
let gameLost = false;

function setup() {
  createCanvas(800, 600);
  player = createVector(50, height / 2);

  
  for (let i = 0; i < 3; i++) {
    obstacles.push({
      pos: createVector(random(width), random(height)),
      size: random(30, 60),
      col: color(random(255), random(255), random(255)),
      vel: createVector(random(-2, 2), random(-2, 2))
    });
  }

  
  exitZone = {
    x: width - 100,
    y: height - 100,
    w: 80,
    h: 80
  };
}

function draw() {
  background(220);

  if (gameWon) {
    textSize(32);
    fill(0);
    textAlign(CENTER);
    text("You Win!", width / 2, height / 2);
    noLoop();
    return;
  }

  if (gameLost) {
    textSize(32);
    fill(255, 0, 0);
    textAlign(CENTER);
    text("Game Over!", width / 2, height / 2);
    noLoop();
    return;
  }

  
  fill(0, 255, 0);
  rect(exitZone.x, exitZone.y, exitZone.w, exitZone.h);
  textSize(16);
  fill(0);
  text("EXIT", exitZone.x + 20, exitZone.y + 45);

  
  fill(0, 0, 255);
  ellipse(player.x, player.y, 30, 30);

  
  for (let obs of obstacles) {
    fill(obs.col);
    ellipse(obs.pos.x, obs.pos.y, obs.size);
    obs.pos.add(obs.vel);

    
    if (obs.pos.x > width) obs.pos.x = 0;
    else if (obs.pos.x < 0) obs.pos.x = width;
    if (obs.pos.y > height) obs.pos.y = 0;
    else if (obs.pos.y < 0) obs.pos.y = height;

    
    let d = dist(player.x, player.y, obs.pos.x, obs.pos.y);
    if (d < (obs.size / 2 + 15)) {
      gameLost = true;
    }
  }

  
  if (staticObstacle) {
    fill(100);
    rect(staticObstacle.x, staticObstacle.y, staticObstacle.w, staticObstacle.h);
  }

  
  if (
    player.x > exitZone.x &&
    player.x < exitZone.x + exitZone.w &&
    player.y > exitZone.y &&
    player.y < exitZone.y + exitZone.h
  ) {
    gameWon = true;
  }
}

function keyPressed() {
  if (key === 'w' || key === 'W') player.y -= 10;
  else if (key === 's' || key === 'S') player.y += 10;
  else if (key === 'a' || key === 'A') player.x -= 10;
  else if (key === 'd' || key === 'D') player.x += 10;
}

function mousePressed() {
  
  staticObstacle = {
    x: mouseX - 20,
    y: mouseY - 20,
    w: 40,
    h: 40
  };

  
  obstacles.push({
    pos: createVector(random(width), random(height)),
    size: random(30, 60),
    col: color(random(255), random(255), random(255)),
    vel: createVector(random(-2, 2), random(-2, 2))
  });
}
