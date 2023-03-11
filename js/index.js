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


function startGame() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  
  let score = 0;
  const scoreElement = document.getElementById("score");

  let timer = 60;
  const timerElement = document.getElementById("timer");
  timerElement.textContent = `Time: ${timer}`;

  // Decrement the timer every second and update the timer display element
  const intervalId = setInterval(() => {
    timer--;
    timerElement.textContent = `Time: ${timer}`;
    if (timer <= 0) {
      clearInterval(intervalId);
      alert(`Time's up! Your score is ${score}.`);
      return;
    }
  }, 1000);


  // Clear the canvas and redraw the images
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(coopbackground, 0, 0, canvas.width, canvas.height);

  const player = new Player(0, 0, 0, 0, ctx);
  ctx.drawImage(chicken, player.x, player.y, player.width, player.height);

  const freshEgg = new goodEgg(0, 0, 0, 0, ctx);
  ctx.drawImage(freshegg, freshEgg.x, freshEgg.y, freshEgg.width, freshEgg.height);

  const rottenEgg = new badEgg(0, 0, 0, 0, ctx);
  ctx.drawImage(rottenegg, rottenEgg.x, rottenEgg.y, rottenEgg.width, rottenEgg.height);

  // Add an event listener to listen for keyboard input
  function playerListener() {
    document.addEventListener('keydown', (event) => {
      //console.log(event);
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
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(coopbackground, 0, 0, canvas.width, canvas.height);
      ctx.drawImage(chicken, player.x, player.y, player.width, player.height);
      ctx.drawImage(freshegg, freshEgg.x, freshEgg.y, freshEgg.width, freshEgg.height);
      ctx.drawImage(rottenegg, rottenEgg.x, rottenEgg.y, rottenEgg.width, rottenEgg.height);
    });
  }

  // Add new code to randomly generate freshEgg
  function generateFreshEgg() {
  freshEgg.y += 8; // set the speed of falling
  if (freshEgg.y > canvas.height) { // check if the egg has reached the bottom of the canvas
    freshEgg.y = -60; // reset the egg to the top of the canvas
    freshEgg.x = Math.floor(Math.random() * (canvas.width - freshEgg.width)); // set a random x-coordinate for the egg
  }
  checkCollision();
}

function checkCollision() {
  if (freshEgg.y + freshEgg.height >= player.y &&
      freshEgg.y <= player.y + player.height &&
      freshEgg.x + freshEgg.width >= player.x &&
      freshEgg.x <= player.x + player.width) {
    //console.log('Collision detected');
    score++;
    scoreElement.textContent = `Score: ${score}`;
  }
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
  }

  setInterval(() => { // Call the generateFreshEgg function every 80 milliseconds
    generateRottenEgg();
  }, 80);
  
  // SET INTERVAL THT CHANGES THE INNERHTML or INNETEXT of #timer (query selector)
  playerListener() // Call the function after it has been defined
}
