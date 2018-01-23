@ECHO OFF 
if [%1]==[update] goto :update
IF EXIST node_modules GOTO :start
goto install

:start
TIMEOUT 4
node bot.js
if errorlevel 22 goto :update
if errorlevel 21 goto :start
exit

:update
echo if you error out at npm zlib-sync Please install python!
rmdir /s /q node_modules
git pull origin master 
npm install
goto start

:install
git pull origin master
npm install
echo Remember to change your cfgs
pause
goto start