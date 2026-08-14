@echo off
setlocal
cd /d "%~dp0"

echo Verificando e preparando o site para upload...
call npm run prepare:upload
if errorlevel 1 (
    echo.
    echo Nao foi possivel preparar o upload. Veja o erro acima.
    pause
    exit /b 1
)

start "" "%~dp0..\Zippeed.github.io-upload"
echo.
echo Pasta de upload aberta. Arraste o conteudo dela para o GitHub.
pause
