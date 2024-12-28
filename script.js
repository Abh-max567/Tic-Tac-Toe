const cells = document.querySelectorAll("[data-cell]");
const messageBox = document.getElementById("message");
const restartButton = document.getElementById("restartButton");

let currentPlayer = "X";
let isGameActive = true;
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const messages = {
  start: ["Let the game begin! 🎮", "Who will win? 🤔", "Show your skills! 💪"],
  move: ["Nice move! 👍", "You're on fire! 🔥", "Keep it up! 💥"],
  win: ["You did it! 🎉", "Victory is yours! 🏆", "Amazing play! 🌟"],
  draw: ["It's a tie! 🤝", "No winners this time! 😶", "Try again! 🔄"],
};

function showRandomMessage(type) {
  const randomMessage = messages[type][Math.floor(Math.random() * messages[type].length)];
  messageBox.textContent = randomMessage;
}

function checkWin() {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cells[index].textContent === currentPlayer;
    });
  });
}

function checkDraw() {
  return [...cells].every((cell) => cell.textContent !== "");
}

function handleClick(event) {
  const cell = event.target;

  if (cell.textContent !== "" || !isGameActive) return;

  cell.textContent = currentPlayer;
  cell.classList.add("taken");

  if (checkWin()) {
    showRandomMessage("win");
    isGameActive = false;
    return;
  }

  if (checkDraw()) {
    showRandomMessage("draw");
    isGameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  showRandomMessage("move");
}

function restartGame() {
  currentPlayer = "X";
  isGameActive = true;
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("taken");
  });
  showRandomMessage("start");
}

cells.forEach((cell) => {
  cell.addEventListener("click", handleClick);
});

restartButton.addEventListener("click", restartGame);

showRandomMessage("start");
let board = ["", "", "", "", "", "", "", "", ""];  // Track game board
let currentPlayer = "X";  // X is the player, O is the computer
let gameOver = false;  // Flag for checking if the game is over

// Function to check if there's a winner
function checkWinner() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
    [0, 4, 8], [2, 4, 6] // Diagonal
  ];

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      highlightWinningLine(combination);  // Highlight winning line
      return board[a];  // Return the winner
    }
  }
  return null;
}

// Function to handle a player's move (either human or computer)
function handleMove(index) {
  if (board[index] === "" && !gameOver) {
    board[index] = currentPlayer;
    renderBoard();
    const winner = checkWinner();
    if (winner) {
      gameOver = true;
      displayWinner(winner);
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";  // Switch players
      if (currentPlayer === "O") {
        setTimeout(computerMove, 500);  // Wait 500ms before computer makes a move
      }
    }
  }
}

// Function for the computer to make a random move
function computerMove() {
  let availableMoves = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === "") {
      availableMoves.push(i);
    }
  }
  
  // Randomly pick a spot from the available moves
  let randomIndex = availableMoves[Math.floor(Math.random() * availableMoves.length)];
  handleMove(randomIndex);
}

// Function to display the winner
function displayWinner(winner) {
  alert(`${winner} wins!`);
  // Game is over, you can add more functionality to restart or show results
}

// Function to render the board visually (update the game UI)
function renderBoard() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell, index) => {
    cell.textContent = board[index];
  });
}

// Function to highlight the winning line
function highlightWinningLine(winningCombination) {
  const boardElement = document.getElementById("game-board");
  let line;
  const [a, b, c] = winningCombination;

  if (a === 0 && b === 1 && c === 2) {
    line = createLine("horizontal-line", boardElement);
  } else if (a === 3 && b === 4 && c === 5) {
    line = createLine("horizontal-line", boardElement);
  } else if (a === 6 && b === 7 && c === 8) {
    line = createLine("horizontal-line", boardElement);
  } else if (a === 0 && b === 3 && c === 6) {
    line = createLine("vertical-line", boardElement);
  } else if (a === 1 && b === 4 && c === 7) {
    line = createLine("vertical-line", boardElement);
  } else if (a === 2 && b === 5 && c === 8) {
    line = createLine("vertical-line", boardElement);
  } else if (a === 0 && b === 4 && c === 8) {
    line = createLine("diagonal-line", boardElement);
  } else if (a === 2 && b === 4 && c === 6) {
    line = createLine("diagonal-line", boardElement);
  }

  boardElement.appendChild(line);
}

function createLine(lineClass, boardElement) {
  const line = document.createElement("div");
  line.classList.add("winner-line", lineClass);
  return line;
}

// Event listener for clicking on a cell
document.querySelectorAll(".cell").forEach((cell, index) => {
  cell.addEventListener("click", () => handleMove(index));
});
