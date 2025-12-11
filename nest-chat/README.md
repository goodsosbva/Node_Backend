# Nest Chat - 실시간 채팅 애플리케이션

NestJS와 Socket.IO를 활용한 실시간 채팅 애플리케이션입니다. 사용자는 닉네임을 입력하고, 룸을 생성하거나 참가하여 실시간으로 메시지를 주고받을 수 있습니다.

## 🚀 주요 기능

- **실시간 채팅**: WebSocket을 통한 양방향 실시간 메시지 전송
- **룸 시스템**: 채팅방 생성 및 참가 기능
- **네임스페이스 분리**: `/chat`과 `/room` 네임스페이스를 통한 기능 분리
- **공지 시스템**: 룸 생성 및 참가 시 모든 사용자에게 알림

## 📋 기술 스택

### Backend

- **NestJS** (v11.0.1) - Node.js 프레임워크
- **Socket.IO** - WebSocket 통신
- **TypeScript** - 타입 안정성
- **Express** - HTTP 서버

### Frontend

- **jQuery** - DOM 조작
- **Socket.IO Client** - WebSocket 클라이언트

## 🏗️ 프로젝트 구조

```
nest-chat/
├── src/
│   ├── main.ts              # 애플리케이션 진입점
│   ├── app.module.ts        # 루트 모듈
│   ├── app.controller.ts    # HTTP 컨트롤러
│   ├── app.gateway.ts       # WebSocket Gateway (ChatGateway, RoomGateway)
│   └── app.service.ts       # 비즈니스 로직 서비스
├── static/
│   ├── index.html           # 클라이언트 HTML
│   └── script.js            # 클라이언트 JavaScript
└── dist/                    # 빌드 결과물
```

## 🔧 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 모드로 실행

```bash
npm run start:dev
```

서버가 `http://localhost:3000`에서 실행됩니다.

### 3. 프로덕션 빌드

```bash
npm run build
npm run start:prod
```

## 📖 사용 방법

1. 브라우저에서 `http://localhost:3000` 접속
2. 닉네임 입력
3. "Create Room" 버튼으로 채팅방 생성
4. "Join" 버튼으로 채팅방 참가
5. 메시지 입력 후 "Send" 버튼으로 전송

## 🎯 핵심 개념

### Gateway

NestJS에서 WebSocket 연결을 처리하는 클래스입니다.

- **ChatGateway**: `/chat` 네임스페이스에서 메시지 처리
- **RoomGateway**: `/room` 네임스페이스에서 룸 관리

### 네임스페이스

Socket.IO의 네임스페이스를 사용하여 기능을 분리했습니다.

- `/chat`: 실시간 채팅 메시지 처리
- `/room`: 룸 생성 및 참가 관리

### Room 시스템

Socket.IO의 Room 기능을 활용하여 사용자를 그룹화합니다.

- `socket.join(room)`: 특정 룸에 참가
- `socket.leave(room)`: 룸에서 나가기
- `socket.broadcast.to(room).emit()`: 특정 룸에만 메시지 전송

## 🔄 동작 흐름

### 메시지 전송

```
[클라이언트] socket.emit('message', { message, nickname, room })
    ↓
[서버] RoomGateway.handleMessage() 실행
    ↓
[서버] socket.broadcast.to(room).emit() → 같은 룸의 다른 사용자들에게 전송
    ↓
[다른 클라이언트] socket.on('message') → 화면에 표시
```

### 룸 생성

```
[클라이언트] roomSocket.emit('createRoom', { room, nickname })
    ↓
[서버] RoomGateway.handleCreateRoom() 실행
    ↓
[서버] 룸 목록에 추가 후 모든 클라이언트에게 전송
    ↓
[모든 클라이언트] 화면에 룸 목록 업데이트
```

### 룸 참가

```
[클라이언트] roomSocket.emit('joinRoom', { room, nickname, toLeaveRoom })
    ↓
[서버] RoomGateway.handleJoinRoom() 실행
    ↓
[서버] socket.leave(toLeaveRoom) → 이전 룸에서 나가기
    ↓
[서버] socket.join(room) → 새 룸에 참가
    ↓
[서버] 공지 메시지 전송
```

## 📝 주요 파일 설명

### `src/app.gateway.ts`

WebSocket Gateway 클래스들이 정의되어 있습니다.

- **ChatGateway**: 채팅 메시지 처리
- **RoomGateway**: 룸 생성, 참가, 룸 내 메시지 처리

### `static/script.js`

클라이언트 측 JavaScript 코드입니다.

- Socket.IO 클라이언트 연결
- 이벤트 리스너 등록
- 메시지 전송 및 수신 처리

### `src/main.ts`

애플리케이션의 진입점입니다.

- NestJS 애플리케이션 생성
- 정적 파일 서빙 설정
- 서버 시작

## 🛠️ 개발 스크립트

```bash
# 개발 모드 (파일 변경 감지)
npm run start:dev

# 프로덕션 모드
npm run start:prod

# 빌드
npm run build

# 린트
npm run lint

# 테스트
npm run test
```

## 📚 학습 포인트

이 프로젝트를 통해 다음을 학습할 수 있습니다:

1. **NestJS 모듈 시스템**: Module, Controller, Gateway, Service의 역할
2. **의존성 주입**: NestJS의 DI 컨테이너 활용
3. **WebSocket 통신**: Socket.IO를 통한 실시간 양방향 통신
4. **네임스페이스**: Socket.IO 네임스페이스를 통한 기능 분리
5. **Room 시스템**: Socket.IO Room을 통한 그룹 메시징

## 🔍 주요 코드 패턴

### Gateway에서 메시지 구독

```typescript
@SubscribeMessage('message')
handleMessage(socket: Socket, data: MessageData): void {
  // 메시지 처리 로직
}
```

### 클라이언트에서 메시지 전송

```javascript
socket.emit('message', { message, nickname, room });
```

### Room에 메시지 전송

```typescript
socket.broadcast.to(room).emit('message', message);
```

## 📄 라이선스

이 프로젝트는 학습 목적으로 제작되었습니다.
