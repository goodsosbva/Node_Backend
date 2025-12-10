const socket = io('http://localhost:3000/chat');
const roomSocket = io('http://localhost:3000/room');
const nickname = prompt('Enter your nickname');
socket.on('connect', () => {
  console.log('connected to server');
});

roomSocket.on('connect', () => {
  console.log('connected to room server');
});

function sendMessage() {
  const message = $('#message').val();
  $('#chat').append(`<div>${nickname}: ${message}</div>`);
  socket.emit('message', { message, nickname });
}

socket.on('message', (message) => {
  $('#chat').append(`<div>${message}</div>`);
});

function createRoom() {
  const room = prompt('Enter room name');
  if (room) {
    roomSocket.emit('createRoom', { room, nickname });
  }
}

roomSocket.on('room', (data) => {
  console.log('rooms received:', data);
  $('#rooms').empty();
  data.forEach((room) => {
    $('#rooms').append(
      `<li>${room} <button onclick="joinRoom('${room}')">Join</button></li>`,
    );
  });
});
