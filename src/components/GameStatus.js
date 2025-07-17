import { StyleSheet, Text, View } from 'react-native';

const GameStatus = ({ gameOver, won, currentPlayer, playerTurn }) => {
  if (gameOver) {
    return (
      <View style={[styles.container, won ? styles.won : styles.lost]}>
        <Text style={styles.text}>{won ? '¡Ganaste!' : '¡Perdiste!'}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {playerTurn ? 'Tu turno' : 'Turno del oponente'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  won: {
    backgroundColor: '#4CAF50',
  },
  lost: {
    backgroundColor: '#F44336',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default GameStatus;