// import { useState } from 'react';
// import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import { checkLobbyExists } from '../utils/lobbyChecker';

// const MultiplayerSetup = ({ navigation }) => {
//   const [ipAddress, setIpAddress] = useState('');
//   const [port, setPort] = useState('3000');
//   const [username, setUsername] = useState('');
//   const [rows, setRows] = useState('9');
//   const [cols, setCols] = useState('9');
//   const [mines, setMines] = useState('10');
//   const [showCustomOptions, setShowCustomOptions] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   // Estados para opciones personalizadas
//   const [customRows, setCustomRows] = useState('8');
//   const [customCols, setCustomCols] = useState('8');
//   const [customMines, setCustomMines] = useState('10');

//   // Función para ajustar automáticamente los valores al rango permitido
//   const clampValue = (value, min, max) => {
//     const num = parseInt(value, 10) || min;
//     return Math.min(Math.max(num, min), max).toString();
//   };

//   const validateInputs = () => {
//     if (!username.trim()) {
//       setErrorMessage('Debes ingresar un nombre de usuario');
//       return false;
//     }
//     if (!ipAddress.trim()) {
//       setErrorMessage('Debes ingresar una dirección IP');
//       return false;
//     }
//     setErrorMessage('');
//     return true;
//   };

//   const validateGameSettings = () => {
//     const numRows = parseInt(rows, 10);
//     const numCols = parseInt(cols, 10);
//     const numMines = parseInt(mines, 10);
//     const maxMines = numRows * numCols * 0.85; // 85% del tablero como máximo

//     if (isNaN(numRows) || isNaN(numCols) || isNaN(numMines)) {
//       Alert.alert('Error', 'Por favor ingresa valores numéricos válidos');
//       return false;
//     }

//     return true;
//   };

//   const handleHostGame = () => {
//     // Usar valores personalizados si están visibles
//     const useCustom = showCustomOptions;
//     const finalRows = useCustom ? customRows : rows;
//     const finalCols = useCustom ? customCols : cols;
//     const finalMines = useCustom ? customMines : mines;
//     if (useCustom) {
//       // Validar los valores personalizados
//       const numRows = parseInt(customRows, 10);
//       const numCols = parseInt(customCols, 10);
//       const numMines = parseInt(customMines, 10);
//       if (
//         isNaN(numRows) || isNaN(numCols) || isNaN(numMines) ||
//         numRows < 8 || numRows > 30 ||
//         numCols < 8 || numCols > 30 ||
//         numMines < 10 || numMines > Math.min(99, numRows * numCols)
//       ) {
//         Alert.alert('Error', 'Verifica los valores personalizados.');
//         return;
//       }
//     } else {
//       if (!validateGameSettings()) return;
//     }
//     navigation.navigate('GameScreen', {
//       mode: 'multiplayer',
//       role: 'host',
//       ipAddress,
//       port,
//       username,
//       rows: parseInt(finalRows, 10),
//       cols: parseInt(finalCols, 10),
//       mines: parseInt(finalMines, 10),
//     });
//   };

//    const handleJoinGame = async () => {
//     if (!validateInputs()) return;
//     // Verificar si existe la partida antes de navegar
//     const exists = await checkLobbyExists(ipAddress, port);
//     if (!exists) {
//       Alert.alert('No se encontró partida', 'No existe ninguna partida creada en ese IP y puerto.');
//       return;
//     }

//     navigation.navigate('GameScreen', {
//       mode: 'multiplayer',
//       role: 'guest',
//       ipAddress,
//       port,
//       username,
//       rows: parseInt(rows, 10),
//       cols: parseInt(cols, 10),
//       mines: parseInt(mines, 10),
//     });
//   };

//   const handleShowCustomOptions = () => {
//     if (!validateInputs()) return;
//     setShowCustomOptions(true);
//   };

//   return (
//     <View style={styles.container}>
//       {errorMessage ? (
//         <Text style={styles.errorText}>{errorMessage}</Text>
//       ) : null}

//       {!showCustomOptions ? (
//         <>
//           <Text style={styles.title}>Configuración Multijugador</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Nombre de usuario*"
//             value={username}
//             onChangeText={setUsername}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Dirección IP* (ej: 192.168.1.2)"
//             value={ipAddress}
//             onChangeText={setIpAddress}
//             keyboardType="numeric"
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Puerto"
//             value={port}
//             onChangeText={setPort}
//             keyboardType="numeric"
//           />
//           <View style={styles.buttonGroup}>
//             <TouchableOpacity style={styles.button} onPress={handleShowCustomOptions}>
//               <Text style={styles.buttonText}>Crear Partida</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.button} onPress={handleJoinGame}>
//               <Text style={styles.buttonText}>Unirse a Partida</Text>
//             </TouchableOpacity>
//           </View>
//         </>
//       ) : (
//         <View style={styles.customOptions}>
//           <Text style={styles.subtitle}>Configuración del Tablero</Text>
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
//                   let maxMines = Math.min(99, rowsVal * colsVal);
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
//                   let maxMines = Math.min(99, rowsVal * colsVal);
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
//             <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
//               <TouchableOpacity style={[styles.button, { flex: 1, marginRight: 5 }]} onPress={handleHostGame}>
//                 <Text style={styles.buttonText}>Iniciar</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={[styles.button, { flex: 1, marginLeft: 5 }]} onPress={() => setShowCustomOptions(false)}>
//                 <Text style={styles.buttonText}>Volver</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       )}
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//     container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 20,
//     marginBottom: 20,
//     fontWeight: 'bold',
//   },
//   subtitle: {
//     fontSize: 18,
//     marginBottom: 15,
//     fontWeight: 'bold',
//   },
//   input: {
//     width: '80%',
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 15,
//     padding: 10,
//     borderRadius: 5,
//   },
//   buttonGroup: {
//     width: '80%',
//     height: 100,
//     justifyContent: 'space-between',
//     marginTop: 20,
//   },
//   button: {
//     backgroundColor: '#007bff',
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   customOptions: {
//     width: '80%',
//     marginTop: 20,
//   },
//   errorText: {
//     color: 'red',
//     marginBottom: 15,
//     textAlign: 'center',
//   },
// });


// export default MultiplayerSetup;

"use client"

import { useState } from "react"
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"

const MultiplayerSetup = ({ navigation }) => {
  const [ipAddress, setIpAddress] = useState("")
  const [port, setPort] = useState("3000")
  const [username, setUsername] = useState("")
  const [rows, setRows] = useState("9")
  const [cols, setCols] = useState("9")
  const [mines, setMines] = useState("10")
  const [showCustomOptions, setShowCustomOptions] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [customRows, setCustomRows] = useState("8")
  const [customCols, setCustomCols] = useState("8")
  const [customMines, setCustomMines] = useState("10")

  const validateInputs = () => {
    if (!username.trim()) {
      setErrorMessage("Debes ingresar un nombre de usuario")
      return false
    }
    if (!ipAddress.trim()) {
      setErrorMessage("Debes ingresar una dirección IP")
      return false
    }
    setErrorMessage("")
    return true
  }

  const validateGameSettings = () => {
    const numRows = Number.parseInt(rows, 10)
    const numCols = Number.parseInt(cols, 10)
    const numMines = Number.parseInt(mines, 10)

    if (isNaN(numRows) || isNaN(numCols) || isNaN(numMines)) {
      Alert.alert("Error", "Por favor ingresa valores numéricos válidos")
      return false
    }
    return true
  }

  const handleHostGame = () => {
    const useCustom = showCustomOptions
    const finalRows = useCustom ? customRows : rows
    const finalCols = useCustom ? customCols : cols
    const finalMines = useCustom ? customMines : mines

    if (useCustom) {
      const numRows = Number.parseInt(customRows, 10)
      const numCols = Number.parseInt(customCols, 10)
      const numMines = Number.parseInt(customMines, 10)
      if (
        isNaN(numRows) ||
        isNaN(numCols) ||
        isNaN(numMines) ||
        numRows < 8 ||
        numRows > 30 ||
        numCols < 8 ||
        numCols > 30 ||
        numMines < 10 ||
        numMines > Math.min(99, numRows * numCols)
      ) {
        Alert.alert("Error", "Verifica los valores personalizados.")
        return
      }
    } else {
      if (!validateGameSettings()) return
    }

    navigation.navigate("GameScreen", {
      mode: "multiplayer",
      role: "host",
      ipAddress,
      port,
      username,
      rows: Number.parseInt(finalRows, 10),
      cols: Number.parseInt(finalCols, 10),
      mines: Number.parseInt(finalMines, 10),
    })
  }

  const handleJoinGame = () => {
    if (!validateInputs()) return
    navigation.navigate("GameScreen", {
      mode: "multiplayer",
      role: "guest",
      ipAddress,
      port,
      username,
      rows: Number.parseInt(rows, 10),
      cols: Number.parseInt(cols, 10),
      mines: Number.parseInt(mines, 10),
    })
  }

  const handleShowCustomOptions = () => {
    if (!validateInputs()) return
    setShowCustomOptions(true)
  }

  return (
    <View style={styles.container}>
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      {!showCustomOptions ? (
        <>
          <Text style={styles.title}>Configuración Multijugador</Text>

          <TextInput
            style={styles.input}
            placeholder="Nombre de usuario*"
            placeholderTextColor="#7F8C8D"
            value={username}
            onChangeText={setUsername}
          />

          <TextInput
            style={styles.input}
            placeholder="Dirección IP* (ej: 192.168.1.2)"
            placeholderTextColor="#7F8C8D"
            value={ipAddress}
            onChangeText={setIpAddress}
            keyboardType="numeric"
          />

          <TextInput
            style={styles.input}
            placeholder="Puerto"
            placeholderTextColor="#7F8C8D"
            value={port}
            onChangeText={setPort}
            keyboardType="numeric"
          />

          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.primaryButton} onPress={handleShowCustomOptions}>
              <Text style={styles.buttonText}>Crear Partida</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryButton} onPress={handleJoinGame}>
              <Text style={styles.buttonText}>Unirse a Partida</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.customOptions}>
          <Text style={styles.subtitle}>Configuración del Tablero</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Filas:</Text>
            <TextInput
              style={styles.customInput}
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
              placeholderTextColor="#7F8C8D"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Columnas:</Text>
            <TextInput
              style={styles.customInput}
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
              placeholderTextColor="#7F8C8D"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Minas:</Text>
            <TextInput
              style={styles.customInput}
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
              placeholderTextColor="#7F8C8D"
            />
          </View>

          <View style={styles.customButtonGroup}>
            <TouchableOpacity style={[styles.primaryButton, { flex: 1, marginRight: 5 }]} onPress={handleHostGame}>
              <Text style={styles.buttonText}>Iniciar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.backButton, { flex: 1, marginLeft: 5 }]}
              onPress={() => setShowCustomOptions(false)}
            >
              <Text style={styles.buttonText}>Volver</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#2C3E50",
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
  input: {
    width: "90%",
    height: 50,
    borderColor: "#34495E",
    borderWidth: 2,
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    fontSize: 16,
  },
  customInput: {
    borderWidth: 2,
    borderColor: "#34495E",
    borderRadius: 8,
    padding: 12,
    textAlign: "center",
    backgroundColor: "#FFFFFF",
    fontSize: 16,
  },
  buttonGroup: {
    width: "90%",
    marginTop: 20,
  },
  customButtonGroup: {
    flexDirection: "row",
    marginTop: 20,
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
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  customOptions: {
    width: "90%",
  },
  inputGroup: {
    marginBottom: 15,
  },
  inputLabel: {
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "bold",
  },
  errorText: {
    color: "#E74C3C",
    marginBottom: 15,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
})

export default MultiplayerSetup
