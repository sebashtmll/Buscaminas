// import { useState } from 'react';
// import { Dimensions, StyleSheet, View } from 'react-native';
// import Cell from '../components/Cell';

// const GameBoard = ({
//   board,
//   onCellPress,
//   onCellLongPress,
//   disabled,
//   gameOver,
//   level
// }) => {
//   // Calcular tamaño de celda dinámicamente según el tamaño del tablero
//   const windowWidth = Dimensions.get('window').width;
//   const windowHeight = Dimensions.get('window').height;
//   const numRows = board.length || 8;
//   const numCols = board[0]?.length || 8;
//   // Dejar margen para scrollbars y paddings
//   const maxBoardWidth = windowWidth * 0.95;
//   const maxBoardHeight = windowHeight * 0.55;
//   // Tamaño de celda para que el tablero quepa en pantalla, pero no menor a 28px
//   const cellSize = Math.max(28, Math.min(
//     Math.floor(maxBoardWidth / numCols),
//     Math.floor(maxBoardHeight / numRows)
//   ));

//   // Handler para pulsación larga (bandera)
//   const handleCellLongPress = (rowIndex, colIndex) => {
//     if (typeof onCellLongPress === 'function') {
//       onCellLongPress(rowIndex, colIndex);
//     } else {
//       // Si no se pasa handler, alterna bandera localmente
//       // setLocalBoard(toggleFlag(localBoard, rowIndex, colIndex));
//     }
//   };

//   return (
//     <View
//       style={[
//         styles.container,
//         {
//           width: cellSize * numCols,
//           height: cellSize * numRows,
//           minWidth: 200,
//           minHeight: 200,
//           alignSelf: 'center',
//           justifyContent: 'center',
//           alignItems: 'center',
//         },
//       ]}
//     >
//       {board.map((row, rowIndex) => (
//         <View key={`row-${rowIndex}`} style={styles.row}>
//           {row.map((cell, colIndex) => (
//             <Cell
//               key={`cell-${rowIndex}-${colIndex}`}
//               cell={cell}
//               size={cellSize}
//               onPress={() => onCellPress(rowIndex, colIndex)}
//               onLongPress={() => handleCellLongPress(rowIndex, colIndex)}
//               disabled={disabled || gameOver}
//               gameOver={gameOver}
//             />
//           ))}
//         </View>
//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#ddd',
//     padding: 10,
//     borderRadius: 5,
//     marginVertical: 10,
//     alignSelf: 'center'
//   },
//   row: {
//     flexDirection: 'row'
//   }
// });

// export default GameBoard;

import { Dimensions, StyleSheet, View } from "react-native"
import Cell from "./Cell"

const GameBoard = ({ board, onCellPress, onCellLongPress, disabled, gameOver, level }) => {
  const windowWidth = Dimensions.get("window").width
  const windowHeight = Dimensions.get("window").height
  const numRows = board.length || 8
  const numCols = board[0]?.length || 8

  const maxBoardWidth = windowWidth * 0.95
  const maxBoardHeight = windowHeight * 0.55

  const cellSize = Math.max(28, Math.min(Math.floor(maxBoardWidth / numCols), Math.floor(maxBoardHeight / numRows)))

  const handleCellLongPress = (rowIndex, colIndex) => {
    if (typeof onCellLongPress === "function") {
      onCellLongPress(rowIndex, colIndex)
    }
  }

  return (
    <View
      style={[
        styles.container,
        {
          width: cellSize * numCols,
          height: cellSize * numRows,
          minWidth: 200,
          minHeight: 200,
          alignSelf: "center",
          justifyContent: "center",
          alignItems: "center",
        },
      ]}
    >
      {board.map((row, rowIndex) => (
        <View key={`row-${rowIndex}`} style={styles.row}>
          {row.map((cell, colIndex) => (
            <Cell
              key={`cell-${rowIndex}-${colIndex}`}
              cell={cell}
              size={cellSize}
              onPress={() => onCellPress(rowIndex, colIndex)}
              onLongPress={() => handleCellLongPress(rowIndex, colIndex)}
              disabled={disabled || gameOver}
              gameOver={gameOver}
            />
          ))}
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#34495E",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  row: {
    flexDirection: "row",
  },
})

export default GameBoard
