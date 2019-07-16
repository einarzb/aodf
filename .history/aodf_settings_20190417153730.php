<?php 

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
        $current_settings = get_ifconfig_settings();
        $old_file = shell_exec('cat /etc/network/interfaces');

        // $current_mask = $current_settings['netmask'];
        // die("current mask: $current_mask , new ip: $new_ip");

        // set_ip_mask($new_ip, $current_mask);
    }

    function set_netmask($new_mask){
        
        $current_settings = get_ifconfig_settings();
        $current_ip = $current_settings['ip'];
        die("current ip: $current_ip , new mask: $new_mask");
        set_ip_mask($current_ip, $new_mask);

    }



    function get_gateway(){
        
        $ifacestr = shell_exec("cat /etc/network/interfaces");
        $lines = explode(PHP_EOL,$ifacestr);       
        $gateway="";
        $hostname = "";
        foreach ($lines as $line){
            if (strpos($line, 'gateway')){
                
                $gateway = trim(substr($line, strpos($line, 'gateway')+8));
            }
            // if (strpos($line, 'hostname')){
                
            //     $hostname = trim(substr($line, strpos($line, 'hostname')+9));
            // }
        }
        return array(
            'gateway'=>$gateway, 
            // 'hostname'=>$hostname
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

    function get_ifconfig_settings() {

        $str = shell_exec("/sbin/ifconfig eth0");
        // ancient php version...
        $lines = explode(PHP_EOL,$str);
        $secondline = $lines[1];
        $topline = $lines[0];
        $ip_end = strpos($secondline,"  Bcast");

        $ip = substr(
            $secondline,
            (strpos($secondline,'addr:')+5),
            ($ip_end - (strpos($secondline,'addr:'))-4));

        $mac =substr($topline, (strpos($topline,'HWaddr ')+7));

        $netmask =substr(
            $secondline,
            (strpos( $secondline,'Mask:')+5)
            );

        return array(
            'mac_address' => trim($mac),
            'ip'    => trim($ip),
            'netmask'=>trim($netmask)
        );
        
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
        echo "$file_contents".PHP_EOL.PHP_EOL."$updated_file_contents"; 
        return shell_exec("/root/run_root_settings 3 '$updated_file_contents'");
    }

    function get_ems_and_customer_ids(){
        $str=   shell_exec("cat /usr/share/aodf-web/root/aodf_config.json");
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
        return shell_exec("/root/run_root_settings 4 '$str'");
    }

    function get_parts_list(){
        $str=   shell_exec("cat /etc/hw-list/hw-list.json");

        $decoded =  json_decode($str , true );
        if(!$decoded) {
            $s = str_replace('NC",','NC"',$str);
            $decoded =  json_decode($s , TRUE );
        }
        return array(
            'aodf'=>array(
                'serial'=>$decoded['AODF']['S/N'],
                'part'=>$decoded['AODF']['P/N']
            )//,
            // 'robot'=>array(
            //     'serial'=>$decoded['AODF']['S/N'],
            //     'part'=>$decoded['AODF']['P/N']
            // )
        );
        return $decoded;
    }

    function get_settings(){
        return array_merge(
            get_ifconfig_settings(),
            get_gateway(),
            array('hostname'=>get_hostname(),
                  'time'=>get_machine_date(),
                  'repo_ip' =>get_repo_ip(),
                  'ntp_server'=>get_ntp_server(),
                  'ems_and_customer_ids'=>get_ems_and_customer_ids(),
                  'part_and_serial_numbers'=>get_parts_list()
        )

        );
    }

    function change_settings($settings_map){
        // echo "change_settings:\n";
        // echo(json_encode($settings_map));
        // loop over settings , keep note of need to reboot
        // some params are set together arrange accordingly;
        $need_reboot = FALSE;
        foreach($settings_map as $key => $value){
            // echo "$key $value ".PHP_EOL;
            switch($key){
                case'ip':
                    // $ip_and_mask['ip'] = $value;
                    set_ip($value);
                    $need_reboot = TRUE;
                    break;
                case'netmask':
                    set_netmask($value);
                   
                    break;
                case'hostname':
                    // echo "should set hostname to $value\n";
                    set_hostname($value);
                    break;    
                case'repo_ip':
                    echo "should set repo_ip to $value\n";
                    set_repo_ip($value);
                    break;  
                case'ntp_server':
                    echo "should set ntp_server to $value\n";
                    set_ntp_server($value);
                    break;  
                case 'ems_and_customer_ids':
                    set_ems_and_customer_ids($value);
                    break;            

            }
            
        }

        if ($need_reboot) {
            // shell_exec('reboot');
        }
        return array(
            "settings"=>get_settings(),
            "need_reboot"=>$need_reboot
        );
    }
    // set_hostname("omg");
    // echo "WOW"; 
?>