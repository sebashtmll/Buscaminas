// import { StyleSheet, Text, View } from 'react-native';

// const PlayerInfo = ({ player, isCurrent, isYou }) => {
//   return (
//     <View style={[styles.container, isCurrent && styles.currentPlayer]}>
//       <Text style={styles.name}>{player.username} {isYou ? '(Tú)' : ''}</Text>
//       <Text>Movimientos: {player.moves}</Text>
//       <Text>Puntaje: {player.score}</Text>
//       <Text>Banderas: {player.flags}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 10,
//     borderRadius: 5,
//     backgroundColor: '#e0e0e0',
//     width: '45%',
//   },
//   currentPlayer: {
//     borderWidth: 2,
//     borderColor: '#2196F3',
//   },
//   name: {
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
// });

// export default PlayerInfo;

import { StyleSheet, Text, View } from "react-native"

const PlayerInfo = ({ player, isCurrent, isYou }) => {
  return (
    <View style={[styles.container, isCurrent && styles.currentPlayer]}>
      <Text style={styles.name}>
        {player.username} {isYou ? "(Tú)" : ""}
      </Text>
      <Text style={styles.stat}>Movimientos: {player.moves}</Text>
      <Text style={styles.stat}>Puntaje: {player.score}</Text>
      <Text style={styles.stat}>Banderas: {player.flags}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#374753",
    width: "45%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  currentPlayer: {
    borderWidth: 2.5,
    borderColor: "#566982",
    backgroundColor: "#3A3753",
  },
  name: {
    fontWeight: "bold",
    marginBottom: 8,
    fontSize: 16,
    color: "#2C3E50",
  },
  stat: {
    fontSize: 14,
    color: "#34495E",
    marginBottom: 2,
  },
})

export default PlayerInfo
