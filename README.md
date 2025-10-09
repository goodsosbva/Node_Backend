# 🚀 Backend Node.js Projects Collection

황제님의 Node.js 백엔드 학습 및 개발 프로젝트 모음입니다. 각 프로젝트는 실무에서 사용할 수 있는 수준의 완성도를 갖추고 있습니다.

## 📁 프로젝트 구조

### 🎯 **page_nation_bulletin/** - 완전한 웹 게시판 시스템

**Express + Handlebars + MongoDB를 사용한 프로덕션 레벨 게시판**

#### 🚀 주요 기능

- **완전한 CRUD 시스템**: 게시글 생성, 조회, 수정, 삭제
- **고급 페이지네이션**: 10개씩 게시글을 나누어 표시하는 효율적인 페이지 시스템
- **실시간 검색**: 제목 기준 대소문자 구분 없는 검색 기능
- **댓글 시스템**: 게시글별 댓글 작성/삭제 (비밀번호 인증)
- **보안 기능**: 게시글/댓글 수정/삭제 시 비밀번호 인증
- **조회수 시스템**: 게시글 조회 시 자동 증가
- **반응형 UI**: Handlebars 템플릿을 통한 서버사이드 렌더링

#### 🛠 기술 스택

- **Backend**: Node.js, Express.js, MongoDB Native Driver
- **Frontend**: Handlebars, Vanilla JavaScript, HTML5/CSS3
- **개발도구**: Nodemon, Dotenv, Lodash

#### 📊 데이터베이스 스키마

```javascript
// board 컬렉션
{
  _id: ObjectId,
  title: String,        // 게시글 제목
  writer: String,       // 작성자
  password: String,     // 비밀번호
  content: String,      // 내용
  hits: Number,         // 조회수
  createDt: String,     // 생성일 (ISO String)
  comments: [           // 댓글 배열
    {
      idx: Number,      // 댓글 인덱스
      name: String,     // 댓글 작성자
      password: String, // 댓글 비밀번호
      comment: String,  // 댓글 내용
      createDt: String  // 댓글 생성일
    }
  ]
}
```

#### 🎨 핵심 구현 특징

- **MVC 패턴**: 서비스 레이어를 통한 비즈니스 로직 분리
- **페이지네이션 알고리즘**: Lodash를 활용한 효율적인 페이지 계산
- **보안 최적화**: Projection 옵션으로 민감한 정보 제외 조회
- **AJAX 통합**: 클라이언트-서버 간 부드러운 상호작용

### 🗄 **try_mongo/** - MongoDB 학습 및 테스트

**MongoDB Native Driver와 Mongoose를 활용한 데이터베이스 학습 프로젝트**

#### 📚 학습 내용

- MongoDB 연결 및 기본 CRUD 작업
- Mongoose ODM을 통한 스키마 정의 및 모델링
- MongoDB 쿼리 최적화 및 인덱싱
- 데이터베이스 연결 풀 관리

### 🌐 **okserver/** - Express 서버 예제들

**Express.js 프레임워크 학습을 위한 다양한 서버 구현 예제**

#### 📖 예제 구성

- 기본 Express 서버 설정
- 라우터를 활용한 모듈화된 서버 구조
- 미들웨어 활용 및 커스터마이징
- RESTful API 설계 패턴

### 📦 **npm_yarn_management/** - 패키지 관리 학습

**NPM과 Yarn을 활용한 의존성 관리 및 패키지 개발 학습**

#### 🔧 학습 내용

- NPM vs Yarn 비교 및 성능 분석
- 패키지 버전 관리 및 의존성 해결
- 로컬 패키지 개발 및 테스트
- NPX를 통한 패키지 실행

### ⚡ **javascript_asynchronous/** - 비동기 프로그래밍

**JavaScript 비동기 처리 패턴 학습 및 최적화**

#### 🎯 학습 주제

- Callback, Promise, Async/Await 패턴 비교
- 비동기 코드의 안티패턴 분석 및 개선
- 실제 API 호출을 통한 비동기 처리 실습
- 에러 핸들링 및 예외 처리

## 🚀 빠른 시작 가이드

### 1️⃣ 환경 설정

#### 루트 의존성 설치

```bash
npm install
```

#### 환경변수 설정

루트 디렉토리에 `.env` 파일을 생성하고 다음 내용을 설정하세요:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/board
# 또는 MongoDB Atlas 사용 시:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/board

# Server Configuration
PORT=3000

# Database Names
DB_NAME=board
```

### 2️⃣ 프로젝트별 실행

#### 🎯 게시판 프로젝트 (메인 프로젝트)

```bash
cd page_nation_bulletin
npm install
npm start
```

**접속**: `http://localhost:3000`

#### 🗄 MongoDB 테스트

```bash
cd try_mongo
npm install
node test-connection.js
```

#### 🌐 Express 서버 예제

```bash
cd okserver/express-server
npm install
npm start
```

#### ⚡ 비동기 프로그래밍 예제

```bash
cd javascript_asynchronous/callback-promise-async-await
npm install
node async-await.js
```

## 🎯 프로젝트별 상세 가이드

### 📝 **page_nation_bulletin** - 완전한 웹 게시판

#### 🚀 실행 방법

```bash
cd page_nation_bulletin
npm install
npm start
```

#### 🎨 주요 페이지

- **홈페이지** (`/`): 게시글 목록, 페이지네이션, 검색
- **글쓰기** (`/write`): 새 게시글 작성
- **상세보기** (`/detail/:id`): 게시글 상세, 댓글 시스템
- **수정하기** (`/modify/:id`): 게시글 수정

#### 🔧 API 엔드포인트

```javascript
GET    /                    // 게시글 목록 (페이지네이션, 검색)
GET    /write              // 글쓰기 페이지
POST   /write              // 게시글 작성
GET    /detail/:id         // 게시글 상세 조회
GET    /modify/:id         // 게시글 수정 페이지
POST   /modify             // 게시글 수정
DELETE /delete             // 게시글 삭제
POST   /write-comment      // 댓글 작성
DELETE /delete-comment     // 댓글 삭제
POST   /check-password     // 비밀번호 확인
```

#### 🎨 핵심 기능 구현

- **페이지네이션**: Lodash를 활용한 효율적인 페이지 계산
- **검색 기능**: 정규표현식을 통한 대소문자 구분 없는 검색
- **보안**: Projection 옵션으로 민감한 정보 제외 조회
- **댓글 시스템**: 배열 기반 댓글 저장 및 관리

### 🗄 **try_mongo** - MongoDB 학습

#### 📚 학습 파일들

- `test-connection.js`: MongoDB 연결 테스트
- `test-crud.js`: 기본 CRUD 작업 예제
- `test-mongoose/mongoose-crud.js`: Mongoose ODM 사용 예제
- `test-mongoose/person-model.js`: Mongoose 스키마 정의

#### 🚀 실행 방법

```bash
cd try_mongo
npm install
node test-connection.js    # 연결 테스트
node test-crud.js         # CRUD 테스트
```

### 🌐 **okserver** - Express 서버 예제

#### 📖 예제 구성

- `ok_server.js`: 기본 Express 서버
- `ok_server_with_router.js`: 라우터를 활용한 서버
- `ok_server_with_router_refactor.js`: 리팩토링된 서버
- `express-server/`: 완전한 Express 애플리케이션

### ⚡ **javascript_asynchronous** - 비동기 프로그래밍

#### 🎯 학습 파일들

- `callback-test.js`: Callback 패턴 예제
- `promise-test.js`: Promise 패턴 예제
- `async-await.js`: Async/Await 패턴 예제
- `ideal-promise-code.js`: 최적화된 Promise 코드
- `promise-anti-pattern2.js`: Promise 안티패턴 분석

## 🛠 개발 환경 설정

### 필수 요구사항

- **Node.js**: 14.x 이상
- **MongoDB**: 4.x 이상 (로컬 또는 Atlas)
- **npm**: 6.x 이상

### 권장 개발 도구

- **Visual Studio Code**: 코드 에디터
- **MongoDB Compass**: 데이터베이스 관리
- **Postman**: API 테스트
- **Git**: 버전 관리

## 📊 프로젝트 통계

| 프로젝트                | 라인 수 | 주요 기능     | 완성도     |
| ----------------------- | ------- | ------------- | ---------- |
| page_nation_bulletin    | 500+    | 완전한 게시판 | ⭐⭐⭐⭐⭐ |
| try_mongo               | 200+    | DB 학습       | ⭐⭐⭐⭐   |
| okserver                | 150+    | 서버 예제     | ⭐⭐⭐     |
| javascript_asynchronous | 300+    | 비동기 학습   | ⭐⭐⭐⭐   |

## 🎉 학습 성과

### 🏆 달성한 기술 스택

- **Backend**: Node.js, Express.js, MongoDB
- **Frontend**: Handlebars, JavaScript, HTML5/CSS3
- **Database**: MongoDB Native Driver, Mongoose ODM
- **Tools**: Nodemon, Dotenv, Lodash, Git

### 🚀 실무 적용 가능한 기능들

- 완전한 CRUD 시스템
- 고급 페이지네이션 알고리즘
- 실시간 검색 기능
- 보안 인증 시스템
- 댓글 시스템
- AJAX 통합

## 🔧 문제 해결

### 자주 발생하는 문제들

1. **MongoDB 연결 실패**: `.env` 파일의 `MONGODB_URI` 확인
2. **포트 충돌**: 다른 프로세스가 3000번 포트 사용 중
3. **의존성 오류**: `npm install` 재실행
4. **환경변수 오류**: `.env` 파일 경로 및 내용 확인

### 디버깅 팁

- `console.log()`를 활용한 로그 확인
- MongoDB Compass로 데이터베이스 상태 확인
- 브라우저 개발자 도구로 네트워크 요청 확인

---

**🎊 황제님의 Node.js 백엔드 마스터 과정이 완성되었습니다! 각 프로젝트는 실무에서 바로 사용할 수 있는 수준의 완성도를 자랑합니다.**
