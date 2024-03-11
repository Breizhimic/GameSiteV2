// Récupère l'élément canvas et son contexte de dessin
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Définit la taille des blocs du serpent et de la nourriture
const blockSize = 20;

// Initialise le serpent, la nourriture, la direction du mouvement, le score et l'état du jeu
let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 10 };
let dx = 1;
let dy = 0;
let score = 0;
let isGameOver = false;

// Dessine un bloc à une position donnée
function drawBlock(x, y) {
  ctx.fillStyle = "green";
  ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
  ctx.strokeStyle = "black";
  ctx.strokeRect(x * blockSize, y * blockSize, blockSize, blockSize);
}

// Dessine le serpent en dessinant chaque segment
function drawSnake() {
  snake.forEach(segment => drawBlock(segment.x, segment.y));
}

// Dessine la nourriture
function drawFood() {
  drawBlock(food.x, food.y);
}

// Déplace le serpent en ajoutant un nouveau segment à la tête et en supprimant le dernier segment de la queue
function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    score += 10;
    document.getElementById("score").innerText = score;
    generateFood();
  } else {
    snake.pop();
  }
}

// Génère de la nourriture à une position aléatoire
function generateFood() {
  food.x = Math.floor(Math.random() * (canvas.width / blockSize));
  food.y = Math.floor(Math.random() * (canvas.height / blockSize));
  snake.forEach(segment => {
    if (food.x === segment.x && food.y === segment.y) {
      generateFood();
    }
  });
}

// Vérifie si le serpent a heurté le bord du canvas ou lui-même
function checkCollision() {
  const head = snake[0];
  if (head.x < 0 || head.x >= canvas.width / blockSize || head.y < 0 || head.y >= canvas.height / blockSize) {
    gameOver();
  }
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      gameOver();
    }
  }
}

// Termine le jeu et affiche le score final
function gameOver() {
  isGameOver = true;
  clearInterval(gameLoop);
  document.getElementById("gameOverText").innerText = "Game Over! Your score: " + score;
  document.getElementById("score").innerText = "0";
}

// Efface le canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Met à jour le jeu en dessinant le serpent et la nourriture, en déplaçant le serpent et en vérifiant les collisions
function updateGame() {
  if (isGameOver) return;
  clearCanvas();
  drawSnake();
  drawFood();
  moveSnake();
  checkCollision();
}

// Gère les événements de pression de touche pour changer la direction du serpent
function keyDownHandler(event) {
  const keyPressed = event.key;
  if (keyPressed === "ArrowUp" && dy === 0) {
    dx = 0;
    dy = -1;
  } else if (keyPressed === "ArrowDown" && dy === 0) {
    dx = 0;
    dy = 1;
  } else if (keyPressed === "ArrowLeft" && dx === 0) {
    dx = -1;
    dy = 0;
  } else if (keyPressed === "ArrowRight" && dx === 0) {
    dx = 1;
    dy = 0;
  }
}

// Commence le jeu en réinitialisant le serpent, le score, l'état du jeu et en générant de la nourriture
function startGame() {
  snake = [{ x: 10, y: 10 }];
  dx = 1;
  dy = 0;
  score = 0;
  isGameOver = false;
  document.getElementById("gameOverText").innerText = "";
  document.getElementById("score").innerText = score;
  generateFood();
  gameLoop = setInterval(updateGame, 100);
}

// Ajoute un gestionnaire d'événements pour les touches pressées
document.addEventListener("keydown", keyDownHandler);
