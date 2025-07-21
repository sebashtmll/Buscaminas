const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer();
const io = new Server(server, { cors: { origin: '*' } });

let lobby = null; // Guardar el host esperando

io.on('connection', (socket) => {
  const { isHost, checkLobby, username } = socket.handshake.query;

  // Verificación de lobby (para el cliente que solo quiere saber si hay host)
  if (checkLobby === 'true') {
    socket.emit('lobby-status', { exists: !!lobby });
    socket.disconnect();
    return;
  }

  // Si es host, registrar el lobby
  if (isHost === 'true') {
    lobby = { socket, username };
    socket.on('disconnect', () => {
      lobby = null;
    });
    return;
  }

  // Si es invitado y hay lobby, unirlo y notificar al host
  if (lobby) {
    // Notificar al host que un invitado se ha unido
    lobby.socket.emit('guest-joined', { guest: username });
    // Aquí puedes unir ambos sockets a una room si lo deseas
    // socket.join('game-room');
    // lobby.socket.join('game-room');
    // Limpiar el lobby para que no se una otro invitado
    lobby = null;
  } else {
    // Si no hay lobby, desconectar al invitado
    socket.disconnect();
  }
});

server.listen(3000, () => {
  console.log('Servidor de Buscaminas escuchando en puerto 3000');
});
