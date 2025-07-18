import { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Cell from '../components/Cell';

const GameBoard = ({
  board,
  onCellPress,
  onCellLongPress,
  disabled,
  gameOver,
  level
}) => {
  const [localBoard, setLocalBoard] = useState(board);
  // Configuración del tamaño de celda según el nivel
  const getCellSize = () => {
    const windowWidth = Dimensions.get('window').width;
    switch (level) {
      case 'intermediate':
        return (windowWidth - 40) / 16; // 16 columnas
      case 'expert':
        return (windowWidth - 40) / 30; // 30 columnas
      default: // beginner
        return (windowWidth - 40) / 9; // 9 columnas
    }
  };


  const cellSize = getCellSize();

  // Handler para pulsación larga (bandera)
  const handleCellLongPress = (rowIndex, colIndex) => {
    if (typeof onCellLongPress === 'function') {
      onCellLongPress(rowIndex, colIndex);
    } else {
      // Si no se pasa handler, alterna bandera localmente
      // setLocalBoard(toggleFlag(localBoard, rowIndex, colIndex));
    }
  };

  return (
    <View style={styles.container}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignSelf: 'center'
  },
  row: {
    flexDirection: 'row'
  }
});

export default GameBoard;