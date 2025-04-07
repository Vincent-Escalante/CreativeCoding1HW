let x1, x2, y1, y2, dx1, dx2, dy1, dy2;
let diagX, diagY, dDiagX, dDiagY;
let titleSize = 32;
let growing = true;
let growCount = 0;

function setup() {
  createCanvas(800, 800);
  background(220);

  
  x1 = 350;
  x2 = 450;
  y1 = 250;
  y2 = 550;
  dx1 = random(1, 3);
  dx2 = random(1, 3);
  dy1 = random(1, 3);
  dy2 = random(1, 3);
  
  diagX = 300;
  diagY = 300;
  dDiagX = random(1, 2);
  dDiagY = random(1, 2);
}

function draw() {
  background(220);

  
  textAlign(CENTER);
  textSize(titleSize);
  text('If I was bald', width / 2, 50);

  if (growing) {
    titleSize++;
    if (titleSize >= 48) {
      growCount++;
      growing = false;
    }
  } else {
    titleSize--;
    if (titleSize <= 32) {
      growCount++;
      growing = true;
    }
  }

  if (growCount >= 10) {
    growCount = 0;
  }

  
  fill(255, 224, 189);
  ellipse(400, 400, 300, 380);

  
  fill(255);
  ellipse(x1, 370, 50, 30);
  ellipse(x2, 370, 50, 30);
  fill(0);
  ellipse(x1, 370, 20, 20);
  ellipse(x2, 370, 20, 20);

  x1 += dx1;
  x2 += dx2;
  if (x1 > 370 || x1 < 330) dx1 *= -1;
  if (x2 > 470 || x2 < 430) dx2 *= -1;

  
  fill(245, 200, 180);
  triangle(400, 400, 380, 460, 420, 460);

  
  fill(255, 224, 189);
  rect(250, y1, 30, 60);
  rect(520, y2, 30, 60);

  y1 += dy1;
  y2 += dy2;
  if (y1 > 420 || y1 < 380) dy1 *= -1;
  if (y2 > 570 || y2 < 530) dy2 *= -1;

  
  stroke(150, 0, 0);
  strokeWeight(4);
  line(360, 500, 440, 500);

  
  stroke(0);
  strokeWeight(3);
  point(400, 220);
  point(385, 230);
  point(415, 230);
  point(370, 240);
  point(430, 240);
  point(355, 250);
  point(445, 250);

  
  fill(100, 200, 255);
  ellipse(diagX, diagY, 30, 30);

  diagX += dDiagX;
  diagY += dDiagY;
  if (diagX > width - 15 || diagX < 15) dDiagX *= -1;
  if (diagY > height - 15 || diagY < 15) dDiagY *= -1;

  
  noStroke();
  fill(0);
  textSize(20);
  textAlign(RIGHT);
  text('Vincent Escalante', width - 20, height - 20);
}