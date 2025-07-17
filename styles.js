import { Text, View } from 'react-native';
import styles from './styles';

export default function PlayerInfo({ player, data, isCurrent }) {
  return (
    <View style={[styles.playerInfo, isCurrent && styles.currentPlayer]}>
      <Text style={styles.playerTitle}>Jugador {player}</Text>
      <Text>Movimientos: {data.moves}</Text>
      <Text>Puntaje: {data.score}</Text>
      <Text>Banderas: {data.flags}</Text>
    </View>
  );
}
