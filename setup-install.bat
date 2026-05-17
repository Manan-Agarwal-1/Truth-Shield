@echo off
REM Truth-Shield Setup and Start Script
REM This script installs dependencies and starts both frontend and backend servers

echo.
echo ============================================
echo Truth-Shield AI - Full Setup and Start
echo ============================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [INFO] Node.js version:
node --version
echo.

REM Install backend dependencies
echo [STEP 1] Installing backend dependencies...
cd backend
echo Current directory: %cd%
call npm install
if errorlevel 1 (
    echo [ERROR] Failed to install backend dependencies!
    pause
    exit /b 1
)
cd ..
echo [SUCCESS] Backend dependencies installed!
echo.

REM Install frontend dependencies
echo [STEP 2] Installing frontend dependencies...
cd frontend
echo Current directory: %cd%
call npm install
if errorlevel 1 (
    echo [ERROR] Failed to install frontend dependencies!
    pause
    exit /b 1
)
cd ..
echo [SUCCESS] Frontend dependencies installed!
echo.

REM Summary
echo ============================================
echo Installation Complete!
echo ============================================
echo.
echo To start the application:
echo.
echo Terminal 1 - Backend:
echo   cd backend
echo   npm run dev
echo.
echo Terminal 2 - Frontend:
echo   cd frontend
echo   npm run dev
echo.
echo Then open: http://localhost:3000
echo.
echo Backend API: http://localhost:5000
echo.
pause
