const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = true;

// Winning Combinations
const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
];

function handleCellClick() {
    const index = this.getAttribute("data-index");

    if (board[index] !== "" || !running) return;

    board[index] = currentPlayer;
    this.innerText = currentPlayer;

    checkWinner();
}

function checkWinner() {
    let roundWon = false;

    for (let condition of winConditions) {
        let [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.innerText = `Player ${currentPlayer} Wins!`;
        running = false;
    } else if (!board.includes("")) {
        statusText.innerText = "It's a Draw!";
        running = false;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.innerText = `Player ${currentPlayer}'s turn`;
    }
}

function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    running = true;
    currentPlayer = "X";
    statusText.innerText = "Player X's turn";
    cells.forEach(cell => cell.innerText = "");
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
restartBtn.addEventListener("click", restartGame);
