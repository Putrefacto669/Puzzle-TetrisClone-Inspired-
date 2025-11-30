const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const EMPTY = 'empty';

let board = [];

// Inicializar el tablero
function initializeBoard() {
    board = [];
    for (let row = 0; row < BOARD_HEIGHT; row++) {
        board[row] = Array(BOARD_WIDTH).fill(EMPTY);
    }
    renderBoard();
}

// Renderizar el tablero en el DOM
function renderBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
    for (let row = 0; row < BOARD_HEIGHT; row++) {
        for (let col = 0; col < BOARD_WIDTH; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            if (board[row][col] !== EMPTY) {
                cell.classList.add('filled', board[row][col]);
            }
            boardElement.appendChild(cell);
        }
    }
}

// Renderizar la siguiente pieza
function renderNextPiece(nextPiece) {
    const nextPieceElement = document.getElementById('next-piece');
    nextPieceElement.innerHTML = '';
    const piece = PIECES[nextPiece.type];

    for (let row = 0; row < piece.shape.length; row++) {
        for (let col = 0; col < piece.shape[row].length; col++) {
            const cell = document.createElement('div');
            if (piece.shape[row][col]) {
                cell.classList.add('cell', 'filled', piece.color);
            } else {
                cell.classList.add('cell');
            }
            nextPieceElement.appendChild(cell);
        }
    }
}

// Verificar si un movimiento es válido
function isValidMove(piece, rowOffset = 0, colOffset = 0) {
    for (let row = 0; row < piece.shape.length; row++) {
        for (let col = 0; col < piece.shape[row].length; col++) {
            if (piece.shape[row][col]) {
                const newRow = piece.row + row + rowOffset;
                const newCol = piece.col + col + colOffset;

                if (newCol < 0 || newCol >= BOARD_WIDTH || newRow >= BOARD_HEIGHT) {
                    return false;
                }
                if (newRow >= 0 && board[newRow][newCol] !== EMPTY) {
                    return false;
                }
            }
        }
    }
    return true;
}

// Verificar y eliminar líneas completas
function checkLines() {
    let linesCleared = 0;
    for (let row = BOARD_HEIGHT - 1; row >= 0; row--) {
        if (board[row].every(cell => cell !== EMPTY)) {
            board.splice(row, 1);
            board.unshift(Array(BOARD_WIDTH).fill(EMPTY));
            linesCleared++;
            row++;
        }
    }
    return linesCleared;
}

// Fijar la pieza en el tablero
function lockPiece(piece) {
    for (let row = 0; row < piece.shape.length; row++) {
        for (let col = 0; col < piece.shape[row].length; col++) {
            if (piece.shape[row][col]) {
                const boardRow = piece.row + row;
                const boardCol = piece.col + col;
                if (boardRow >= 0) {
                    board[boardRow][boardCol] = piece.color;
                }
            }
        }
    }
}
