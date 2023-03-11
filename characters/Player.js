// Create the player
class Player {
  constructor(ctx) {
    this.x = 20;
    this.y = 400;
    this.width = 60;
    this.height = 90;
    this.ctx = ctx;
  }

  draw() {
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  moveLeft() {
    this.x -= 20;
  }
  
  moveRight() {
    this.x += 20;
  }
} 

export default Player;

