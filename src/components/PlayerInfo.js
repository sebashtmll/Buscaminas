import { StyleSheet, Text, View } from 'react-native';

const PlayerInfo = ({ player, isCurrent, isYou }) => {
  return (
    <View style={[styles.container, isCurrent && styles.currentPlayer]}>
      <Text style={styles.name}>{player.username} {isYou ? '(Tú)' : ''}</Text>
      <Text>Movimientos: {player.moves}</Text>
      <Text>Puntaje: {player.score}</Text>
      <Text>Banderas: {player.flags}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
    width: '45%',
  },
  currentPlayer: {
    borderWidth: 2,
    borderColor: '#2196F3',
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default PlayerInfo;