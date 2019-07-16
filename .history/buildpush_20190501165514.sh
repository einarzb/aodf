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
    make_upload &&
}

function do_js_php {

    build_and_copy &&
    copy_php 
}

[$1 == "all" ] do_all
  
[$1 == "web" ] do_js_php

[$1 == "php" ] copy_php

[$1 == "c" ] make_upload

[$1 == "js" ] make_upload
