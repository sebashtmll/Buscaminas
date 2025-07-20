import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';

const MultiplayerSetup = ({ navigation }) => {
  const [ipAddress, setIpAddress] = useState('');
  const [port, setPort] = useState('3000');
  const [username, setUsername] = useState('');

  const handleHostGame = () => {
    navigation.navigate('GameScreen', { 
      mode: 'multiplayer',
      role: 'host',
      ipAddress,
      port,
      username
    });
  };

  const handleJoinGame = () => {
    navigation.navigate('GameScreen', { 
      mode: 'multiplayer',
      role: 'guest',
      ipAddress,
      port,
      username
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración Multijugador</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        value={username}
        onChangeText={setUsername}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Dirección IP (ej: 192.168.1.2)"
        value={ipAddress}
        onChangeText={setIpAddress}
        keyboardType="numeric"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Puerto"
        value={port}
        onChangeText={setPort}
        keyboardType="numeric"
      />
      
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.button} onPress={handleHostGame}>
          <Text style={styles.buttonText}>Crear Partida</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleJoinGame}>
          <Text style={styles.buttonText}>Unirse a Partida</Text>
        </TouchableOpacity>
      </View>
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
  },
  buttonGroup: {
    width: '80%',
    height: 100,
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MultiplayerSetup;