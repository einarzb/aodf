#!/bin/bash
function copy_php {
    scp -r -P 10457 ./*.php root@82.166.236.100:/usr/share/aodf-web/root/
}

function build_and_copy {
    cd react-dashboard/ 
    npm run-script build &&
    cd ..
    node index_updater.js &&
    scp -r -P 10457 ./react-dashboard/build/* root@82.166.236.100:/usr/share/aodf-web/root/machine_settings    
}

function make_upload {
    # make c program
    docker run --rm -v /Users/zivtaller/Documents/current-projects/aodf_app:/data -w /data ev3cc make  && 
    #chmod to spec
    chmod +X ./run_root_settings && 
    chmod 4755 ./run_root_settings && 
    # send to server
    scp  -r -P 10457 ./run_root_settings root@82.166.236.100:~
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

