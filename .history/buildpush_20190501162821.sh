#!/bin/bash
function copy_php {
    scp -r -P 10457 ./*.php root@82.166.236.100:/usr/share/aodf-web/root/
}

cd react-dashboard/ 
npm run-script build &&
cd ..
[$1 == ""]
node index_updater.js &&
scp -r -P 10457 ./react-dashboard/build/* root@82.166.236.100:/usr/share/aodf-web/root/machine_settings  && 