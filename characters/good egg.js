class goodEgg {
  constructor(ctx) {
    this.x = 50;
    this.y = 10;
    this.width = 30;
    this.height = 40;
    this.ctx = ctx;
  }

fall() {
    this.y += Math.floor(Math.random() * 5) + 1; // change the position of the egg vertically in each frame
    if (this.y > this.ctx.canvas.height) { // if the egg reaches the bottom of the canvas, reset its position to the top
      this.y = 0;
      this.x = Math.floor(Math.random() * (this.ctx.canvas.width - this.width));
    }
  }

  draw() {
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
} 

export default goodEgg;
