#update
if [[ $1 = update ]]
then
rm -rf node_modules
git pull origin master 
npm install 
fi

#check if bot was ever run
if [ -d "node_modules" ]
then
rm -rf node_modules
git pull origin master 
npm install 
fi

#run bot
npm start
exitcode=$?

# check to restart bot
if [[ $exitcode = 21 ]]
then 
./start.sh
fi

# check to update
if [[ $exitcode = 22 ]]
then 
./start.sh update
fi
