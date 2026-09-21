@echo off
title Lo Down with Isha Lo - Local Server
echo.
echo   Starting the Lo Down website...
echo   Keep this window open while you work.
echo.
cd /d "%~dp0"
start "" http://localhost:3210
node serve.mjs
pause
