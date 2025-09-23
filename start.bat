@echo off
echo ========================================
echo    Timor-Leste Regional API
echo ========================================
echo.
echo Choose how to run the server:
echo.
echo 1. Python Server (Recommended)
echo 2. Node.js Server
echo 3. Open in browser directly
echo.
set /p choice="Select option (1-3): "

if "%choice%"=="1" (
    echo.
    echo 🚀 Starting Python server...
    python server.py
) else if "%choice%"=="2" (
    echo.
    echo 🚀 Starting Node.js server...
    node server.js
) else if "%choice%"=="3" (
    echo.
    echo 🌐 Opening in browser...
    start http://localhost:8000
) else (
    echo.
    echo ❌ Invalid option!
    pause
)
