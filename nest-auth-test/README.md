1. GET /auth/to-google
   ↓
2. GoogleAuthGuard 실행
   ↓
3. AuthGuard('google') 실행
   ↓
4. Passport가 'google' Strategy 찾기
   ↓
5. GoogleStrategy.authenticate() 실행
   ↓
6. Google OAuth 페이지로 리다이렉트
   ↓
7. 사용자 로그인/승인
   ↓
8. GET /auth/google?code=xxx
   ↓
9. GoogleAuthGuard 다시 실행
   ↓
10. GoogleStrategy.authenticate() 재실행
    ↓
11. 인증 코드 → 액세스 토큰 교환
    ↓
12. 액세스 토큰 → 사용자 프로필 가져오기
    ↓
13. validate() 메서드 호출
    ↓
14. request.user = profile 설정
    ↓
15. googleAuthRedirect() 실행
    ↓
16. 사용자 정보 반환

###

4. GoogleStrategy → Google OAuth 페이지로 리다이렉트
   ↓
5. 사용자 로그인/승인 (브라우저에서)
   ↓
6. Google → GET /auth/google?code=xxx (브라우저 리다이렉트)
   ↓
7. NestJS 라우터 → @Get('google') 엔드포인트 찾기
   ↓
8. @UseGuards(GoogleAuthGuard) 실행
   ↓
9. GoogleAuthGuard → AuthGuard('google').canActivate()
   ↓
10. Passport → passport.authenticate('google')
    ↓
11. GoogleStrategy.authenticate() 실행
    ├─ req.query.code 확인
    ├─ 인증 코드 → 액세스 토큰 교환
    ├─ 액세스 토큰 → 프로필 가져오기
    └─ \_verify() 호출
    ↓
12. GoogleStrategy.validate() 실행 ⭐ (우리가 구현한 메서드)
    └─ return profile
    ↓
13. request.user = profile 설정
    ↓
14. googleAuthRedirect() 실행
    └─ res.send(user)
