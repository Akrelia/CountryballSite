class Ball {
  constructor(id, size) {
    this.x = 0;
    this.id = id;
    this.rotation = Math.random() * 360;
    this.y = -50;
    this.speed = 1 * size;
    this.alive = true;
    this.size = size;
  }

  setRandomPosition(width) {
    this.x = Math.random() * width;
  }

  update(height) {
    this.rotation += this.speed * 0.01;

    this.y += this.speed;

    if (this.y >= height) {
      this.alive = false;
    }
  }

  draw(context, canvas, sheet, sheetSize) {
    let offset = (sheetSize * this.size) / 2;
    let x = canvas.width / 2;
    let y = canvas.height / 2;

    context.translate(this.x, this.y);
    context.rotate(this.rotation);
    context.drawImage(sheet, this.id * sheetSize, 0, sheetSize, sheetSize, -offset, -offset, sheetSize * this.size, sheetSize * this.size);
    context.rotate(-this.rotation);
    context.translate(-this.x, -this.y);
  }
}
