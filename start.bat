@echo off
setlocal ENABLEDELAYEDEXPANSION

REM =========================
REM Configuration
REM =========================
set ROOT_DIR=%~dp0
set NEXTJS_DIR=%ROOT_DIR%\frontend
set NESTJS_DIR=%ROOT_DIR%\backend

REM =========================
REM Argument parsing
REM =========================
set MODE=prod

for %%A in (%*) do (
    if /I "%%A"=="-d" set MODE=dev
    if /I "%%A"=="-dev" set MODE=dev
)

echo Mode: %MODE%
echo.

REM =========================
REM Development mode
REM =========================
if "%MODE%"=="dev" (
    echo Starting NEXT.js (dev)...
    start "Next.js Dev" cmd /k "cd /d %NEXTJS_DIR% && npm run dev"

    echo Starting NestJS (dev)...
    start "NestJS Dev" cmd /k "cd /d %NESTJS_DIR% && npm run start:dev"

    goto :eof
)

REM =========================
REM Production mode
REM =========================
echo Building NEXT.js...
cd /d %NEXTJS_DIR%
npm run build
echo Starting NEXT.js (prod)...
start "Next.js Prod" cmd /k "cd /d %NEXTJS_DIR% && npm run start"

echo.
echo Building NestJS...
cd /d ..\%NESTJS_DIR%
npm run build
echo Starting NestJS (prod)...
start "NestJS Prod" cmd /k "cd /d %NESTJS_DIR% && npm run start"

endlocal
