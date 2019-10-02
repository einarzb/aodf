#!/bin/bash
function copy_php {
    scp -r -P 10560 ./*.php root@82.81.211.231:/usr/share/aodf-web/root/
   # scp -r -P 22 ./*.php root@192.168.1.61:/usr/share/aodf-web/root/

}
# local machine credentials - -P 443 ./*.php root@192.168.1.61:/usr/share/aodf-web/root/
#remote machine credentials -  scp -r -P 10560 ./*.php root@82.81.211.231:/usr/share/aodf-web/root/

function build_and_copy {
    cd react-dashboard/ 
    npm run-script build &&
    # fetch pwd
    myPath=`pwd`    
    cd ..
    # pass args to index_updater.js
    node index_updater.js $myPath &&
    say please insert password 
    scp -r -P 10560 ./react-dashboard/build/* root@82.81.211.231:/usr/share/aodf-web/root/machine_settings  

    #scp -r -P 22 ./react-dashboard/build/* root@192.168.1.61:/usr/share/aodf-web/root/machine_settings  
}


function make_upload {
    # make c program 
    docker run --rm -v `pwd`:/data -w /data ev3cc make  && 
    #chmod to spec
    chmod +X ./run_root_settings && 
    chmod 4755 ./run_root_settings && 
    # send to server
     scp  -r -P 10560 ./run_root_settings root@82.81.211.231:~
    # scp  -r -P 22 ./run_root_settings root@192.168.1.61:~

    say please insert password
}

function do_all {
    
    build_and_copy &&
    copy_php &&
    make_upload 
}

function do_js_php {

    build_and_copy &&
    copy_php 
}

if [ "$1" == "all" ]; then
 do_all 
fi 

if [ "$1" == "php" ]; then
 copy_php 
fi 

if [ "$1" == "web" ]; then
 do_js_php 
fi   

if [ "$1" == "c" ]; then
 make_upload 
fi 
if [ "$1" == "js" ]; then
 build_and_copy 
fi 

