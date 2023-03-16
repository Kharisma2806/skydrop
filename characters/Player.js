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

  jump(){
    this.y = -20;
  }
  /*jump() {
    if (!this.isJumping) {
      this.velocityY = -20;
      this.isJumping = true;
    }
  }

  update() {
    this.velocityY += this.gravity;
    this.y += this.velocityY;
    if (this.y + this.height > 400) {
      this.y = 400 - this.height;
    }
  }*/

  // Add the jump. JUMP needs to decrease y. Example this.y -= 20. we want it to go up for a while (very short, 300ms) and then increase it for another 300ms
  // setInverval setTimeout. 
} 

export default Player;

