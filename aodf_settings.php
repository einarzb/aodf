<?php 
//$db = new PDO('sqlite:AODF.db');

// class Aodf_settings{
    $SETTER_PATH = '/root/run_root_settings';
    $COMMAND_HOSTNAME = 1;

    function set_something(){
        return '{"status":"COOL"}';
        
    }


    // function set_ip_mask($new_ip, $new_mask){
    //     $update_command = "/sbin/ifconfig eth0 $new_ip netmask $new_mask";
    //     shell_exec($update_command);
    // }

    function set_ip($new_ip){
        $old_file = shell_exec('cat /etc/network/interfaces');
        $ifconf = get_interface();
        $old_ip = $ifconf['ip'];
        $old_ip_line = "address $old_ip";
        $new_ip_line = "address $new_ip";
        $str = str_replace($old_ip_line, $new_ip_line, $old_file);
        $command = "/root/run_root_settings 5 '$str'";
        // die($command);

        return shell_exec($command );
      
    }

    function set_netmask($new_netmask){
        
   
        $old_file = shell_exec('cat /etc/network/interfaces');
        $ifconf =  get_interface();
        $old_netmask = $ifconf['netmask'];
        $old_netmask_line = "netmask $old_netmask";
        $new_netmask_line = "netmask $new_netmask";
        $str = str_replace($old_netmask_line, $new_netmask_line, $old_file);
        return shell_exec("/root/run_root_settings 5 '$str'");
    }

    function set_gateway($new_gateway){
        
   
        $old_file = shell_exec('cat /etc/network/interfaces');
        $ifconf = get_interface();
        $old_gateway = $ifconf['gateway'];
        $old_gateway_line = "gateway $old_gateway";
        $new_gateway_line = "gateway $new_gateway";
        $str = str_replace($old_gateway_line, $new_gateway_line, $old_file);
        return shell_exec("/root/run_root_settings 5 '$str'");
    }

    function get_interface(){
        
        $ifacestr = shell_exec("cat /etc/network/interfaces");
        $lines = explode(PHP_EOL,$ifacestr);       
        $gateway="";
        $hostname = "";
        foreach ($lines as $line){
            if (strpos($line, 'gateway')){
                
                $gateway = trim(substr($line, strpos($line, 'gateway')+8));
            }
            if (strpos($line, 'hostname')){
                
                $hostname = trim(substr($line, strpos($line, 'hostname')+9));
            }
            if (strpos($line, 'address')){
                
                $ip = trim(substr($line, strpos($line, 'address')+8));
            }
            if (strpos($line, 'netmask')){
                
                $netmask = trim(substr($line, strpos($line, 'netmask')+8));
            }
        }
        return array(
            'gateway'=>$gateway, 
            'hostname'=>$hostname,
            'netmask'=>$netmask,
            'ip'=>$ip
        );
    }

    function get_hostname(){
        return shell_exec("cat /etc/hostname");
    }

    function set_hostname($new_name){
        // $command = 'echo "ziv" | su root -c echo '.$new_name.' > /etc/hostname';
        $command = "/root/run_root_settings 1 '$new_name'";
        echo shell_exec($command); 
    }

    function get_mac_address() {

        $str = shell_exec("/sbin/ifconfig eth0");
        // ancient php version...
        $lines = explode(PHP_EOL,$str);
        $secondline = $lines[1];
        $topline = $lines[0];
        $ip_end = strpos($secondline,"  Bcast");

        // $ip = substr(
        //     $secondline,
        //     (strpos($secondline,'addr:')+5),
        //     ($ip_end - (strpos($secondline,'addr:'))-4));

        $mac =substr($topline, (strpos($topline,'HWaddr ')+7));

        // $netmask =substr(
        //     $secondline,
        //     (strpos( $secondline,'Mask:')+5)
        //     );

        // return array(
        //     'mac_address' => trim($mac),
        //     'ip'    => trim($ip),
        //     'netmask'=>trim($netmask)
        // );
        return trim($mac);
        
    }

    function get_machine_date(){
        return trim(shell_exec("date"));
    }

    function _get_hosts_file(){
        return shell_exec("cat /etc/hosts");
    }
    function get_repo_ip(){
        $str =  _get_hosts_file(); 
        $lines = explode(PHP_EOL,$str);
        $rep = "";
        foreach ($lines as $line) {
            if (strpos($line, 'teliswitch_rep')){
                
                $rep = trim(substr($line,0, strpos($line, 'teliswitch_rep')));
                break;
            }
        }
        return $rep;
    }
    function set_repo_ip($new_ip){
        $file_contents = _get_hosts_file();
        $old_ip = get_repo_ip();
        $updated_file_contents = str_replace($old_ip, $new_ip, $file_contents);
        // echo "$file_contents".PHP_EOL.PHP_EOL."$updated_file_contents"; 
        // $command = 
        return shell_exec("/root/run_root_settings 2 '$updated_file_contents'");
    }

    function get_ntp_server(){
        $str=   shell_exec("cat /etc/default/ntpdate | grep NTPSERVERS");
        return trim(str_replace("\"","",substr($str,strpos($str,"=")+1)) );
    }
    
    function set_ntp_server($new_server){
        $file_contents = shell_exec("cat /etc/default/ntpdate");
        $old_server = get_ntp_server();
        $updated_file_contents = str_replace($old_server, $new_server, $file_contents);
        // echo "$file_contents".PHP_EOL.PHP_EOL."$updated_file_contents"; 
        return shell_exec("/root/run_root_settings 3 '$updated_file_contents'");
    }

    function get_ems_and_customer_ids(){
        $str =   shell_exec("cat /usr/share/aodf-web/root/aodf_config.json");
        return json_decode($str, TRUE);
    }

    function set_ems_and_customer_ids($new_json){
        // $str=   shell_exec("cat /usr/share/aodf-web/root/aodf_config.json");
        $str = '{
            "CUSTOMER_MAJOR_ID":"'.$new_json['CUSTOMER_MAJOR_ID'].'",
            "CUSTOMER_MINOR_ID":"'.$new_json['CUSTOMER_MINOR_ID'].'",
            "EMS_MAJOR_ID":"'.$new_json['EMS_MAJOR_ID'].'",
            "EMS_MINOR_ID":"'.$new_json['EMS_MINOR_ID'].'"
        }';
       // echo $str;
        return shell_exec("/root/run_root_settings 4 '$str'");
    }

    function get_parts_list(){
        $decoded = get_all_configs();
        
        return array(
            'aodf'=>array(
                'serial'=>$decoded['AODF']['S/N'],
                'part'=>$decoded['AODF']['P/N']
            ),
            'robot'=>array(
                'serial'=>$decoded['Robot']['S/N'],
                'part'=>$decoded['Robot']['P/N']
            )
        );
        return $decoded;
    }

    function get_settings(){
        return array_merge(
            // get_ifconfig_settings(),
            get_ems_and_customer_ids(),
            get_interface(),
            array('hostname'=>get_hostname(),
                  'time'=>get_machine_date(),
                  'repo_ip' =>get_repo_ip(),
                  'ntp_server'=>get_ntp_server(),
                  'part_and_serial_numbers'=>get_parts_list(),
                  'mac_address'=>get_mac_address(),
                  'ntp_sync'=>get_ntp_sync()
        )
        );
    }

    function change_settings($settings_map){
        // echo "change_settings:\n";
        // echo(json_encode($settings_map));
        // loop over settings , keep note of need to reboot
        // some params are set together arrange accordingly;
        $need_reboot = FALSE;
        $old_ids = get_ems_and_customer_ids();
        $ids_change = FALSE;
        foreach($settings_map as $key => $value){
            // echo "$key $value ".PHP_EOL;
            if (isset($old_ids[$key])){
                $old_ids[$key] = $value;
                $ids_change = TRUE;
            }

            switch($key){
                case'ip':
                    // $ip_and_mask['ip'] = $value;
                    set_ip($value);
                    $need_reboot = TRUE;
                    break;
                case'netmask':
                    set_netmask($value);
                    $need_reboot = TRUE;
                   
                    break;
                case'gateway':
                    set_gateway($value);
                    $need_reboot = TRUE;
                    
                    break;
                case'hostname':
                    $need_reboot = TRUE;
                // echo "should set hostname to $value\n";
                    set_hostname($value);
                    break;    
                case'repo_ip':
                    // echo "should set repo_ip to $value\n";
                    set_repo_ip($value);
                    break;  
                case'ntp_server':
                    // echo "should set ntp_server to $value\n";
                    set_ntp_server($value);
                    break;  
                    
                case 'ntp_sync':
                    set_ntp_sync($value);
                    break;  
            }
            
        }
        if ($need_reboot){
            // echo "should toggle reboot";
            toggle_reboot_flag(TRUE);
        }
        if ($ids_change){
            set_ems_and_customer_ids($old_ids);
        }
        return array(
            "settings"=>get_settings(),
            "need_reboot"=>is_reboot_needed()
        );
    }

    function is_reboot_needed(){
        $cat_res = shell_exec("cat /etc/aodfrneeded");
        
        if (strpos( $cat_res, "No such file") !== FALSE){
            // init flag
            toggle_reboot_flag(FALSE);
            return FALSE;
        }
        return $cat_res ? TRUE : FALSE;
    }

    function toggle_reboot_flag($on){
        // echo "in toggle reboot $on";
        return $on ? shell_exec("/root/run_root_settings 7") : shell_exec("/root/run_root_settings 8");
    }

    function do_reboot(){
        // toggle_reboot_flag(FALSE);
        // sleep(1);
        $res = shell_exec("/root/run_root_settings 6");
        // sleep(2);
        return $res;
    }

    function set_machine_date($new_date){
        // echo $new_date;
        $res = shell_exec("/root/run_root_settings 10 '$new_date'");
        return $res;
    }

    function set_ntp_sync($new_sync){
        $res = exec("/scripts/enable_ntp_usage $new_sync");
        return $res;
    }

    function get_ntp_sync(){
        $e_res = exec("/scripts/enable_ntp_usage");
        $res_arr = explode(" ",$e_res);
        return count($res_arr)>1 ? $res_arr[1] : '-1';
            
    }
    
    function dump_log(){
        shell_exec("logread > /tmp/logread.txt");
        $date = get_machine_date();
        $end_line = PHP_EOL . PHP_EOL . "retrieval date: $date ";
        shell_exec("echo '$end_line' >> /tmp/logread.txt");
    }
    // set_hostname("omg");
    // echo "WOW"; 

     
   // configuration screen

    function get_config_settings(){
        return array(
                'part_and_serial_numbers' => get_parts_list(),
                'mac_address' => get_mac_address(),
                'temparture' => get_temparture(),
                'optic_cable_list' => get_optic_cable_list()
        );   
    }

    function get_temparture(){
        $str= shell_exec("cat /etc/hw-list/hw-list.json");
        $decoded =  json_decode($str , true );
         // echo $decoded;

        if(!$decoded) {
            $s = str_replace('NC",','NC"',$str);
            $decoded =  json_decode($s , TRUE );
        }
        $temp = array(
            'high'=>$decoded['AODF']['Temperature']['high'],
            'low'=>$decoded['AODF']['Temperature']['low']
        );

        return $temp;
        return $decoded;
    }

    function get_optic_cable_list(){
        $str= shell_exec("cat /etc/hw-list/hw-list.json");
    
        $decoded =  json_decode($str , true );
    
        if(!$decoded) {
            $s = str_replace('NC",','NC"',$str);
            $decoded =  json_decode($s , TRUE );
        }

        return array(
            'plates_fiber_optic_cable'=>array(
                'manufacture'=>$decoded['plates fiber optic cable']['Manufacture'],
                'model'=>$decoded['plates fiber optic cable']['Model']
            ),
            'reels_fiber_optic_cable' => array(
                'manufacture'=>$decoded['reels fiber optic cable']['Manufacture'],
                'model'=>$decoded['reels fiber optic cable']['Model']
            )
        );
        return $decoded;
    }


    function change_configs($configs_map){
        foreach($configs_map as $key => $value){
            switch($key){
                case 'temp_aodf_low':
                    set_low_temp($value);
                    break;
                case 'temp_aodf_high':
                    set_high_temp($value);
                    break;                       
            }
        }

            return array(
                "configs"=>get_config_settings()
            );
    }

    function get_all_configs(){
        $str=   shell_exec("cat /etc/hw-list/hw-list.json");

        $decoded =  json_decode($str , true );
        if(!$decoded) {
            $s = str_replace('NC",','NC"',$str);
            $decoded =  json_decode($s , TRUE );
        }
        return $decoded;
    }

    function set_low_temp($new_low_temp) {
        $all_configs = get_all_configs();
        $all_configs['AODF']['Temperature']['low'] = $new_low_temp;
        $all_configs_str = json_encode($all_configs);

        $command = "/root/run_root_settings 13 '$all_configs_str'";
        //PROBLEM: json has too many chars - so it doesnt reach the C command 
        // THIS WORKS: "all configs str: ".$all_configs_str."\n\n";
        // TODO: upload file to c and not send string
         echo "testing... " . updateFile_exec($command)." blah\n\n"; 

       // return shell_exec("/root/run_root_settings 13 '$all_configs_str'");
    }

    function set_high_temp($new_high_temp) {
        $all_configs = get_all_configs();
        $all_configs['AODF']['Temperature']['high'] = $new_high_temp;
        $all_configs_str = json_encode($all_configs);

        $command = "/root/run_root_settings 13 '$all_configs_str'";
        //PROBLEM: json has too many chars - so it doesnt reach the C command 
        // THIS WORKS: "all configs str: ".$all_configs_str."\n\n";
        // TODO: upload file to c and not send string
         echo "testing... " . updateFile_exec($command)." blah\n\n"; 

       // return shell_exec("/root/run_root_settings 13 '$all_configs_str'");
    }
 
    
    function get_params(){
        $str= shell_exec("cat /etc/aodf-scripts/params.json");
    
        $decoded =  json_decode($str , true );
    
        if(!$decoded) {
            $s = str_replace('NC",','NC"',$str);
            $decoded =  json_decode($s , TRUE );
        }
        return array(
            'parking_target_x_pos'=>$decoded['PARKING_TARGET_X_POS'],
            'regular_plate_target_x_pos'=>$decoded['REGULAR_PLATE_TARGET_X_POS'],
            'parking_target_y_pos'=>$decoded['PARKING_TARGET_Y_POS'],
            'regular_plate_target_y_pos'=>$decoded['REGULAR_PLATE_TARGET_Y_POS'],
            'parking_plate_insert_parameter' => $decoded['P_PLATE_INSERT_EXTENDER_CORRECTION'],
            'parking_plate_pull_parameter' => $decoded['P_PLATE_PULL_EXTENDER_CORRECTION'],
            'regular_plate_insert_parameter' => $decoded['R_PLATE_INSERT_EXTENDER_CORRECTION'],
            'regular_plate_pull_parameter' => $decoded['R_PLATE_PULL_EXTENDER_CORRECTION']
        );
        return $decoded;        
    }

    # calibration screen
    
    function plate_restart($data) {
        $selectedPlate = $data[0];
        $plateSample = $data[1][0];
        $e_res = exec("/scripts/plate_restart '$selectedPlate' '$plateSample'");
        return $e_res;
    }

    function get_reel_calibration(){
        $e_res = exec("/scripts/restart_home_port_pos");
        return $e_res;
    }

    function update_plate($allData){
        //init data
        $plateNumToUpdate = $allData[0];
        $currentPlateHeight = $allData[1][0]; // gives value! I need key - should be HEIGHT1, HEIGHT2 etc 
        $newPlateHeight = $allData[2];
        
        //db
        $newHeights_array=array();
        $db = new PDO('sqlite:AODF.db');
        $updatedHeight = $db->query("update PLATE_INFO set HEIGHT1=$newPlateHeight where PLATE_NUMBER=$plateNumToUpdate;");
                
        while($newHeight=$updatedHeight->fetch(PDO::FETCH_ASSOC)) {
            array_push(
                $newHeights_array,
                $newHeight["HEIGHT1"]
          );
        }
        echo $newHeights_array;
        return $newHeights_array;


    }    
    // TODO: join db plate_type to regular
    function set_reel_to_parking($reelNum){
        $e_res = exec("/scripts/manual_put_homeport_on_park '$reelNum'");
        return $e_res;
    }

    # quick commands

    function plate_rot_in(){
        $e_res = exec("/scripts/plt_io 1");
        return $e_res;
    }

    function plate_rot_out(){
        $e_res = exec("/scripts/plt_io_reset");
        return $e_res;
    }

    function gripper_in() {
        $e_res = exec("/scripts/grp_io 1");
        return $e_res;
    }

    function gripper_out() {
        $e_res = exec("/scripts/grp_io_reset");
        return $e_res;
    }

    function gripper_close() {
        $e_res = exec("/scripts/grp_oc 0");
        return $e_res;
    }

    function gripper_open() {
        $e_res = exec("/scripts/grp_oc_reset");
        return $e_res;
    }

    function power_off(){
        $res = shell_exec("/root/run_root_settings 11");
        return $res;
    }

    function fetch_plates(){
        $plates_array=array();
        $db = new PDO('sqlite:AODF.db');
        $result = $db->query("select PLATE_NUMBER from PLATE_INFO;");
        while($plate=$result->fetch(PDO::FETCH_ASSOC))
          {     
            
            array_push(
                  $plates_array,
                  $plate["PLATE_NUMBER"]
            );
         }
        return $plates_array;
    }
    

    function fetch_plates_height1($plateNum) {
        $heights_array=array();
        $db = new PDO('sqlite:AODF.db');
        $height1OfPlates = $db->query("select HEIGHT1 from PLATE_INFO where PLATE_NUMBER=$plateNum;");
                
        while($height01=$height1OfPlates->fetch(PDO::FETCH_ASSOC)) {
            array_push(
                $heights_array,
                $height01["HEIGHT1"]
          );
        }
        return $heights_array;
    }
    function fetch_plates_height2($plateNum) {
        $heights_array=array();
        $db = new PDO('sqlite:AODF.db');
        $height2OfPlates = $db->query("select HEIGHT2 from PLATE_INFO where PLATE_NUMBER=$plateNum;");
        
        while($height02=$height2OfPlates->fetch(PDO::FETCH_ASSOC)) {
            array_push(
                $heights_array,
                $height02["HEIGHT2"]
          );
        }

        return $heights_array;
    }
    function fetch_plates_height3($plateNum) {
        $heights_array=array();
        $db = new PDO('sqlite:AODF.db');
        $height3OfPlates = $db->query("select HEIGHT3 from PLATE_INFO where PLATE_NUMBER=$plateNum;");
        
        while($height03=$height3OfPlates->fetch(PDO::FETCH_ASSOC)) {
            array_push(
                $heights_array,
                $height03["HEIGHT3"]
          );
        }

        return $heights_array;
    }
    function fetch_plates_height4($plateNum) {
        $heights_array=array();
        $db = new PDO('sqlite:AODF.db');
        $height4OfPlates = $db->query("select HEIGHT4 from PLATE_INFO where PLATE_NUMBER=$plateNum;");
        
        while($height04=$height4OfPlates->fetch(PDO::FETCH_ASSOC)) {
            array_push(
                $heights_array,
                $height04["HEIGHT4"]
          );
        }

        return $heights_array;
    }

    function fetch_reels(){
        $reels_array=array();
        $db = new PDO('sqlite:AODF.db');
 
       # $result = $db->query("select PLATE_TYPE from PLATE_INFO;");
   
        $result = $db->query("select wheelid from wheel_info;");
        /*
        $result = $db->query("select wheel_info.wheelid, wheel_info.plate_number, PLATE_INFO.PLATE_NUMBER, PLATE_INFO.PLATE_TYPE 
        from wheel_info 
        INNER JOIN PLATE_INFO ON wheel_info.plate_number=PLATE_INFO.PLATE_NUMBER WHERE PLATE_INFO.PLATE_TYPE=Regular;");

        $result = $db->query("select wheel_info.wheelid
        from wheel_info 
        FULL JOIN PLATE_INFO ON wheel_info.plate_number=PLATE_INFO.PLATE_NUMBER WHERE PLATE_INFO.PLATE_TYPE=Regular;");
*/
#        SELECT Orders.OrderID, Customers.CustomerName, Orders.OrderDate
#FROM Orders
#INNER JOIN Customers ON Orders.CustomerID=Customers.CustomerID;
        while($reel=$result->fetch(PDO::FETCH_ASSOC))
          {     
            
            array_push(
                  $reels_array,
                  $reel["wheelid"]
            );
         }
        return $reels_array;
    }

    # quick commands
    function get_connections(){
        $connections_array=array();
        $db = new PDO('sqlite:connections_queue.db');
        $result = $db->query("select * from pointer;");
 
         while($connection=$result->fetch(PDO::FETCH_ASSOC))
           {     
             array_push(
                   $connections_array,
                   $connection['start'],
                   $connection['stop']
             );
          }
         return $connections_array;
    }

    function update_connection($stop){
        $connections_array=array();
        $db = new PDO('sqlite:connections_queue.db');
        $updatedStop = $db->query("update pointer set stop=52");
        while($newStop=$updatedStop->fetch(PDO::FETCH_ASSOC)) {
            array_push(
                $connections_array,
                $newStop["stop"]
          );
        }
        echo $connections_array;
        return $connections_array;

    }



    /*
    function fetch_plates_height2($plateNum) {
        $heights_array=array();
        $db = new PDO('sqlite:AODF.db');
        $height2OfPlates = $db->query("select HEIGHT2 from PLATE_INFO where PLATE_NUMBER=$plateNum;");
        
        while($height02=$height2OfPlates->fetch(PDO::FETCH_ASSOC)) {
            array_push(
                $heights_array,
                $height02["HEIGHT2"]
          );
        }

        return $heights_array;
    }
       
        */
    
?>