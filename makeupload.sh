# make c program
docker run --rm -v /Users/zivtaller/Documents/current-projects/aodf_app:/data -w /data ev3cc make  && 
#chmod to spec
chmod +X ./run_root_settings && 
chmod 4755 ./run_root_settings && 
# send to server
scp  -r -P 10457 ./run_root_settings root@82.166.236.100:~