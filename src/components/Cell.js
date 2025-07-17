import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const Cell = ({ cell, size, onPress, onLongPress, disabled, gameOver }) => {
  const getCellContent = () => {
    if (!cell.revealed) {
      return cell.flagged ? '🚩' : '';
    }
    
    if (cell.value === 'mine') return gameOver ? '💣' : ' ';
    if (cell.value === 0) return '';
    return cell.value;
  };

  const getCellStyle = () => {
    const baseStyle = {
      width: size,
      height: size,
      borderWidth: 1,
      borderColor: '#999',
      justifyContent: 'center',
      alignItems: 'center',
    };

    if (cell.revealed) {
      if (cell.value === 'mine') {
        return [baseStyle, { backgroundColor: '#ff4444' }];
      }
      return [baseStyle, { backgroundColor: '#f0f0f0' }];
    }
    return [baseStyle, { backgroundColor: '#bdbdbd' }];
  };

  const getTextStyle = () => {
    if (!cell.revealed) return styles.coveredText;
    
    if (cell.value === 'mine') return styles.mineText;
    
    return [
      styles.text,
      { color: getNumberColor(cell.value) }
    ];
  };

  const getNumberColor = (value) => {
    const colors = [
      '',       // 0
      '#1976D2', // 1
      '#388E3C', // 2
      '#D32F2F', // 3
      '#7B1FA2', // 4
      '#FF8F00', // 5
      '#0097A7', // 6
      '#5D4037', // 7
      '#616161'  // 8
    ];
    return colors[value] || '#000';
  };

  return (
    <TouchableOpacity
      style={getCellStyle()}
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={getTextStyle()}>{getCellContent()}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  coveredText: {
    fontSize: 16,
  },
  mineText: {
    fontSize: 20,
  }
});

export default Cell;