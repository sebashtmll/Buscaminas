import { useEffect, useRef, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import Board from './src/components/Board';
import GameStatus from './src/components/GameStatus';
import PlayerInfo from './src/components/PlayerInfo';
import { checkGameStatus, initGame, revealCell, toggleFlag } from './src/utils/gameLogic';
import { disconnectP2P, sendGameState, startP2PConnection } from './src/utils/p2pConnection.js';
import styles from './styles';

export default function GameScreen({ route, navigation }) {
  const { difficulty, gameMode, customSettings } = route.params;
  const [gameState, setGameState] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [players, setPlayers] = useState({
    1: { moves: 0, score: 0, flags: 0 },
    2: { moves: 0, score: 0, flags: 0 }
  });
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const connectionRef = useRef(null);

  // Inicializar el juego
  useEffect(() => {
    const initNewGame = () => {
      let settings;
      switch(difficulty) {
        case 'beginner':
          settings = { rows: 8, cols: 8, mines: 10 };
          break;
        case 'intermediate':
          settings = { rows: 12, cols: 12, mines: 30 };
          break;
        case 'custom':
          settings = customSettings;
          break;
        default:
          settings = { rows: 8, cols: 8, mines: 10 };
      }
      
      const newGameState = initGame(settings.rows, settings.cols, settings.mines);
      setGameState(newGameState);
      
      if (gameMode === 'multi') {
        connectionRef.current = startP2PConnection(
          handleReceivedGameState,
          handleConnectionLost
        );
      }
    };

    initNewGame();

    return () => {
      if (connectionRef.current) {
        disconnectP2P(connectionRef.current);
      }
    };
  }, [difficulty, gameMode, customSettings]);

  const handleReceivedGameState = (data) => {
    try {
      const parsedData = JSON.parse(data);
      setGameState(parsedData.gameState);
      setCurrentPlayer(parsedData.currentPlayer);
      setPlayers(parsedData.players);
      setGameOver(parsedData.gameOver);
      if (parsedData.winner) setWinner(parsedData.winner);
    } catch (error) {
      console.error('Error parsing game state:', error);
    }
  };

  const handleConnectionLost = () => {
    Alert.alert('Conexión perdida', 'La conexión con el otro jugador se ha perdido');
    navigation.goBack();
  };

  const handleCellPress = (row, col) => {
    if (gameOver || (gameMode === 'multi' && currentPlayer !== 1)) return;

    const newGameState = revealCell(gameState, row, col);
    
    if (newGameState.board[row][col].isMine) {
      // Jugador actual pierde
      endGame(false);
      return;
    }

    // Actualizar puntuación del jugador actual
    const revealedCount = countNewRevealedCells(gameState, newGameState);
    const updatedPlayers = {
      ...players,
      [currentPlayer]: {
        ...players[currentPlayer],
        moves: players[currentPlayer].moves + 1,
        score: players[currentPlayer].score + revealedCount
      }
    };

    setPlayers(updatedPlayers);
    setGameState(newGameState);

    // Verificar si el juego ha terminado (todas las celdas seguras reveladas)
    if (checkGameStatus(newGameState)) {
      endGame(true);
      return;
    }

    // En modo multiplayer, cambiar turno
    if (gameMode === 'multi') {
      setCurrentPlayer(2);
      const gameData = {
        gameState: newGameState,
        currentPlayer: 2,
        players: updatedPlayers,
        gameOver: false,
        winner: null
      };
      sendGameState(connectionRef.current, JSON.stringify(gameData));
    }
  };

  const handleLongPress = (row, col) => {
    if (gameOver || (gameMode === 'multi' && currentPlayer !== 1)) return;

    // Solo permitir una bandera por turno
    if (!gameState.board[row][col].isFlagged && players[currentPlayer].flags >= players[currentPlayer].moves) {
      return;
    }

    const newGameState = toggleFlag(gameState, row, col);
    const flagDelta = newGameState.board[row][col].isFlagged ? 1 : -1;
    
    const updatedPlayers = {
      ...players,
      [currentPlayer]: {
        ...players[currentPlayer],
        flags: players[currentPlayer].flags + flagDelta
      }
    };

    setPlayers(updatedPlayers);
    setGameState(newGameState);

    if (gameMode === 'multi') {
      const gameData = {
        gameState: newGameState,
        currentPlayer,
        players: updatedPlayers,
        gameOver,
        winner
      };
      sendGameState(connectionRef.current, JSON.stringify(gameData));
    }
  };

  const countNewRevealedCells = (oldState, newState) => {
    let count = 0;
    for (let row = 0; row < oldState.rows; row++) {
      for (let col = 0; col < oldState.cols; col++) {
        if (!oldState.board[row][col].isRevealed && newState.board[row][col].isRevealed) {
          count++;
        }
      }
    }
    return count;
  };

  const endGame = (isWin) => {
    let newWinner = null;
    
    if (!isWin) {
      // El jugador actual perdió
      newWinner = currentPlayer === 1 ? 2 : 1;
    } else {
      // Determinar ganador por puntaje
      if (players[1].score > players[2].score) {
        newWinner = 1;
      } else if (players[2].score > players[1].score) {
        newWinner = 2;
      } else {
        // Empate - decidir por banderas
        if (players[1].flags > players[2].flags) {
          newWinner = 1;
        } else if (players[2].flags > players[1].flags) {
          newWinner = 2;
        }
        // Si sigue empate, queda null (empate real)
      }
    }

    setGameOver(true);
    setWinner(newWinner);

    if (gameMode === 'multi') {
      const gameData = {
        gameState,
        currentPlayer,
        players,
        gameOver: true,
        winner: newWinner
      };
      sendGameState(connectionRef.current, JSON.stringify(gameData));
    }
  };

  if (!gameState) {
    return (
      <View style={styles.container}>
        <Text>Cargando juego...</Text>
      </View>
    );
  }

  return (
    <View style={styles.gameContainer}>
      <GameStatus 
        gameMode={gameMode}
        currentPlayer={currentPlayer}
        gameOver={gameOver}
        winner={winner}
      />
      
      <View style={styles.playersContainer}>
        <PlayerInfo player={1} data={players[1]} isCurrent={currentPlayer === 1} />
        {gameMode === 'multi' && <PlayerInfo player={2} data={players[2]} isCurrent={currentPlayer === 2} />}
      </View>
      
      <Board 
        board={gameState.board}
        onCellPress={handleCellPress}
        onLongPress={handleLongPress}
        disabled={gameOver || (gameMode === 'multi' && currentPlayer !== 1)}
      />
      
      {gameOver && (
        <View style={styles.gameOverContainer}>
          <Text style={styles.gameOverText}>
            {winner ? `¡Jugador ${winner} gana!` : "¡Empate!"}
          </Text>
          <Button title="Volver al inicio" onPress={() => navigation.goBack()} />
        </View>
      )}
    </View>
  );
}
