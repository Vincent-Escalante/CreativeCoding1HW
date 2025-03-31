function setup() {
  createCanvas(800, 800);
  background(220);

  // Title
  textSize(32);
  textAlign(CENTER);
  text('If I was Bald', width / 2, 50);

  // Face (ellipse)
  fill(255, 224, 189);
  ellipse(400, 400, 300, 380);

  // Eyes (circles)
  fill(255);
  ellipse(350, 370, 50, 30); // Left eye
  ellipse(450, 370, 50, 30); // Right eye
  fill(0);
  ellipse(350, 370, 20, 20); // Left pupil
  ellipse(450, 370, 20, 20); // Right pupil

  // Nose (triangle)
  fill(245, 200, 180);
  triangle(400, 400, 380, 460, 420, 460);

  // Mouth (line)
  stroke(150, 0, 0);
  strokeWeight(4);
  line(360, 500, 440, 500);

  // Ears (rectangles)
  fill(255, 224, 189);
  rect(250, 400, 30, 60); // Left ear
  rect(520, 400, 30, 60); // Right ear

  // "Hair" (points)
  stroke(0);
  strokeWeight(3);
  point(400, 220);
  point(385, 230);
  point(415, 230);
  point(370, 240);
  point(430, 240);
  point(355, 250);
  point(445, 250);

  // Signature
  noStroke();
  fill(0);
  textSize(20);
  textAlign(RIGHT);
  text('Vincent Escalante', width - 20, height - 20);
}