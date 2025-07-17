
export const createBoard = (rows, cols, mines) => {
  // Crear tablero vacío
  const board = Array(rows).fill().map(() => 
    Array(cols).fill().map(() => ({
      value: 0,
      revealed: false,
      flagged: false,
    }))
  );

  
  // Colocar minas aleatoriamente
  let minesPlaced = 0;
  while (minesPlaced < mines) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);
    
    if (board[row][col].value !== 'mine') {
      board[row][col].value = 'mine';
      minesPlaced++;
      
      // Incrementar números alrededor de la mina
      for (let r = Math.max(0, row - 1); r <= Math.min(rows - 1, row + 1); r++) {
        for (let c = Math.max(0, col - 1); c <= Math.min(cols - 1, col + 1); c++) {
          if (board[r][c].value !== 'mine') {
            board[r][c].value++;
          }
        }
      }
    }
  }

  return board;
};

export const revealCell = (board, row, col) => {
  const newBoard = JSON.parse(JSON.stringify(board));
  const cell = newBoard[row][col];

  if (cell.revealed || cell.flagged) return newBoard;

  cell.revealed = true;

  // Si es una celda vacía (0), revelar recursivamente las celdas adyacentes
  if (cell.value === 0) {
    const rows = newBoard.length;
    const cols = newBoard[0].length;

    for (let r = Math.max(0, row - 1); r <= Math.min(rows - 1, row + 1); r++) {
      for (let c = Math.max(0, col - 1); c <= Math.min(cols - 1, col + 1); c++) {
        if (!newBoard[r][c].revealed && !newBoard[r][c].flagged) {
          newBoard[r][c].revealed = true;
          if (newBoard[r][c].value === 0) {
            revealCell(newBoard, r, c);
          }
        }
      }
    }
  }

  return newBoard;
};

export const checkGameStatus = (board) => {
  let gameOver = false;
  let won = true;
  const rows = board.length;
  const cols = board[0].length;

  // Verificar si se reveló una mina (game over)
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (board[row][col].revealed && board[row][col].value === 'mine') {
        gameOver = true;
        won = false;
        return { gameOver, won };
      }
    }
  }

  // Verificar si se revelaron todas las celdas sin minas (victoria)
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (!board[row][col].revealed && board[row][col].value !== 'mine') {
        won = false;
        return { gameOver, won };
      }
    }
  }

  gameOver = true;
  return { gameOver, won };
};

export const getLevelConfig = (level) => {
  switch (level) {
    case 'beginner':
      return { rows: 9, cols: 9, mines: 10 };
    case 'intermediate':
      return { rows: 16, cols: 16, mines: 40 };
    case 'expert':
      return { rows: 16, cols: 30, mines: 99 };
    default:
      return { rows: 9, cols: 9, mines: 10 };
  }
};