// Estado del juego
let currentPiece = null;
let nextPiece = null;
let score = 0;
let isPaused = false;
let isGameOver = false;
let dropSpeed = 1000;
let gameInterval = null;

// Elementos del DOM
const scoreElement = document.getElementById('score');
const gameOverElement = document.getElementById('game-over');
const finalScoreElement = document.getElementById('final-score');

// Dibujar la pieza actual
function drawPiece() {
    clearPiece();
    for (let row = 0; row < currentPiece.shape.length; row++) {
        for (let col = 0; col < currentPiece.shape[row].length; col++) {
            if (currentPiece.shape[row][col]) {
                const boardRow = currentPiece.row + row;
                const boardCol = currentPiece.col + col;
                if (boardRow >= 0 && boardRow < BOARD_HEIGHT && boardCol >= 0 && boardCol < BOARD_WIDTH) {
                    board[boardRow][boardCol] = currentPiece.color;
                }
            }
        }
    }
    renderBoard();
}

// Borrar la pieza actual
function clearPiece() {
    for (let row = 0; row < currentPiece.shape.length; row++) {
        for (let col = 0; col < currentPiece.shape[row].length; col++) {
            if (currentPiece.shape[row][col]) {
                const boardRow = currentPiece.row + row;
                const boardCol = currentPiece.col + col;
                if (boardRow >= 0 && boardRow < BOARD_HEIGHT && boardCol >= 0 && boardCol < BOARD_WIDTH) {
                    board[boardRow][boardCol] = EMPTY;
                }
            }
        }
    }
}

// Mover la pieza hacia abajo
function moveDown() {
    if (isPaused || isGameOver) return;
    clearPiece();
    if (isValidMove(currentPiece, 1, 0)) {
        currentPiece.row++;
        drawPiece();
    } else {
        drawPiece();
        lockPiece(currentPiece);
        const lines = checkLines();
        if (lines > 0) updateScore(lines);
        placeNewPiece();
    }
}

// Rotar la pieza
function rotatePiece() {
    if (isPaused || isGameOver) return;
    clearPiece();
    const rotated = {
        ...currentPiece,
        shape: currentPiece.shape[0].map((_, i) =>
            currentPiece.shape.map(row => row[i]).reverse()
        )
    };
    if (isValidMove(rotated)) {
        currentPiece.shape = rotated.shape;
    }
    drawPiece();
}

// Soltar la pieza hasta el fondo
function dropPiece() {
    if (isPaused || isGameOver) return;
    clearPiece();
    while (isValidMove(currentPiece, 1, 0)) {
        currentPiece.row++;
    }
    drawPiece();
    lockPiece(currentPiece);
    const lines = checkLines();
    if (lines > 0) updateScore(lines);
    placeNewPiece();
}

// Colocar nueva pieza
function placeNewPiece() {
    currentPiece = nextPiece || getRandomPiece();
    nextPiece = getRandomPiece();
    renderNextPiece(nextPiece);
    if (!isValidMove(currentPiece)) {
        gameOver();
        return;
    }
    drawPiece();
}

// Actualizar puntuación
function updateScore(linesCleared) {
    const points = [0, 40, 100, 300, 1200];
    const level = Math.floor(score / 1000) + 1;
    score += points[linesCleared] * level;
    scoreElement.textContent = score;
    const newSpeed = Math.max(100, 1000 - Math.floor(score / 1000) * 100);
    if (newSpeed !== dropSpeed) {
        dropSpeed = newSpeed;
        if (gameInterval) clearInterval(gameInterval);
        gameInterval = setInterval(moveDown, dropSpeed);
    }
}

// Iniciar el juego
function startGame() {
    if (gameInterval) clearInterval(gameInterval);
    initializeBoard();
    score = 0;
    scoreElement.textContent = score;
    dropSpeed = 1000;
    isPaused = false;
    isGameOver = false;
    gameOverElement.classList.add('hidden');
    nextPiece = getRandomPiece();
    placeNewPiece();
    gameInterval = setInterval(moveDown, dropSpeed);
}

// Pausar/reanudar
function togglePause() {
    if (isGameOver) return;
    isPaused = !isPaused;
    document.getElementById('pause-btn').textContent = isPaused ? 'REANUDAR' : 'PAUSA';
    if (isPaused) {
        clearInterval(gameInterval);
    } else {
        gameInterval = setInterval(moveDown, dropSpeed);
    }
}

// Fin del juego
function gameOver() {
    isGameOver = true;
    clearInterval(gameInterval);
    finalScoreElement.textContent = score;
    gameOverElement.classList.remove('hidden');
}
