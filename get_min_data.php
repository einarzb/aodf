<?php
$data["received_time"] = time();
$mac = shell_exec("/sbin/ifconfig eth0 | grep HWaddr | sed 's/.*HWaddr //'");
$ver = shell_exec("cat /etc/teliswitch_version");
$dver = shell_exec("cat /etc/debian_version");
$krel = shell_exec("uname -s ; uname -r");
$kver = shell_exec("uname -v");
$cam = shell_exec("/scripts/run_root 1 | grep camera | sed 's/^camera - //'");
$scripts = shell_exec("/scripts/run_root 1 | grep aodf-scripts | sed 's/^aodf-scripts - //'");
$mac = trim(preg_replace('/\s+/', ' ', $mac));
$systemname = shell_exec("hostname");
$systemname = trim(preg_replace('/\s+/', ' ', $systemname));
$data["mac"] = $mac;
$data["name"] = $systemname;
$data['last_modified_db'] = filemtime('/etc/aodf-db/AODF.db');
$data['last_modified_q_db'] = filemtime('/etc/aodf-db/connections_queue.db');
$data['last_modified_connections_log'] = filemtime('/var/log/connections_log.csv');

//get the json config in aodf_config.json
$json_file = file_get_contents('aodf_config.json');
$json = json_decode($json_file, true);
$data = array_merge($data, $json);

$data["answer_time"] = time();
echo json_encode($data);
?>
