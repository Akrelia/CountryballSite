const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const sheet = new Image();
const sheetSize = 50;
const spawnChance = 50;
const spawnRate = 100;

let backgroundColor = "rgba(66,46,67,255)";
let gradientBackground;
let width = canvas.width;
let height = canvas.height;
let sizeMax = 3;
let balls = [];

let sheetCount;
let lastSpawn;

initialize();

function initialize() {
  sheet.onload = onSheetLoaded;
  sheet.src = "images/balls.png";

  canvas.width = width = window.innerWidth;
  canvas.height = height = window.innerHeight;

  createGradientBackground();

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
  context.fillStyle = gradientBackground;
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

function onSheetLoaded() {
  sheetCount = sheet.width / sheetSize;

  setInterval(spawnBalls, spawnRate);
}

function createGradientBackground() {
  gradientBackground = context.createLinearGradient(0, 0, 0, height);
  gradientBackground.addColorStop("0.3", "#643966AA");
  gradientBackground.addColorStop("0.6", "#422e43AA");
}
