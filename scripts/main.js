const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const sheet = new Image();
const sheetSize = 50;
const spawnChance = 50;
const spawnRate = 100;

let backgroundColor = "rgba(66,46,67,255)";
let width = canvas.width;
let height = canvas.height;
let sizeMax = 3;
let balls = [];

let sheetCount;
let lastSpawn;

initialize();

function initialize() {
  sheet.src = "images/balls.png";
  sheetCount = sheet.width / sheetSize;

  canvas.width = width = window.innerWidth;
  canvas.height = height = window.innerHeight;

  setInterval(spawnBalls, spawnRate);

  loop();
}

function loop() {
  update();
  draw();

  window.requestAnimationFrame(loop);
}

function update() {
  for (let i = 0; i < balls.length; i++) {
    balls[i].update();

    if (!balls[i].alive) {
      balls.splice(i, 1);
    }
  }
}

function draw() {
  context.fillStyle = backgroundColor;
  context.fillRect(0, 0, width, height);
  for (let i = 0; i < balls.length; i++) {
    if (balls[i].alive) {
      balls[i].draw(context, canvas, sheet, sheetSize);
    }
  }
}

function spawnBalls() {
  if (Math.random() * 100 <= spawnChance) {
    let id = Math.floor(sheetCount * Math.random());
    let size = 0.5 + (sizeMax - 1) * Math.random();

    let ball = new Ball(id, size);
    ball.setRandomPosition(width);

    balls.push(ball);
  }
}
