cd react-dashboard/ 
npm run-script build &&
cd ..
node index_updater.js
# git add . --all && git commit -am "omg"
 scp -r -P 10457 ./*.php root@82.166.236.100:/usr/share/aodf-web/root/