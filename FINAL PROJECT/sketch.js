let bird;
let pipes = [];
let clouds = [];
let gravity = 0.6;
let lift = -15;
let score = 0;
let gameOver = false;
let pipeSpawnInterval = 120; // frames between pipe spawns

function setup() {
  createCanvas(400, 600);
  bird = new Bird();
  pipes.push(new Pipe());

  // Create clouds
  for (let i = 0; i < 5; i++) {
    clouds.push(new Cloud());
  }
}

function draw() {
  background(135, 206, 235); // Sky blue

  // Draw hills
  noStroke();
  fill(34, 139, 34);
  ellipse(100, height, 300, 200);
  ellipse(300, height, 300, 200);

  // Draw clouds
  for (let cloud of clouds) {
    cloud.update();
    cloud.show();
  }

  if (!gameOver) {
    bird.update();
    bird.show();

    // Generate new pipes
    if (frameCount % pipeSpawnInterval === 0) {
      pipes.push(new Pipe());
    }

    // Update and show pipes
    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].update();
      pipes[i].show();

      if (pipes[i].hits(bird)) {
        gameOver = true;
      }

      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
        score++;
      }
    }

    // Display score
    fill(0);
    textSize(32);
    textAlign(LEFT);
    text(score, 10, 50);
  } else {
    textSize(48);
    fill(255, 0, 0);
    textAlign(CENTER);
    text("Game Over", width / 2, height / 2);
    textSize(24);
    fill(0);
    text("Final Score: " + score, width / 2, height / 2 + 30);
    text("Press R to Restart", width / 2, height / 2 + 60);
  }
}

function keyPressed() {
  if (key === ' ' && !gameOver) {
    bird.flap();
  }
  if (key === 'r' || key === 'R') {
    restartGame();
  }
}

function restartGame() {
  bird = new Bird();
  pipes = [];
  pipes.push(new Pipe());
  score = 0;
  gameOver = false;
}

class Bird {
  constructor() {
    this.x = 64;
    this.y = height / 2;
    this.radius = 20;
    this.velocity = 0;
  }

  show() {
    // Draw body
    fill(255, 255, 0);
    ellipse(this.x, this.y, this.radius * 2);

    // Draw eye
    fill(0);
    ellipse(this.x + 8, this.y - 5, 6);

    // Draw beak
    fill(255, 165, 0);
    triangle(this.x + this.radius, this.y, this.x + this.radius + 1, this.y - 5, this.x + this.radius + 7, this.y + 5);

    // Draw wing
    fill(255, 215, 0);
    ellipse(this.x - 10, this.y, 12, 16);
  }

  update() {
    this.velocity += gravity;
    this.y += this.velocity;

    if (this.y > height - this.radius) {
      this.y = height - this.radius;
      this.velocity = 0;
      gameOver = true;
    }
    if (this.y < this.radius) {
      this.y = this.radius;
      this.velocity = 0;
    }
  }

  flap() {
    this.velocity += lift;
  }
}

class Pipe {
  constructor() {
    this.spacing = 180; // Consistent gap size
    const margin = 50;
    const maxTop = height - this.spacing - margin;
    this.top = random(margin, maxTop);
    this.bottom = this.top + this.spacing;
    this.x = width;
    this.w = 60;
    this.speed = 3;
  }

  show() {
    fill(0, 200, 0);
    // Top pipe
    rect(this.x, 0, this.w, this.top);
    fill(0, 150, 0);
    rect(this.x - 5, this.top - 10, this.w + 10, 10); // Pipe rim

    // Bottom pipe
    fill(0, 200, 0);
    rect(this.x, this.bottom, this.w, height - this.bottom);
    fill(0, 150, 0);
    rect(this.x - 5, this.bottom, this.w + 10, 10); // Pipe rim
  }

  update() {
    this.x -= this.speed;
  }

  offscreen() {
    return this.x < -this.w;
  }

  hits(bird) {
    if (
      (bird.y - bird.radius < this.top || bird.y + bird.radius > this.bottom) &&
      (bird.x + bird.radius > this.x && bird.x - bird.radius < this.x + this.w)
    ) {
      return true;
    }
    return false;
  }
}

class Cloud {
  constructor() {
    this.x = random(width);
    this.y = random(50, 200);
    this.size = random(40, 80);
    this.speed = random(0.5, 1);
  }

  update() {
    this.x -= this.speed;
    if (this.x < -this.size) {
      this.x = width + this.size;
      this.y = random(50, 200);
    }
  }

  show() {
    fill(255);
    noStroke();
    ellipse(this.x, this.y, this.size);
    ellipse(this.x + 20, this.y + 10, this.size * 0.8);
    ellipse(this.x - 20, this.y + 10, this.size * 0.8);
  }
}
