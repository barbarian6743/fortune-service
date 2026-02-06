@echo off
echo ========================================
echo Fortune Service - 웹 서버 시작
echo ========================================
echo.
echo 서버를 시작합니다...
echo 브라우저에서 http://localhost:8000 으로 접속하세요.
echo.
echo 종료하려면 Ctrl+C를 누르세요.
echo ========================================
echo.

cd /d "%~dp0"
python -m http.server 8000

pause
