@echo off
setlocal
cd /d "%~dp0"

where node.exe >nul 2>nul
if errorlevel 1 (
  echo Node.js is required to run Nuvio Wiki.
  echo Install it from https://nodejs.org/ and try again.
  pause
  exit /b 1
)

if not exist "node_modules\vitepress\package.json" (
  echo Installing dependencies...
  call npm.cmd install
  if errorlevel 1 (
    echo.
    echo Dependency installation failed.
    pause
    exit /b 1
  )
)

echo Starting Nuvio Wiki at http://localhost:5173/
echo Press Ctrl+C to stop the server.
echo.

call npm.cmd run docs:dev -- --host 0.0.0.0 --port 5173 --strictPort --open

if errorlevel 1 (
  echo.
  echo The server stopped with an error.
  pause
)
