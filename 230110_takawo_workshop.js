// ball. //
let x;
let y;
let d;
let sx;
let sy;

// noise. //
let nx;
let ny;

// easing. //
let ex1;
let ex2;
let ey1;
let ey2;
let time = 0;
let d1;
let d2;


function setup() {
  createCanvas(700, 650);
  
  // ball. //
  x = width / 2;
  y = height / 2;
  d = 80;
  sx = 3;
  sy = 2;
  
  // noise. //
  colorMode(HSB, 360, 100, 100, 100);
  // blendMode(ADD);
  // x = width / 2;
  // y = height / 2;
  
  // easing. //
  ex1 = random(width);
  ex2 = random(width);
  ey1 = random(height);
  ey2 = random(height);
  d1 = random(100);
  d2 = random(100);
  noSmooth();
  
  background(220);
}

function draw() {
  // background(220);
  copy(0, 0, width, height, -1, -1, width + 2, height + 2);
  
  // ball. //
  ellipse(x, y, d, d);
  x = x + sx;
  y = y + sy;
  if (x + d / 2 > width) {
    // sx = -2;
    sx = sx * -1;
  }
  if (y + d / 2 > height) {
    sy = sy * -1;
  }
  if (x - d / 2 < 0) {
    // sx = -2;
    sx = sx * -1;
  }
  if (y - d / 2 < 0) {
    sy = sy * -1;
  }
  
  // noise. //
//     for (let i = 0; i < 100; i = i + 1) {
//     stroke((frameCount + i * 0.01) % 360, 80, 100, 5);
//     point(nx, ny);
//     nx = nx + random(-1, 1);
//     ny = ny + random(-1, 1);

//     if (nx > width) {
//       nx = nx - width;
//     }
//     if (nx < 0) {
//       nx = nx + width;
//     }
//     if (ny > height) {
//       ny = ny - height;
//     }
//     if (ny < 0) {
//       ny = ny + height;
//     }
//   }
  
  // noise wave. //
  beginShape();
  for (let x = 0; x < width; x += 5){
    let n = noise(x, frameCount/10);
    let y = height/2 + n * 300;
    vertex(x, y)
  }
  vertex(width, height);
  vertex(0, height);
  endShape();
  
  // easing. //
  copy(0, 0, width, height,
       -1, -1, width + 2, height + 2);  
  let ease = easeOutExpo(time);
  line(ex1, ey1, ex2, ey2);
  circle(ex1, ey1, 10);
  circle(ex2, ey2, 10);
  let ex = lerp(ex1, ex2, ease);
  let ey = lerp(ey1, ey2, ease);
  let ed = lerp(d1, d2, ease);
  rectMode(CENTER);
  rect(ex, ey, ed, ed);
  time += 1 / 100;
  if (time > 1) {
    time = 0;
    ex1 = ex2;
    ey1 = ey2;
    d1 = d2;
    ex2 = random(width);
    ey2 = random(height);
    d2 = random(100);
  }
  
}


function easeOutExpo(x) {
return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}