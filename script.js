let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let scores = { X: 0, O: 0, draw: 0 };

const cells = document.querySelectorAll(".cell");
const gameInfo = document.getElementById("gameInfo");
const resetBtn = document.getElementById("resetBtn");
const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");
const scoreDraw = document.getElementById("scoreDraw");

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // columns
  [0, 4, 8],
  [2, 4, 6], // diagonals
];

function handleCellClick(e) {
  const index = e.target.dataset.index;

  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add("taken", currentPlayer.toLowerCase());

  if (checkWin()) {
    gameInfo.textContent = `Player ${currentPlayer} Wins! 🎉`;
    gameActive = false;
    scores[currentPlayer]++;
    updateScores();
    highlightWinner();
  } else if (board.every((cell) => cell !== "")) {
    gameInfo.textContent = "It's a Draw! 🤝";
    gameActive = false;
    scores.draw++;
    updateScores();
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    gameInfo.textContent = `Player ${currentPlayer}'s Turn`;
  }
}

function checkWin() {
  return winPatterns.some((pattern) => {
    const [a, b, c] = pattern;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function highlightWinner() {
  winPatterns.forEach((pattern) => {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      cells[a].classList.add("winner");
      cells[b].classList.add("winner");
      cells[c].classList.add("winner");
    }
  });
}

function updateScores() {
  scoreX.textContent = scores.X;
  scoreO.textContent = scores.O;
  scoreDraw.textContent = scores.draw;
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  gameInfo.textContent = `Player ${currentPlayer}'s Turn`;

  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("taken", "x", "o", "winner");
  });
}

cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
resetBtn.addEventListener("click", resetGame);
