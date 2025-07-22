// import { StyleSheet, Text, View } from 'react-native';

// const GameStatus = ({ gameOver, won, currentPlayer, playerTurn }) => {
//   if (gameOver) {
//     return (
//       <View style={[styles.container, won ? styles.won : styles.lost]}>
//         <Text style={styles.text}>{won ? '¡Ganaste!' : '¡Perdiste!'}</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>
//         {playerTurn ? 'Tu turno' : 'Turno del oponente'}
//       </Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 10,
//     borderRadius: 5,
//     marginBottom: 10,
//     alignItems: 'center',
//   },
//   won: {
//     backgroundColor: '#4CAF50',
//   },
//   lost: {
//     backgroundColor: '#F44336',
//   },
//   text: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });

// export default GameStatus;

import { StyleSheet, Text, View } from "react-native"

const GameStatus = ({ gameOver, won, currentPlayer, playerTurn }) => {
  if (gameOver) {
    return (
      <View style={[styles.container, won ? styles.won : styles.lost]}>
        <Text style={styles.text}>{won ? "¡Ganaste!" : "¡Perdiste!"}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{playerTurn ? "Tu turno" : "Turno del oponente"}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
    backgroundColor: "#282639",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  won: {
    backgroundColor: "#32F028",
  },
  lost: {
    backgroundColor: "#E93737",
  },
  text: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 30,
  },
})

export default GameStatus
