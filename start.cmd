@ECHO OFF 
IF Not EXIST node_modules call Data/src/scripts/install.cmd
if [%1]==[update] call Data/src/scripts/update.cmd

REM check for update on startup is enabled
node Data/src/scripts/startupupdate.js %cd%
if errorlevel 3 call Data/src/scripts/update.cmd


:start
node bot.js
if errorlevel 5 goto :start
if errorlevel 4 goto :end
if errorlevel 3 call Data/src/scripts/update.cmd
if errorlevel 1 goto :start
goto start

:end
