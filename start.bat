@echo off
echo ========================================
echo    API Wilayah Timor-Leste
echo ========================================
echo.
echo Pilih cara menjalankan server:
echo.
echo 1. Python Server (Direkomendasikan)
echo 2. Node.js Server
echo 3. Buka di browser langsung
echo.
set /p choice="Pilih opsi (1-3): "

if "%choice%"=="1" (
    echo.
    echo 🚀 Menjalankan Python server...
    python server.py
) else if "%choice%"=="2" (
    echo.
    echo 🚀 Menjalankan Node.js server...
    node server.js
) else if "%choice%"=="3" (
    echo.
    echo 🌐 Membuka di browser...
    start http://localhost:8000
) else (
    echo.
    echo ❌ Opsi tidak valid!
    pause
)
