@echo off
title Trazador de Lotes - Cali
echo Iniciando Trazador de Lotes...
cd /d "%~dp0"
start "" http://localhost:5178
node server.js
pause
