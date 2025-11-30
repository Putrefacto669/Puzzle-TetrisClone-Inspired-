// Definición de los bloques de Tetris
const PIECES = {
    I: {
        shape: [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        color: 'I'
    },
    J: {
        shape: [
            [1, 0, 0],
            [1, 1, 1],
            [0, 0, 0]
        ],
        color: 'J'
    },
    L: {
        shape: [
            [0, 0, 1],
            [1, 1, 1],
            [0, 0, 0]
        ],
        color: 'L'
    },
    O: {
        shape: [
            [1, 1],
            [1, 1]
        ],
        color: 'O'
    },
    S: {
        shape: [
            [0, 1, 1],
            [1, 1, 0],
            [0, 0, 0]
        ],
        color: 'S'
    },
    T: {
        shape: [
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 0]
        ],
        color: 'T'
    },
    Z: {
        shape: [
            [1, 1, 0],
            [0, 1, 1],
            [0, 0, 0]
        ],
        color: 'Z'
    }
};

// Generar una pieza aleatoria
function getRandomPiece() {
    const pieces = Object.keys(PIECES);
    const randomPiece = pieces[Math.floor(Math.random() * pieces.length)];
    return {
        type: randomPiece,
        shape: PIECES[randomPiece].shape,
        color: PIECES[randomPiece].color,
        row: 0,
        col: Math.floor((BOARD_WIDTH - PIECES[randomPiece].shape[0].length) / 2)
    };
}
