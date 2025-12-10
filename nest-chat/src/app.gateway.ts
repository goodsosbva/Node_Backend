import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

interface MessageData {
  message: string;
  nickname: string;
}

interface RoomData {
  nickname: string;
  room: string;
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
  @WebSocketServer() server: Server;
  private rooms: string[] = [];

  @SubscribeMessage('createRoom')
  handleCreateRoom(socket: Socket, data: RoomData): void {
    const { nickname, room } = data;
    this.rooms.push(room);
    this.server.emit('room', this.rooms);
  }
}
