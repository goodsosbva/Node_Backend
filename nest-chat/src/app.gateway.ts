import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

interface MessageData {
  message: string;
  nickname: string;
  room: string;
}

interface RoomData {
  nickname: string;
  room: string;
  toLeaveRoom: string;
}

@WebSocketGateway({ namespace: 'chat' })
export class ChatGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('message')
  handleMessage(socket: Socket, data: MessageData): void {
    const { message, nickname } = data;
    socket.broadcast.emit('message', `${nickname}: ${message}`);
  }
}

@WebSocketGateway({ namespace: 'room' })
export class RoomGateway {
  constructor(private readonly chatGateway: ChatGateway) {}

  @WebSocketServer() server: Server;
  private rooms: string[] = [];

  @SubscribeMessage('createRoom')
  handleCreateRoom(socket: Socket, data: RoomData): void {
    const { nickname, room } = data;
    this.chatGateway.server.emit('notice', {
      message: `${nickname} created room ${room}`,
    });

    this.rooms.push(room);
    this.server.emit('room', this.rooms);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(socket: Socket, data: RoomData): void {
    const { nickname, room, toLeaveRoom } = data;
    socket.leave(toLeaveRoom);
    this.chatGateway.server.emit('notice', {
      message: `${nickname} joined room ${room}`,
    });
    socket.join(room);
  }

  @SubscribeMessage('message')
  handleMessage(socket: Socket, data: MessageData): void {
    const { nickname, room, message } = data;
    console.log(data);
    socket.broadcast.to(room).emit('message', `${nickname}: ${message}`);
  }
}
