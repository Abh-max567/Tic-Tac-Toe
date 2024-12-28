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
