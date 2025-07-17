import { Buffer } from 'buffer';
import io from 'socket.io-client';

let socket;

export const initSocket = (ipAddress, port, isHost, username) => {
  socket = io(`http://${ipAddress}:${port}`, {
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    query: { isHost, username }
  });

  return socket;
};

export const closeSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};

export const sendMove = (socket, data) => {
  if (socket) {
    // Convertir datos a Buffer para optimización
    const bufferData = Buffer.from(JSON.stringify(data));
    socket.emit('game-move', bufferData);
  }
};

export const subscribeToGameUpdates = (socket, callback) => {
  if (socket) {
    socket.on('game-update', (bufferData) => {
      const data = JSON.parse(bufferData.toString());
      callback(data);
    });
  }
};