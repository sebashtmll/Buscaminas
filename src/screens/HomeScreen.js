import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import GameBoard from '../components/GameBoard';
import { checkGameStatus, createBoard, revealCell, toggleFlag } from '../utils/gameLogic';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  buttonGroup: {
    width: '80%',
    marginVertical: 20,
    height: 180,
    justifyContent: 'space-between',
  },
  result: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff5722',
    marginVertical: 10,
  }
});

const BOARD_ROWS = 9;
const BOARD_COLS = 9;
const BOARD_MINES = 10;

const HomeScreen = ({ navigation }) => {
  const [mode, setMode] = useState(null); // null, 'single', 'multi'
  const [board, setBoard] = useState(createBoard(BOARD_ROWS, BOARD_COLS, BOARD_MINES));
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  const startGame = (selectedMode) => {
    setMode(selectedMode);
    setBoard(createBoard(BOARD_ROWS, BOARD_COLS, BOARD_MINES));
    setGameOver(false);
    setWon(false);
  };

  const handleCellPress = (row, col) => {
    if (gameOver || board[row][col].flagged) return;
    const newBoard = revealCell(board, row, col);
    setBoard(newBoard);
    const status = checkGameStatus(newBoard);
    if (status.gameOver) {
      setGameOver(true);
      setWon(status.won);
    }
  };

  const handleCellLongPress = (row, col) => {
    if (gameOver || board[row][col].revealed) return;
    setBoard(toggleFlag(board, row, col));
  };

  const resetGame = () => {
    setBoard(createBoard(BOARD_ROWS, BOARD_COLS, BOARD_MINES));
    setGameOver(false);
    setWon(false);
  };

  // Si el usuario aún no ha elegido modo, muestra el menú
  if (!mode) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Buscaminas Multiplayer</Text>
        <View style={styles.buttonGroup}>
          <Button
            title="Un Jugador"
            onPress={() => startGame('single')}
          />
          <Button
            title="Multijugador (LAN)"
            onPress={() => navigation.navigate('MultiplayerSetup')}
          />
          <Button
            title="Configuración"
            onPress={() => navigation.navigate('Settings')}
          />
        </View>
      </View>
    );
  }

  // Si el usuario eligió "Un Jugador", muestra el tablero
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {mode === 'single' ? 'Modo Un Jugador' : 'Modo Multijugador'}
      </Text>
      <GameBoard
        board={board}
        onCellPress={handleCellPress}
        onCellLongPress={handleCellLongPress}
        disabled={gameOver}
        gameOver={gameOver}
        level="beginner"
      />
      {gameOver && (
        <Text style={styles.result}>
          {won ? '¡Ganaste!' : '¡Perdiste!'}
        </Text>
      )}
      <View style={styles.buttonGroup}>
        <Button title="Reiniciar Juego" onPress={resetGame} />
        <Button title="Volver al Menú" onPress={() => setMode(null)} />
      </View>
    </View>
  );
};

export default HomeScreen;