// Mover la pieza hacia la izquierda
function moveLeft() {
    if (isPaused || isGameOver) return;
    clearPiece();
    if (isValidMove(currentPiece, 0, -1)) {
        currentPiece.col--;
    }
    drawPiece();
}

// Mover la pieza hacia la derecha
function moveRight() {
    if (isPaused || isGameOver) return;
    clearPiece();
    if (isValidMove(currentPiece, 0, 1)) {
        currentPiece.col++;
    }
    drawPiece();
}

// Configurar controles de teclado y botones
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('start-btn').addEventListener('click', startGame);
    document.getElementById('pause-btn').addEventListener('click', togglePause);
    document.getElementById('reset-btn').addEventListener('click', startGame);
    document.getElementById('restart-btn').addEventListener('click', startGame);

    document.addEventListener('keydown', (e) => {
        if (isGameOver) return;
        switch (e.key) {
            case 'ArrowLeft': moveLeft(); break;
            case 'ArrowRight': moveRight(); break;
            case 'ArrowDown': moveDown(); break;
            case 'ArrowUp': rotatePiece(); break;
            case ' ': dropPiece(); break;
            case 'p': togglePause(); break;
        }
    });
});
