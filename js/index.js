import Player from "../characters/Player.js";
import goodEgg from "../characters/good egg.js";
import badEgg from "../characters/bad egg.js";

window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };
};

// Create a new image
const coopbackground = new Image();
const chicken = new Image(); 
const freshegg = new Image();
const rottenegg = new Image();// Create new img element

// Set the source of the image
coopbackground.src = "./images/coop-background.png";
chicken.src = "./images/hen.png";
freshegg.src = "./images/goodegg.png";
rottenegg.src = "./images/bad-egg.png";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function startGame() {

  let isJumping = false;

  // Clear the canvas and redraw the images
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(coopbackground, 0, 0, canvas.width, canvas.height);

  const player = new Player(0, 0, 0, 0, ctx);
  ctx.drawImage(chicken, player.x, player.y, player.width, player.height);

  const freshEgg = new goodEgg(0, 0, 0, 0, ctx);
  ctx.drawImage(freshegg, freshEgg.x, freshEgg.y, freshEgg.width, freshEgg.height);

  const rottenEgg = new badEgg(0, 0, 0, 0, ctx);
  ctx.drawImage(rottenegg, rottenEgg.x, rottenEgg.y, rottenEgg.width, rottenEgg.height);
  
  let myAudio = document.getElementById("sound")
  myAudio.play();

  let score = 0;
  const scoreElement = document.getElementById("score");

  let rottenEggCount = 0;

  let timer = 60;
  const timerElement = document.getElementById("timer");
  timerElement.textContent = `Time: ${timer}`;

  let velocity = 0;

  // Add an event listener to listen for keyboard input
  function playerListener() {
    document.addEventListener('keydown', (event) => {
    event.preventDefault();
      switch (event.code) {
        case "ArrowLeft":
          if (player.x > 0) {
            player.moveLeft();
          }
          break;
        case "ArrowRight":
          if (player.x < canvas.width - player.width) {
            player.moveRight();
          }
          break;
        case "Space":
          if (!isJumping) {
          isJumping = true;
          jump();
          }
          break;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(coopbackground, 0, 0, canvas.width, canvas.height);
      ctx.drawImage(chicken, player.x, player.y, player.width, player.height);
      ctx.drawImage(freshegg, freshEgg.x, freshEgg.y, freshEgg.width, freshEgg.height);
      ctx.drawImage(rottenegg, rottenEgg.x, rottenEgg.y, rottenEgg.width, rottenEgg.height);
    });
  }

  function generateFreshEgg() {
  freshEgg.y += 4; // set the speed of falling
  if (freshEgg.y > canvas.height) { // check if the egg has reached the bottom of the canvas
    freshEgg.y = -60; // reset the egg to the top of the canvas
    freshEgg.x = Math.floor(Math.random() * (canvas.width - freshEgg.width)); // set a random x-coordinate for the egg
  }
  if (checkCollision()) {
    // if there is a collision, remove the egg from the canvas
    freshEgg.y = -60;
    freshEgg.x = -60;
  }
}

function checkCollision() {
  if (freshEgg.y + freshEgg.height > player.y &&
      freshEgg.y < player.y + player.height &&
      freshEgg.x + freshEgg.width > player.x &&
      freshEgg.x < player.x + player.width) {
    //console.log('Collision detected');
    score++;
    scoreElement.textContent = `Score: ${score}`;

    const soundEffect = new Audio('../sounds/collect-ring-15982 (2).mp3');
    soundEffect.play();

    return true;
  }
  return false;
}
  
  setInterval(() => { // Call the generateFreshEgg function every 50 milliseconds
    generateFreshEgg();
  }, 50);

  function generateRottenEgg() {
  rottenEgg.y += 8; // set the speed of falling
  if (rottenEgg.y > canvas.height) { // check if the egg has reached the bottom of the canvas
    rottenEgg.y = -60; // reset the egg to the top of the canvas
    rottenEgg.x = Math.floor(Math.random() * (canvas.width - rottenEgg.width)); // set a random x-coordinate for the egg
  }
  if (checkRottenEggCollision()) {
    // if there is a collision, remove the egg from the canvas and increment the rottenEggCount
    rottenEgg.y = -60;
    rottenEgg.x = -60;
    rottenEggCount++;
    if (rottenEggCount >= 3) {
      clearInterval(freshEggInterval);
      clearInterval(rottenEggInterval);
      clearInterval(timerInterval);
      alert(`Game over! You caught 3 rotten eggs under 1 minute.`);
    }
  }
}

function checkRottenEggCollision() {
  if (rottenEgg.y + rottenEgg.height > player.y &&
      rottenEgg.y < player.y + player.height &&
      rottenEgg.x + rottenEgg.width > player.x &&
      rottenEgg.x < player.x + player.width) {

        const soundEffect2 = new Audio('../sounds/button-124476.mp3');
    soundEffect2.play();

    //console.log('Collision detected');
    return true;
  }
  return false;
}

const freshEggInterval = setInterval(() => { // Call the generateFreshEgg function every 50 milliseconds
  generateFreshEgg();
}, 50);

const rottenEggInterval = setInterval(() => { // Call the generateFreshEgg function every 80 milliseconds
  generateRottenEgg();
}, 80);

const timerInterval = setInterval(() => {
  timer--;
  timerElement.textContent = `Time: ${timer}`;
  if (timer <= 0) {
    clearInterval(freshEggInterval);
    clearInterval(rottenEggInterval);
    clearInterval(timerInterval);
    alert(`Time's up! Your score is ${score}.`);
    return;
  }
}, 1000);

function jump() {
    velocity = -10;
    setTimeout(() => {
      velocity = 10;
      isJumping = false; // Set isJumping to false when the player lands
    }, 500);
     const jumpSound = new Audio('../sounds/cartoon-jump-6462.mp3');
     jumpSound.play();
  }

function move() {
  velocity += 0.5; // add gravity to the velocity
  player.y += velocity; // update the vertical position
  if (player.y + player.height > canvas.height) { // check if the player has hit the ground
    player.y = canvas.height - player.height; // reset the player's position to the ground
    velocity = 0; // reset the velocity
    isJumping = false; // reset the jumping flag
  }
}

function gameLoop() {
  // update the player's position
  move();

  // draw the game elements
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(coopbackground, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(chicken, player.x, player.y, player.width, player.height);
  ctx.drawImage(freshegg, freshEgg.x, freshEgg.y, freshEgg.width, freshEgg.height);
  ctx.drawImage(rottenegg, rottenEgg.x, rottenEgg.y, rottenEgg.width, rottenEgg.height);

  // continue the game loop
  requestAnimationFrame(gameLoop);
}

  playerListener(); // Call the function after it has been defined
  gameLoop(); // start the game loop
}
