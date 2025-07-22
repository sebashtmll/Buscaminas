// import { useState } from 'react';
// import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
// import GameBoard from '../components/GameBoard';
// import { checkGameStatus, createBoard, revealCell, toggleFlag } from '../utils/gameLogic';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#f5f5f5',
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 20,
//     fontWeight: 'bold',
//     marginVertical: 10,
//   },
//   buttonGroup: {
//     width: '80%',
//     marginVertical: 20,
//     height: 180,
//     justifyContent: 'space-between',
//   },
//   result: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#ff5722',
//     marginVertical: 10,
//   }
// });

// const BOARD_ROWS = 9;
// const BOARD_COLS = 9;
// const BOARD_MINES = 10;

// const HomeScreen = ({ navigation }) => {
//   const [mode, setMode] = useState(null); // null al inicio para mostrar Menú Principal
//   const [board, setBoard] = useState(createBoard(BOARD_ROWS, BOARD_COLS, BOARD_MINES));
//   const [gameOver, setGameOver] = useState(false);
//   const [won, setWon] = useState(false);
//   const [customRows, setCustomRows] = useState('8');
//   const [customCols, setCustomCols] = useState('8');
//   const [customMines, setCustomMines] = useState('10');
//   const [showModeSelect, setShowModeSelect] = useState(false);

//   const resetGame = () => {
//     let rows = BOARD_ROWS, cols = BOARD_COLS, mines = BOARD_MINES;
//     if (mode === 'beginner') {
//       rows = 8; cols = 8; mines = 10;
//     } else if (mode === 'intermediate') {
//       rows = 16; cols = 16; mines = 40;
//     } else if (mode === 'custom') {
//       rows = parseInt(customRows) || 8;
//       cols = parseInt(customCols) || 8;
//       mines = parseInt(customMines) || 10;
//     }
//     setBoard(createBoard(rows, cols, mines));
//     setGameOver(false);
//     setWon(false);
//   };

//   const startGame = (selectedMode) => {
//     let rows = BOARD_ROWS, cols = BOARD_COLS, mines = BOARD_MINES;
//     if (selectedMode === 'beginner') {
//       rows = 8; cols = 8; mines = 10;
//     } else if (selectedMode === 'intermediate') {
//       rows = 16; cols = 16; mines = 40;
//     } else if (selectedMode === 'custom') {
//       rows = parseInt(customRows) || 8;
//       cols = parseInt(customCols) || 8;
//       const maxMines = rows * cols - 1;
//       mines = Math.min(parseInt(customMines) || 10, maxMines);
//      setCustomMines(mines);
//     }
//     setMode(selectedMode);
//     setBoard(createBoard(rows, cols, mines));
//     setGameOver(false);
//     setWon(false);
//   };

//   const handleCellPress = (row, col) => {
//     if (gameOver || board[row][col].flagged) return;
//     const newBoard = revealCell(board, row, col);
//     setBoard(newBoard);
//     const status = checkGameStatus(newBoard);
//     if (status.gameOver) {
//       setGameOver(true);
//       setWon(status.won);
//     }
//   };

//   const handleCellLongPress = (row, col) => {
//     if (gameOver || board[row][col].revealed) return;
//     setBoard(toggleFlag(board, row, col));
//   };

//   // Menú principal
//   if (!showModeSelect && mode === null) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.title}>Buscaminas Multiplayer</Text>
//         <View style={styles.buttonGroup}>
//           <Button
//             title="Un Jugador"
//             onPress={() => setShowModeSelect(true)}
//           />
//           <Button
//             title="Multijugador (LAN)"
//             onPress={() => navigation.navigate('MultiplayerSetup')}
//           />
//           <Button
//             title="Configuración"
//             onPress={() => navigation.navigate('Settings')}
//           />
//         </View>
//       </View>
//     );
//   }

//   // Selección de modo de juego para un jugador
//   if (showModeSelect && (mode === null || mode === 'custom')) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.title}>Selecciona el modo de juego</Text>
//         <View style={styles.buttonGroup}>
//           <Button title="Principiante (8x8, 10 minas)" onPress={() => startGame('beginner')} />
//           <Button title="Intermedio (16x16, 40 minas)" onPress={() => startGame('intermediate')} />
//           <Button title="Personalizado" onPress={() => setMode('custom')} />
//           <Button title="Volver" onPress={() => setShowModeSelect(false)} />
//         </View>
//         {mode === 'custom' && (
//           <View style={{ marginTop: 20, width: '80%' }}>
//             <View style={{ marginBottom: 10 }}>
//               <Text>Filas:</Text>
//               <TextInput
//                 style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 8, textAlign: 'center', backgroundColor: '#fafafa' }}
//                 keyboardType="numeric"
//                 value={customRows}
//                 onChangeText={(text) => {
//                   setCustomRows(text.replace(/[^0-9]/g, ''));
//                 }}
//                 onBlur={() => {
//                   let val = parseInt(customRows);
//                   if (!val || customRows === '') {
//                     setCustomRows('8');
//                   } else if (val < 8) {
//                     setCustomRows('8');
//                   } else if (val > 30) {
//                     setCustomRows('30');
//                   } else {
//                     setCustomRows(val.toString());
//                   }
//                   // Ajustar minas si el tamaño cambia
//                   const rowsVal = (!val || customRows === '') ? 8 : Math.max(8, Math.min(30, val));
//                   const colsVal = parseInt(customCols) || 8;
//                   let maxMines = Math.min(99, colsVal);
//                   if (parseInt(customMines) > maxMines) setCustomMines(maxMines.toString());
//                   if (parseInt(customMines) < 10) setCustomMines('10');
//                 }}
//                 placeholder="8-30"
//               />
//             </View>
//             <View style={{ marginBottom: 10 }}>
//               <Text>Columnas:</Text>
//               <TextInput
//                 style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 8, textAlign: 'center', backgroundColor: '#fafafa' }}
//                 keyboardType="numeric"
//                 value={customCols}
//                 onChangeText={(text) => {
//                   setCustomCols(text.replace(/[^0-9]/g, ''));
//                 }}
//                 onBlur={() => {
//                   let val = parseInt(customCols);
//                   if (!val || customCols === '') {
//                     setCustomCols('8');
//                   } else if (val < 8) {
//                     setCustomCols('8');
//                   } else if (val > 30) {
//                     setCustomCols('30');
//                   } else {
//                     setCustomCols(val.toString());
//                   }
//                   const colsVal = (!val || customCols === '') ? 8 : Math.max(8, Math.min(30, val));
//                   const rowsVal = parseInt(customRows) || 8;
//                   let maxMines = Math.min(99, colsVal);
//                   if (parseInt(customMines) > maxMines) setCustomMines(maxMines.toString());
//                   if (parseInt(customMines) < 10) setCustomMines('10');
//                 }}
//                 placeholder="8-30"
//               />
//             </View>
//             <View style={{ marginBottom: 10 }}>
//               <Text>Minas:</Text>
//               <TextInput
//                 style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 8, textAlign: 'center', backgroundColor: '#fafafa' }}
//                 keyboardType="numeric"
//                 value={customMines}
//                 onChangeText={(text) => {
//                   setCustomMines(text.replace(/[^0-9]/g, ''));
//                 }}
//                 onBlur={() => {
//                   const rowsVal = parseInt(customRows) || 8;
//                   const colsVal = parseInt(customCols) || 8;
//                   let maxMines = Math.min(99, rowsVal * colsVal);
//                   let mines = parseInt(customMines);
//                   if (!mines || customMines === '') {
//                     setCustomMines('10');
//                   } else if (mines < 10) {
//                     setCustomMines('10');
//                   } else if (mines > maxMines) {
//                     setCustomMines(maxMines.toString());
//                   } else {
//                     setCustomMines(mines.toString());
//                   }
//                 }}
//                 placeholder={`10-${Math.min(99, (parseInt(customRows) || 8) * (parseInt(customCols) || 8))}`}
//               />
//             </View>
//             <Button title="Jugar personalizado" onPress={() => {
//               // Solo crear el tablero y salir del menú de selección cuando el usuario presione el botón
//               const rows = parseInt(customRows) || 8;
//               const cols = parseInt(customCols) || 8;
//               const mines = parseInt(customMines) || 10;
//               setBoard(createBoard(rows, cols, mines));
//               setGameOver(false);
//               setWon(false);
//               setShowModeSelect(false);
//             }} />
//           </View>
//         )}
//       </View>
//     );
//   }

//   // Juego en modo seleccionado
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>
//         {mode === 'beginner' ? 'Principiante' : mode === 'intermediate' ? 'Intermedio' : 'Personalizado'}
//       </Text>
//       <ScrollView
//         style={{ width: '100%' }}
//         contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
//         horizontal={true}
//         showsHorizontalScrollIndicator={true}
//       >
//         <ScrollView
//           style={{ width: '100%' }}
//           contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
//           showsVerticalScrollIndicator={true}
//         >
//           <GameBoard
//             board={board}
//             onCellPress={handleCellPress}
//             onCellLongPress={handleCellLongPress}
//             disabled={gameOver}
//             gameOver={gameOver}
//             level={mode}
//           />
//         </ScrollView>
//       </ScrollView>
//       {gameOver && (
//         <Text style={styles.result}>
//           {won ? '¡Ganaste!' : '¡Perdiste!'}
//         </Text>
//       )}
//       <View style={styles.buttonGroup}>
//         <Button title="Reiniciar Juego" onPress={resetGame} />
//         <Button title="Volver al Menú" onPress={() => { setMode(null); setShowModeSelect(false); }} />
//       </View>
//     </View>
//   );
// };

// export default HomeScreen;

"use client"

import { useState } from "react"
import { ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native"
import GameBoard from "../components/GameBoard"
import { checkGameStatus, createBoard, revealCell, toggleFlag } from "../utils/gameLogic"

const HomeScreen = ({ navigation }) => {
  const [mode, setMode] = useState(null)
  const [board, setBoard] = useState(createBoard(9, 9, 10))
  const [gameOver, setGameOver] = useState(false)
  const [won, setWon] = useState(false)
  const [customRows, setCustomRows] = useState("8")
  const [customCols, setCustomCols] = useState("8")
  const [customMines, setCustomMines] = useState("10")
  const [showModeSelect, setShowModeSelect] = useState(false)

  const resetGame = () => {
    let rows = 9,
      cols = 9,
      mines = 10
    if (mode === "beginner") {
      rows = 8
      cols = 8
      mines = 10
    } else if (mode === "intermediate") {
      rows = 16
      cols = 16
      mines = 40
    } else if (mode === "custom") {
      rows = Number.parseInt(customRows) || 8
      cols = Number.parseInt(customCols) || 8
      mines = Number.parseInt(customMines) || 10
    }
    setBoard(createBoard(rows, cols, mines))
    setGameOver(false)
    setWon(false)
  }

  const startGame = (selectedMode) => {
    let rows = 9,
      cols = 9,
      mines = 10
    if (selectedMode === "beginner") {
      rows = 8
      cols = 8
      mines = 10
    } else if (selectedMode === "intermediate") {
      rows = 16
      cols = 16
      mines = 40
    } else if (selectedMode === "custom") {
      rows = Number.parseInt(customRows) || 8
      cols = Number.parseInt(customCols) || 8
      const maxMines = rows * cols - 1
      mines = Math.min(Number.parseInt(customMines) || 10, maxMines)
      setCustomMines(mines.toString())
    }
    setMode(selectedMode)
    setBoard(createBoard(rows, cols, mines))
    setGameOver(false)
    setWon(false)
  }

  const handleCellPress = (row, col) => {
    if (gameOver || board[row][col].flagged) return
    const newBoard = revealCell(board, row, col)
    setBoard(newBoard)
    const status = checkGameStatus(newBoard)
    if (status.gameOver) {
      setGameOver(true)
      setWon(status.won)
    }
  }

  const handleCellLongPress = (row, col) => {
    if (gameOver || board[row][col].revealed) return
    setBoard(toggleFlag(board, row, col))
  }

  // Menú principal
  if (!showModeSelect && mode === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Buscaminas</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.primaryButton} onPress={() => setShowModeSelect(true)}>
            <Text style={styles.buttonText}>Un Jugador</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate("MultiplayerSetup")}>
            <Text style={styles.buttonText}>Multijugador</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  // Selección de modo de juego para un jugador
  if (showModeSelect && (mode === null || mode === "custom")) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Selecciona Dificultad</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.difficultyButton} onPress={() => startGame("beginner")}>
            <Text style={styles.buttonText}>Principiante</Text>
            <Text style={styles.difficultyText}>8x8, 10 minas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.difficultyButton} onPress={() => startGame("intermediate")}>
            <Text style={styles.buttonText}>Intermedio</Text>
            <Text style={styles.difficultyText}>16x16, 40 minas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.difficultyButton} onPress={() => setMode("custom")}>
            <Text style={styles.buttonText}>Personalizado</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.backButton} onPress={() => setShowModeSelect(false)}>
            <Text style={styles.buttonText}>Volver</Text>
          </TouchableOpacity>
        </View>

        {mode === "custom" && (
          <View style={styles.customContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Filas:</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={customRows}
                onChangeText={(text) => setCustomRows(text.replace(/[^0-9]/g, ""))}
                onBlur={() => {
                  const val = Number.parseInt(customRows)
                  if (!val || customRows === "") {
                    setCustomRows("8")
                  } else if (val < 8) {
                    setCustomRows("8")
                  } else if (val > 30) {
                    setCustomRows("30")
                  } else {
                    setCustomRows(val.toString())
                  }
                }}
                placeholder="8-30"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Columnas:</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={customCols}
                onChangeText={(text) => setCustomCols(text.replace(/[^0-9]/g, ""))}
                onBlur={() => {
                  const val = Number.parseInt(customCols)
                  if (!val || customCols === "") {
                    setCustomCols("8")
                  } else if (val < 8) {
                    setCustomCols("8")
                  } else if (val > 30) {
                    setCustomCols("30")
                  } else {
                    setCustomCols(val.toString())
                  }
                }}
                placeholder="8-30"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Minas:</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={customMines}
                onChangeText={(text) => setCustomMines(text.replace(/[^0-9]/g, ""))}
                onBlur={() => {
                  const rowsVal = Number.parseInt(customRows) || 8
                  const colsVal = Number.parseInt(customCols) || 8
                  const maxMines = Math.min(99, rowsVal * colsVal)
                  const mines = Number.parseInt(customMines)
                  if (!mines || customMines === "") {
                    setCustomMines("10")
                  } else if (mines < 10) {
                    setCustomMines("10")
                  } else if (mines > maxMines) {
                    setCustomMines(maxMines.toString())
                  } else {
                    setCustomMines(mines.toString())
                  }
                }}
                placeholder={`10-${Math.min(99, (Number.parseInt(customRows) || 8) * (Number.parseInt(customCols) || 8))}`}
              />
            </View>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => {
                const rows = Number.parseInt(customRows) || 8
                const cols = Number.parseInt(customCols) || 8
                const mines = Number.parseInt(customMines) || 10
                setBoard(createBoard(rows, cols, mines))
                setGameOver(false)
                setWon(false)
                setShowModeSelect(false)
              }}
            >
              <Text style={styles.buttonText}>Jugar Personalizado</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    )
  }

  // Juego en modo seleccionado
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {mode === "beginner" ? "Principiante" : mode === "intermediate" ? "Intermedio" : "Personalizado"}
      </Text>

      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
        horizontal={true}
        showsHorizontalScrollIndicator={true}
      >
        <ScrollView
          style={{ width: "100%" }}
          contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
          showsVerticalScrollIndicator={true}
        >
          <GameBoard
            board={board}
            onCellPress={handleCellPress}
            onCellLongPress={handleCellLongPress}
            disabled={gameOver}
            gameOver={gameOver}
            level={mode}
          />
        </ScrollView>
      </ScrollView>

      {gameOver && (
        <Text style={[styles.result, won ? styles.wonText : styles.lostText]}>{won ? "¡Ganaste!" : "¡Perdiste!"}</Text>
      )}

      <View style={styles.gameButtonGroup}>
        <TouchableOpacity style={styles.actionButton} onPress={resetGame}>
          <Text style={styles.buttonText}>Reiniciar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            setMode(null)
            setShowModeSelect(false)
          }}
        >
          <Text style={styles.buttonText}>Menú</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#2C3E50",
  },
  title: {
    fontSize: 28,
    marginBottom: 30,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
  buttonGroup: {
    width: "90%",
    marginVertical: 20,
  },
  primaryButton: {
    backgroundColor: "#3498DB",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  secondaryButton: {
    backgroundColor: "#E67E22",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  difficultyButton: {
    backgroundColor: "#27AE60",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  backButton: {
    backgroundColor: "#95A5A6",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionButton: {
    backgroundColor: "#E74C3C",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  difficultyText: {
    color: "#FFFFFF",
    fontSize: 12,
    marginTop: 5,
  },
  customContainer: {
    width: "90%",
    marginTop: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  inputLabel: {
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 2,
    borderColor: "#34495E",
    borderRadius: 8,
    padding: 12,
    textAlign: "center",
    backgroundColor: "#FFFFFF",
    fontSize: 16,
  },
  result: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 15,
    textAlign: "center",
  },
  wonText: {
    color: "#27AE60",
  },
  lostText: {
    color: "#E74C3C",
  },
  gameButtonGroup: {
    flexDirection: "row",
    width: "90%",
    marginTop: 15,
  },
})

export default HomeScreen
