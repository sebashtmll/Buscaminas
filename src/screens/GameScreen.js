import { useEffect, useRef, useState } from 'react';
import { Alert, Button, ScrollView, StyleSheet, View } from 'react-native';
import Cell from '../components/Cell';
import GameStatus from '../components/GameStatus';
import PlayerInfo from '../components/PlayerInfo';
import { checkGameStatus, createBoard, getLevelConfig, revealCell } from '../utils/gameLogic';
import { closeSocket, initSocket, sendMove, subscribeToGameUpdates } from '../utils/socketManager';

const GameScreen = ({ route, navigation }) => {
  const { mode, role, ipAddress, port, username } = route.params || {};
  const [board, setBoard] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState('player1');
  const [players, setPlayers] = useState({
    player1: { username: mode === 'single' ? 'Tú' : username || 'Jugador 1', moves: 0, score: 0, flags: 0 },
    player2: { username: mode === 'single' ? 'CPU' : 'Oponente', moves: 0, score: 0, flags: 0 }
  });
  const [level, setLevel] = useState('beginner');
  const socketRef = useRef(null);

  // Inicializar el juego
  useEffect(() => {
    const config = getLevelConfig(level);
    const initialBoard = createBoard(config.rows, config.cols, config.mines);
    setBoard(initialBoard);

    if (mode === 'multiplayer') {
      // Configurar conexión de sockets
      socketRef.current = initSocket(ipAddress, port, role === 'host', username);
      
      subscribeToGameUpdates(socketRef.current, (data) => {
        if (data.type === 'move') {
          setBoard(data.board);
          setCurrentPlayer(data.nextPlayer);
          setPlayers(data.players);
          
          const status = checkGameStatus(data.board);
          if (status.gameOver) {
            setGameOver(true);
            setWon(status.won);
            determineWinner(status.won, data.players, data.board);
          }
        }
      });

      return () => closeSocket(socketRef.current);
    }
  }, [level, mode]);

  const handleCellPress = (row, col) => {
    if (gameOver || (mode === 'multiplayer' && currentPlayer !== (role === 'host' ? 'player1' : 'player2'))) {
      return;
    }

    const newBoard = revealCell(board, row, col);
    const cell = newBoard[row][col];
    
    // Actualizar estadísticas del jugador
    const playerKey = role === 'host' ? 'player1' : 'player2';
    const updatedPlayers = { ...players };
    updatedPlayers[playerKey].moves += 1;
    
    if (cell.value !== 'mine') {
      // Calcular celdas reveladas en este movimiento
      let revealedCount = 0;
      for (let r = 0; r < newBoard.length; r++) {
        for (let c = 0; c < newBoard[0].length; c++) {
          if (newBoard[r][c].revealed && !board[r][c].revealed) {
            revealedCount++;
          }
        }
      }
      updatedPlayers[playerKey].score += revealedCount;
    }
    
    setBoard(newBoard);
    setPlayers(updatedPlayers);

    // Verificar estado del juego
    const status = checkGameStatus(newBoard);
    if (status.gameOver) {
      setGameOver(true);
      setWon(status.won);
      determineWinner(status.won, updatedPlayers, newBoard);
    }

    // En modo multiplayer, enviar el movimiento al oponente
    if (mode === 'multiplayer') {
      const nextPlayer = role === 'host' ? 'player2' : 'player1';
      sendMove(socketRef.current, {
        type: 'move',
        board: newBoard,
        players: updatedPlayers,
        nextPlayer,
        gameOver: status.gameOver,
        won: status.won
      });
      setCurrentPlayer(nextPlayer);
    }
  };

  const handleCellLongPress = (row, col) => {
    if (gameOver || board[row][col].revealed || 
        (mode === 'multiplayer' && currentPlayer !== (role === 'host' ? 'player1' : 'player2'))) {
      return;
    }

    const newBoard = [...board];
    newBoard[row][col].flagged = !newBoard[row][col].flagged;
    setBoard(newBoard);

    // Actualizar conteo de banderas
    const playerKey = role === 'host' ? 'player1' : 'player2';
    const updatedPlayers = { ...players };
    updatedPlayers[playerKey].flags += newBoard[row][col].flagged ? 1 : -1;
    setPlayers(updatedPlayers);
  };

  const determineWinner = (gameWon, playersData, finalBoard) => {
    if (mode === 'single') {
      if (gameWon) {
        Alert.alert('¡Ganaste!', 'Felicidades, has ganado el juego.');
      } else {
        Alert.alert('¡Perdiste!', 'Has pisado una mina.');
      }
      return;
    }

    // Lógica para determinar ganador en multiplayer
    let winner = null;
    
    // Verificar si alguien pisó una mina
    let mineExplodedBy = null;
    for (let row = 0; row < finalBoard.length; row++) {
      for (let col = 0; col < finalBoard[0].length; col++) {
        if (finalBoard[row][col].revealed && finalBoard[row][col].value === 'mine') {
          mineExplodedBy = finalBoard[row][col].revealedBy;
        }
      }
    }

    if (mineExplodedBy) {
      winner = mineExplodedBy === 'player1' ? 'player2' : 'player1';
    } else {
      // Comparar puntajes (celdas descubiertas)
      if (playersData.player1.score > playersData.player2.score) {
        winner = 'player1';
      } else if (playersData.player2.score > playersData.player1.score) {
        winner = 'player2';
      } else {
        // Empate en puntaje, comparar banderas
        if (playersData.player1.flags > playersData.player2.flags) {
          winner = 'player1';
        } else if (playersData.player2.flags > playersData.player1.flags) {
          winner = 'player2';
        }
      }
    }

    if (winner) {
      Alert.alert(
        '¡Juego terminado!', 
        `El ganador es: ${playersData[winner].username}`
      );
    } else {
      Alert.alert('¡Juego terminado!', 'El juego terminó en empate.');
    }
  };

  const restartGame = () => {
    const config = getLevelConfig(level);
    const newBoard = createBoard(config.rows, config.cols, config.mines);
    setBoard(newBoard);
    setGameOver(false);
    setWon(false);
    setCurrentPlayer('player1');
    setPlayers({
      player1: { ...players.player1, moves: 0, score: 0, flags: 0 },
      player2: { ...players.player2, moves: 0, score: 0, flags: 0 }
    });
  };

  return (
    <View style={styles.container}>
      <GameStatus 
        gameOver={gameOver} 
        won={won} 
        currentPlayer={currentPlayer}
        playerTurn={mode === 'multiplayer' ? 
          (currentPlayer === (role === 'host' ? 'player1' : 'player2')) : true}
      />
      
      <View style={styles.playersContainer}>
        <PlayerInfo 
          player={players.player1} 
          isCurrent={currentPlayer === 'player1'} 
          isYou={role === 'host' || mode === 'single'}
        />
        {mode === 'multiplayer' && (
          <PlayerInfo 
            player={players.player2} 
            isCurrent={currentPlayer === 'player2'} 
            isYou={role !== 'host'}
          />
        )}
      </View>
      
      <ScrollView contentContainerStyle={styles.boardContainer}>
        {board.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell, colIndex) => (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                cell={cell}
                onPress={() => handleCellPress(rowIndex, colIndex)}
                onLongPress={() => handleCellLongPress(rowIndex, colIndex)}
                disabled={gameOver || (mode === 'multiplayer' && 
                  currentPlayer !== (role === 'host' ? 'player1' : 'player2'))}
              />
            ))}
          </View>
        ))}
      </ScrollView>
      
      <View style={styles.buttonContainer}>
        <Button title="Reiniciar" onPress={restartGame} />
        <Button title="Cambiar Nivel" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  boardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  row: {
    flexDirection: 'row',
  },
  playersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
});

export default GameScreen;