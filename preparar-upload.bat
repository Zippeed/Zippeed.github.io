@echo off
setlocal
cd /d "%~dp0"
echo Verificando e preparando o site para upload...
call npm run prepare:upload
if errorlevel 1 (
    echo Nao foi possivel preparar o upload. Veja o erro acima.
    pause
    exit /b 1
)
start "" "%~dp0dist"
echo Pasta pronta. Arraste o conteudo de dist para o GitHub.
pause
