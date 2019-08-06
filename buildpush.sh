#!/bin/bash
function copy_php {
    say yo yo you forgot password
    scp -r -P 10560 ./*.php root@82.81.211.231:/usr/share/aodf-web/root/
    say finished mista
}

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
    open "https://82.81.211.231:10561/machine_settings/index.html"  
}

function make_upload {
    # make c program 
    docker run --rm -v `pwd`:/data -w /data ev3cc make  && 
    #chmod to spec
    chmod +X ./run_root_settings && 
    chmod 4755 ./run_root_settings && 
    # send to server
    scp  -r -P 10560 ./run_root_settings root@82.81.211.231:~
    say please insert password
}

function do_all {
    
    build_and_copy &&
    copy_php &&
    make_upload 
    say finished building
}

function do_js_php {

    build_and_copy &&
    copy_php 
    say finished mistaaaaa
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

