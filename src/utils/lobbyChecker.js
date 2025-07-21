import io from 'socket.io-client';

export const checkLobbyExists = (ipAddress, port) => {
  return new Promise((resolve, reject) => {
    const socket = io(`http://${ipAddress}:${port}`, {
      timeout: 2000,
      reconnection: false,
      query: { isHost: false, checkLobby: true }
    });

    // Esperar respuesta del servidor sobre la existencia del lobby
    socket.on('lobby-status', (status) => {
      socket.disconnect();
      resolve(status.exists);
    });

    // Si no hay respuesta en 2 segundos, asumir que no existe
    socket.on('connect_error', () => {
      socket.disconnect();
      resolve(false);
    });
  });
};
