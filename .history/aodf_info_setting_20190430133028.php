<!--
	filename:		aodf_info_setting.php
	description:
	ver.:			0.2.0  2016-03-09 13:44
					HST
-->
	<?php
	error_reporting(E_ALL);
	ini_set("display_errors", '1');
	$systemname = shell_exec("hostname");	

	// Show all information, defaults to INFO_ALL
	//phpinfo();
	?>
	
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<title>AODF <?php echo $systemname;?> configuration settings </title>
	<link   rel="stylesheet" type="text/css" href="aodf.css" />

	<script type="text/javascript" src="/js/jquery.min.js"></script>
	<script type="text/javascript" src="aodf.js"></script>
	
	<link href="css/bootstrap.min.css" rel="stylesheet">
	<link href="css/bootstrap_new.css" rel="stylesheet">
    <link   href="css/bootstrap-datetimepicker.min.css" rel="stylesheet">
	<style  type="text/css">
    #content table
    {
        margin-left: 60px;
        height:100%;
        width:100%;
    }
    #plateform table
    {
        margin-right: 30px;
    }
    #coninfodisp label
    {
        width: 150px;
    }
    #coninfodisp input
    {
        width: 150px;
    }
	</style>
</head>
<body style="margin: 0px; padding: 0px; ">

	<script src="js/jquery-2.1.1.min.js"></script>
	<!-- <script src="js/bootstrap.min.js"></script> -->
<!-- 
	<script src="js/typeahead.js"></script>
 -->
	<!-- <script src="js/date.js"></script>
	<script src="js/bootstrap-datetimepicker.min.js"></script> -->
	<script type="text/javascript" src="aodf.js"></script>
	<?php 
//	require_once 'sysinfo_display.php';
	
	$new_hour = $new_min = "" ;
	$new_day = $new_month = $new_year = "" ;
	
	$new_aodf_ip_addr = $new_netmask =  $new_gateway = "" ;

	$current_customer_id = $current_ems_id = "" ;
	$new_customer_id = $new_ems_id = "" ;
	
	$aodf_repository_ip = $new_aodf_repository_ip = "" ; # "AODF_REPOSITORY_IP":"192.168.2.77",
	$robotic_module_serial_number = $new_robotic_module_serial_number = "" ; # "ROBOTIC_MODULE_SERIAL_NUMBER":"RM_00001",
	$optical_module_serial_number = $new_optical_module_serial_number = "" ; # "OPTICAL_MODULE_SERIAL_NUMBER":"AODF_00022"
	$ntp_server_ip_field = "" ;
	
	$base_dir = dirname(__FILE__)  ;
	$interfaces_dir = "/etc/network" ;
	$interfaces_fn = "interfaces";
	$hosts_fn = "/etc/hosts" ;
	$repo_server_name = "teliswitch_rep" ;
	
	$resolv_fn = "/etc/resolv.conf" ;
	
	$aodf_config_fn = "/usr/share/aodf-web/root/aodf_config.json" ;
	#$aodf_config_fn2 = "aodf_config_DEBUG.json"; // for debug purposes ONLY 
	

	$aodf_name_fn = "/etc/hostname" ;
	$current_aodf_name = load_aodf_name( $aodf_name_fn ) ; #$systemname ;
	#$aodf_name_new_fn = $aodf_name_fn ;
	#$aodf_name_new_fn = "hostname_new" ;
	
	
	
	define('AODF_IP_ADDR_SELECT', "1");
	define('AODF_NETMASK_SELECT', "2");
	define('AODF_GATEWAY_SELECT', "3");
	define('AODF_REPO_ADDR_SELECT', "4");
	
	#$current_mac	= shell_exec("/sbin/ifconfig eth0 | grep HWaddr | sed 's/.*HWaddr //'");
	$current_mac	= shell_exec("cat /sys/class/net/eth0/address");
	
	#$current_ip		= shell_exec("/sbin/ifconfig eth0 | grep 'inet addr:' | cut -d: -f2 | awk '{ print $1}'");
	$ipAddress = $_SERVER['SERVER_ADDR']; // fetch AODF IP address
	$current_netmask = read_current_ip( $interfaces_dir , $interfaces_fn , AODF_NETMASK_SELECT );
	$current_gateway = read_current_ip( $interfaces_dir , $interfaces_fn , AODF_GATEWAY_SELECT );
	
	$ntpservers_base_dir = "/etc/default/" ;
	$ntpservers_fn = "ntpdate" ;
	$ntp_server_ip_field = read_ntp_server_ip_addr( $ntpservers_base_dir , $ntpservers_fn ) ;

	$new_date_and_time = "" ;
	
	$cur_hwclock	= shell_exec("/scripts/run_root 3"); // hwclock -r
	#$cur_hwclock	= shell_exec("/scripts/run_root 1 | /sbin/hwclock -r ");
	#$cur_hwclock	= date ('d/m/y h:i:s'); 
	#$cur_hwclock	= shell_exec("hwclock -r ");
	#echo "<pre> cur_hwclock :   $cur_hwclock    </pre>";

	# read aodf config from aodf_config.json
	$new_aodf_config_arr = array();
	$new_aodf_config_array = array();

	$current_aodf_config_arr = array();
	$current_aodf_config_arr = load_aodf_config( $aodf_config_fn ) ;
	if ( empty($current_aodf_config_arr) != true ){
		$current_customer_id = $current_aodf_config_arr['CUSTOMER_MAJOR_ID'] ;
		$current_ems_id = $current_aodf_config_arr['EMS_MAJOR_ID'] ;		
		#$aodf_repository_ip = $current_aodf_config_arr['AODF_REPOSITORY_IP'] ;
	}
	
	$aodf_repository_ip = load_repo_ip( $hosts_fn );
	
	
	$hw_list_fn = "/etc/hw-list/hw-list.json" ;
	$hw_list_array = array();
	$hw_list_array = load_hw_list( $hw_list_fn );
	$robotic_module_serial_number = $hw_list_array['AODF']['ROBOT']['S/N'] ;
	$robotic_module_part_number = $hw_list_array['AODF']['ROBOT']['P/N'] ;
	$optical_module_serial_number = $hw_list_array['AODF']['OPTMODULE']['S/N'] ;
	$optical_module_part_number = $hw_list_array['AODF']['OPTMODULE']['P/N'] ;	
	$new_hw_list_array = array();

	
	if ($_SERVER["REQUEST_METHOD"] == "POST") {
		
		$ip_addr_select = AODF_IP_ADDR_SELECT ; // AODF IP addr.
		$new_aodf_ip_addr = read_new_ip_addr( $ip_addr_select ) ; # DD:DD:DD:DD
		if ( empty($new_aodf_ip_addr) != true ) {
			config_new_ip( $interfaces_dir , $interfaces_fn , $new_aodf_ip_addr , $ip_addr_select ) ;
		}
		$ip_addr_select = AODF_NETMASK_SELECT ; // aodf NETMASK IP addr.
		$new_netmask = read_new_ip_addr( $ip_addr_select ) ; # DD:DD:DD:DD
		if ( empty($new_netmask) != true ) {
			config_new_ip( $interfaces_dir , $interfaces_fn , $new_netmask , $ip_addr_select ) ;
		}
		$ip_addr_select = AODF_GATEWAY_SELECT ; // aodf GATEWAY IP addr.
		$new_gateway = read_new_ip_addr( $ip_addr_select ) ; # DD:DD:DD:DD
		if ( empty($new_gateway) != true ) {
			config_new_ip( $interfaces_dir , $interfaces_fn , $new_gateway , $ip_addr_select ) ;			
			config_nameserver( $resolv_fn , $new_gateway );
		}
		$ip_addr_select = AODF_REPO_ADDR_SELECT ; // aodf repository IP
		$new_repo_addr = read_new_ip_addr( $ip_addr_select ) ; # DD:DD:DD:DD
		if ( empty($new_repo_addr) != true ) {
			#echo "$new_repo_addr : " . $new_repo_addr . " <br>" ;
			config_new_repo_ip( $hosts_fn , $new_repo_addr ) ;
		} 
		
		
		$new_date_and_time = $_POST["new_datetime"] ; 
		if ( ! empty($new_date_and_time) ) {
			update_new_datetime( $new_date_and_time );
		}

		$new_aodf_name = read_new_aodf_name(); 
		if ( $new_aodf_name != "" ) {
			update_new_aodf_name( $aodf_name_fn , $new_aodf_name );
		}
		
		$new_ntp_server_ip = read_new_ntp_server_ip();
		if ( $new_ntp_server_ip != "" ) {
			update_new_ntp_server_ip( $ntpservers_base_dir , $ntpservers_fn , $new_ntp_server_ip );
		}
		
		$new_aodf_config_arr['CUSTOMER_MAJOR_ID']			= test_customer_id($_POST["new_customer_id_field"]) ; 
		$new_aodf_config_arr['EMS_MAJOR_ID'] 				= test_ems_id($_POST["new_ems_id_field"]) ; 		
		#$new_aodf_config_arr['AODF_REPOSITORY_IP'] = $new_repo_addr ;
		$new_aodf_config_array = write_new_aodf_config( $aodf_config_fn , $current_aodf_config_arr , $new_aodf_config_arr );

		
		$new_hw_list_array['AODF']['ROBOT']['S/N'] = test_robotic_module_serial_number( $_POST["new_robotic_module_serial_number_field"] ) ;
		$new_hw_list_array['AODF']['ROBOT']['P/N'] = test_robotic_module_part_number( $_POST["new_robotic_module_part_number_field"] ) ;
		$new_hw_list_array['AODF']['OPTMODULE']['S/N'] = test_optical_module_serial_number( $_POST["new_optical_module_serial_number_field"] ) ;
		$new_hw_list_array['AODF']['OPTMODULE']['P/N'] = test_optical_module_part_number( $_POST["new_optical_module_part_number_field"] ) ;
		write_new_hw_list( $hw_list_array, $new_hw_list_array ) ;
		
		#$repo_server_name
	
	}





	
#
#
#		Functions
#
#	
	function load_aodf_name( $aodf_name_fn ){
		$aodf_name = file_get_contents( $aodf_name_fn );
		$aodf_name = ltrim($aodf_name);
		$aodf_name = rtrim($aodf_name);
		
		return $aodf_name ;
	}

	function config_nameserver( $resolve_fn , $new_nameserver ){
		$resolve_file = file( $resolve_fn );
		$filerow = "" ;
		$lookfor = "nameserver" ; 
		foreach ( $resolve_file as $filerow ) {
			if ( strstr($filerow, $lookfor) != false ){
				$newline = $lookfor . " " . $new_nameserver . "\n";
			} else {
				$newline = $filerow ;
			}
			$new_content[] = $newline;
		}		
		$file_new_content = implode( $new_content );
		$ret_code = file_put_contents( $resolve_fn , $file_new_content);
		
		return $ret_code ; 
	}

	function read_new_aodf_name(  ){
		$new_aodf_name 	= test_customer_id($_POST["new_aodf_name_field"]) ;
		if ( $new_aodf_name != "" ) {
			$pattern1 =  '/^[a-zA-Z0-9\_\.\-]*$/' ;
			$match1 = preg_match( $pattern1 , $new_aodf_name );
			#$pattern1 =  '/^[A-Za-z0-9_@./-]*$/' ;
			#$pattern2 = '[:blank:]' ;
			#$match2 = preg_match( $pattern2 , $new_aodf_name );
			#$pattern3 = '[:punct:]' ; # . , " ' ? ! ; : # $ % & ( ) * + - / < > = @ [ ] \ ^ _ { } | ~
			#$match3 = preg_match( $pattern3 , $new_aodf_name );
			#$pattern4 =  '/^[@./]*$/' ;
			#$match4 = preg_match( $pattern4 , $new_aodf_name );
			if ( $match1 != true ){
				echo "ERR: aodf name \"" . $new_aodf_name . "\"contains blank char. " . "<br>" ;
				$new_aodf_name = "" ;
			}
		}		
		return $new_aodf_name;
	}
		
	function update_new_aodf_name( $fn , $aodf_name ){
		#echo "update aodf_name : \"" . $aodf_name . "\" in file : " . $fn . "<br>";
		$ret_code = file_put_contents( $fn , $aodf_name );
		
		
		return $ret_code ;
	}

	function write_new_aodf_config( $aodf_config_fn , $current_aodf_config_arr , $new_aodf_config ){
		if ( $new_aodf_config['CUSTOMER_MAJOR_ID'] != "" ) {
			$new_customer_id = $new_aodf_config['CUSTOMER_MAJOR_ID'] ;
		} else {
			$new_customer_id = $current_aodf_config_arr['CUSTOMER_MAJOR_ID'] ;
		}
		$n_aodf_config_arr['CUSTOMER_MAJOR_ID'] = $new_customer_id ;

		if ( $new_aodf_config['EMS_MAJOR_ID'] != "" ) {
			$new_ems_id = $new_aodf_config['EMS_MAJOR_ID'] ;
		} else {
			$new_ems_id = $current_aodf_config_arr['EMS_MAJOR_ID'] ;
		}
		$n_aodf_config_arr['EMS_MAJOR_ID'] = $new_ems_id ;
	}

	function read_json_file( $json_filename ){
		$json_data = array();
		$data_obj = file_get_contents( $json_filename ) ;
		if ( $data_obj != false ){
			#echo "read_json_file success : " . $json_filename . " <br>" ;
			$json_data = json_decode( $data_obj , true); # decode an array from an object
		} else {
			echo "read_json_file FAILED : " . $json_filename . " <br>" ;			
		}
		return $json_data ;
	}

	
	function write_json_file( $json_filename , $data_array ){
		$ret_code = false ;
		$data_obj = json_encode( $data_array ) ; # encode to an object
		if ( $data_obj != false ){
			#echo "write_json_file success : " . $json_filename . " <br>" ;
			$ret_code = file_put_contents( $json_filename , $data_obj );
			#$json_data = json_encode( $data_obj , true); # decode an array from an object
		} else {
			echo "write_json_file FAILED : " . $json_filename . " <br>" ;
		}
		return $ret_code ;
	}

	//
	// loads the config info from aodf_config.json file
	//
	function load_aodf_config( $aodf_config_fn ){
		$aodf_config_arr = array();
		$aodf_config_arr = read_json_file( $aodf_config_fn ) ;
		return $aodf_config_arr ;
	}

	//
	// read the ip address field from user UI
	//
	function read_new_ip_addr( $ipaddr_select ){
		if ( $ipaddr_select == AODF_IP_ADDR_SELECT ){ // AODF IP
			# verify aodf IP addr.
			$new_ip_addr1 = test_ip_input($_POST["new_aodf_ip_addr1"]);
			$new_ip_addr2 = test_ip_input($_POST["new_aodf_ip_addr2"]);
			$new_ip_addr3 = test_ip_input($_POST["new_aodf_ip_addr3"]);
			$new_ip_addr4 = test_ip_input($_POST["new_aodf_ip_addr4"]);
		} elseif ( $ipaddr_select == AODF_NETMASK_SELECT ) { // AODF netmask IP addr
			$new_ip_addr1 = test_ip_input($_POST["new_netmask_addr1"]);
			$new_ip_addr2 = test_ip_input($_POST["new_netmask_addr2"]);
			$new_ip_addr3 = test_ip_input($_POST["new_netmask_addr3"]);
			$new_ip_addr4 = test_ip_input($_POST["new_netmask_addr4"]);
		} else if ( $ipaddr_select == AODF_GATEWAY_SELECT  ) { // AODF gateway IP addr
			$new_ip_addr1 = test_ip_input($_POST["new_gateway_addr1"]);
			$new_ip_addr2 = test_ip_input($_POST["new_gateway_addr2"]);
			$new_ip_addr3 = test_ip_input($_POST["new_gateway_addr3"]);
			$new_ip_addr4 = test_ip_input($_POST["new_gateway_addr4"]);
		} elseif ( $ipaddr_select == AODF_REPO_ADDR_SELECT ) { // AODF repository IP addr
			# verify repository IP addr.
			$new_ip_addr1 = test_ip_input($_POST["new_aodf_repository_ip_field1"]);
			$new_ip_addr2 = test_ip_input($_POST["new_aodf_repository_ip_field2"]);
			$new_ip_addr3 = test_ip_input($_POST["new_aodf_repository_ip_field3"]);
			$new_ip_addr4 = test_ip_input($_POST["new_aodf_repository_ip_field4"]);
		} else {
			;
		}
		
		if ( ($new_ip_addr1 != "") && ($new_ip_addr2 != "") && ($new_ip_addr3 != "") && ($new_ip_addr4 != "") ) {
			#echo " - " . $new_ip_addr1 . '.' . $new_ip_addr2 . '.' . $new_ip_addr3 . '.' . $new_ip_addr4 . " <br>";
			$new_ip_addr = $new_ip_addr1 . '.' . $new_ip_addr2 . '.' . $new_ip_addr3 . '.' . $new_ip_addr4 ;
			if ( filter_var( $new_ip_addr, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4 ) == true ) {
				#$new_ip_addr_valid = "$new_ip_addr is a valid IPv4 address" ;
				#echo  "VALID new IP addr : " . $new_ip_addr . "<br>";
			} else {
				switch ( $ipaddr_select ) {
					case AODF_IP_ADDR_SELECT:
						#display_field_warnning_msg( "AODF_IP_ADDR" , $new_ip_addr );
						break;
					case AODF_NETMASK_SELECT :
						#display_field_warnning_msg( "AODF_NETMASK" , $new_ip_addr );
						break;
					case AODF_GATEWAY_SELECT :
						#display_field_warnning_msg( "AODF_GATEWAY" , $new_ip_addr );
						break;
					case AODF_REPO_ADDR_SELECT :
						#display_field_warnning_msg( "AODF_REPO_ADDR" , $new_ip_addr );
						break;
					default:
						break;
				}
				#$new_ip_addr_valid = "$new_ip_addr is NOT a valid IPv4 address" ;
				#echo  "EMPTY IP addr : " . $new_ip_addr . "<br>";
				$new_ip_addr = "" ;
			}
		} else {
			#echo  "new IP , empty field : " . $new_ip_addr1 .".". $new_ip_addr2 .".". $new_ip_addr3 .".". $new_ip_addr4  ."<br>";
			$new_ip_addr = "" ;
		}
		#echo  "new_ip_addr : " . $new_ip_addr . "<br>";
		
		return $new_ip_addr ;
	}

	//
	// test each address field for correctness
	//
	function test_ip_input($data) {
		$data = trim($data);
		$data = stripslashes($data);
		if (is_numeric($data)) {
			return $data;
		} else {
			return " ";
		}		 
	}	 

	//
	//	read AODF network setup ip address 
	//
	function read_current_ip( $base_dir , $interfaces_fn , $ip_addr_select ){
		$found = false ;
		$filerow = "" ;
		$file_new_content = "" ;
		$interfaces_in_fn = $base_dir ."/". $interfaces_fn ;
		$interfaces_out_fn = $interfaces_in_fn ;
		#$interfaces_out_fn = $base_dir ."/". "interfaces_out.txt" ;

		$interfaces_file = file( $interfaces_in_fn );

		$lookfor1 = 'iface';
		$lookfor2 = 'eth0';
		$lookfor3 = 'inet' ;
		$lookfor4 = 'static' ;
		if ( $ip_addr_select == AODF_IP_ADDR_SELECT ) {
			$lookfor5 = 'address' ;
		} elseif ( $ip_addr_select == AODF_NETMASK_SELECT ){
			$lookfor5 = 'netmask' ;
		} elseif ( $ip_addr_select == AODF_GATEWAY_SELECT ) {
			$lookfor5 = 'gateway' ;
		} else {
			$lookfor5 = "" ; // $ip_addr_select is NOT recognized
		}
		
		if ( $lookfor5 != "" ) {
			#$newline =  "        " . $lookfor5 ." ". $new_ip_addr . " \n";

			$ret_code = "" ;
			foreach ( $interfaces_file as $filerow ) {
				if ( ( strstr($filerow, $lookfor1) != false ) && ( strstr($filerow, $lookfor2) != false ) && ( strstr($filerow, $lookfor3) != false ) && ( strstr($filerow, $lookfor4) != false )){
					$found = true ;
				} else if ( ( strstr($filerow, $lookfor5) != false ) && ( $found == true ) ){
					#$filerow = $newline ;
					$filerow = ltrim( $filerow );
					$filerow = rtrim( $filerow );
					$strings = explode(" ", $filerow );
					$ret_code = $strings[1] ;
					$ret_code = ltrim( $ret_code );
					#$ret_code = $filerow; // NEED to clear $look5 from line content
					break;
				}
				#$ret_code = $filerow; // NEED to clear $look5 from line content
			}
			#$file_new_content = implode( $new_content );
			#echo    " <pre>  $file_new_content  </pre> " ;
			#$ret_code = file_put_contents( $interfaces_out_fn , $file_new_content);
		} else {
			$ret_code = "" ; // Do noting, $ip_addr_select is NOT recognized 
		}
		return $ret_code;
	}
	 
	 
	 

	function read_ntp_server_ip_addr( $dir , $fn ){
		$servers_fn = $dir . $fn ;
		$interfaces_file = file( $servers_fn );
		$filerow = "" ;
		$lookfor = "NTPSERVERS" ; 
		$servers_names = "" ; 
		
		foreach ( $interfaces_file as $filerow ) {
			if ( strstr($filerow, $lookfor) != false ){
				$strings = explode("=", $filerow );
				$servers_names = $strings[1] ;
				$servers_names = ltrim($servers_names, "\"") ;				
				$servers_names = rtrim($servers_names, "\"") ;
				$servers_names = rtrim($servers_names, "\n") ;
				$servers_names = rtrim($servers_names, "\"") ;
				break;
			}
		}
		return $servers_names ;
	}


	function update_new_ntp_server_ip(   $ntpservers_base_dir , $ntpservers_fn , $new_ntp_server_ip ){
		$servers_fn = $ntpservers_base_dir . $ntpservers_fn ;
		$ntpdate_file = file( $servers_fn );
		$filerow = "" ;
		$lookfor = "NTPSERVERS" ; 
		$servers_names = "" ; 
		
		foreach ( $ntpdate_file as $filerow ) {
			if ( strstr($filerow, $lookfor) != false ){
				$strings = explode("=", $filerow );
				$newline = $lookfor . "=\"" . $new_ntp_server_ip . "\"\n";
			} else {
				$newline = $filerow ;
			}
			$new_content[] = $newline;
		}
		
		$file_new_content = implode( $new_content );
		$ret_code = file_put_contents( $servers_fn , $file_new_content);
	
		return $ret_code ;
	}

	function load_repo_ip( $hosts_fn ){
		$interfaces_file = file( $hosts_fn );
		$lookfor = "teliswitch_rep";
		if ( $lookfor != "" ) {
			$ret_code = "" ;
			foreach ( $interfaces_file as $filerow ) {
				if ( strstr($filerow, $lookfor) ){
					$strings = explode(" ", $filerow );
					$ret_code = $strings[0] ;
					$ret_code = ltrim( $ret_code );
					$ret_code = rtrim( $ret_code );
					break;
				}
			}
		} else {
			$ret_code = "" ;
		}
		return $ret_code;
		
	}

	 
	//
	//	write ip address to the right field, into the relevant AODF file 
	//
	function config_new_ip( $base_dir , $interfaces_fn , $new_ip_addr , $ip_addr_select ){
		$found = false ;
		$filerow = "" ;
		$file_new_content = "" ;
		$interfaces_in_fn = $base_dir ."/". $interfaces_fn ;
		$interfaces_out_fn = $interfaces_in_fn ;
		#$interfaces_out_fn = $base_dir ."/". "interfaces_out.txt" ;

		$interfaces_file = file( $interfaces_in_fn );

		$new_content = array();
		$lookfor1 = 'iface';
		$lookfor2 = 'eth0';
		$lookfor3 = 'inet' ;
		$lookfor4 = 'static' ;
		if ( $ip_addr_select == AODF_IP_ADDR_SELECT ) {
			$lookfor5 = 'address' ;
		} elseif ( $ip_addr_select == AODF_NETMASK_SELECT ){
			$lookfor5 = 'netmask' ;
		} elseif ( $ip_addr_select == AODF_GATEWAY_SELECT ) {
			$lookfor5 = 'gateway' ;
		} else {
			$lookfor5 = "" ; // $ip_addr_select is NOT recognized
		}
		
		if ( $lookfor5 != "" ) {
			$newline =  "        " . $lookfor5 ." ". $new_ip_addr . " \n";

			foreach ( $interfaces_file as $filerow ) {
				if ( ( strstr($filerow, $lookfor1) != false ) && ( strstr($filerow, $lookfor2) != false ) && ( strstr($filerow, $lookfor3) != false ) && ( strstr($filerow, $lookfor4) != false )){
					$found = true ;
				} else if ( ( strstr($filerow, $lookfor5) != false ) && ( $found == true ) ){
					$filerow = $newline ;
				}
				$new_content[] = $filerow;
			}
			$file_new_content = implode( $new_content );
			#echo    " <pre>  $file_new_content  </pre> " ;
			$ret_code = file_put_contents( $interfaces_out_fn , $file_new_content);
		} else {
			$ret_code = "" ; // Do noting, $ip_addr_select is NOT recognized 
		}
		return $ret_code;
	}
	 
	 
	//
	//	write ip address to the right field, into the relevant AODF file 
	//
	function config_new_repo_ip( $interfaces_fn , $new_ip_addr ){
		$filerow = "" ;
		$file_new_content = "" ;
		#$interfaces_out_fn = "/etc/hosts_new"  ; # $interfaces_in_fn ;

		$interfaces_file = file( $interfaces_fn );

		$new_content = array();
		$lookfor = "teliswitch_rep";
		
		if ( $lookfor != "" ) {
			$newline =  $new_ip_addr . "   " . $lookfor . " \n";
			foreach ( $interfaces_file as $filerow ) {
				if ( strstr($filerow, $lookfor) != false ){
					$filerow = $newline ;
				}
				$new_content[] = $filerow;
			}
			$file_new_content = implode( $new_content );
			#echo    " <pre>  $file_new_content  </pre> " ;
			$ret_code = file_put_contents( $interfaces_fn , $file_new_content);
		} else {
			$ret_code = "" ; // Do noting, $ip_addr_select is NOT recognized 
		}
		return $ret_code;
	}
	 
	//
	// read the new date field from user UI
	//
	function read_new_date(  ){
		$new_day = test_new_day($_POST["new_day_field"]) ;
		$new_month = test_new_month($_POST["new_month_field"]) ;
		$new_year = test_new_year($_POST["new_year_field"]) ;
		if ( ($new_day != "") && ($new_month != "") && ($new_year != "") ) {
			if ( checkdate ( $new_month , $new_day , $new_year ) == true ){
				$date_array = array( $new_year , $new_month , $new_day );
			} else {
				$date_array = array( );
			}
		} else {
			$date_array = array( );
		}
		return $date_array ;
	}
	
	function update_new_date( $new_year , $new_month , $new_day  , $new_hour , $new_min ){
		# # echo "new date : " . $new_day ."-". $new_month ."-". $new_year ."<br>";
		# date +%Y%m%d -s "20081128"
		# # shell_exec("date +%Y%m%d -s \"$new_year$new_month$new_day\"");
		#date mmddhhmmyyyy
		#$date_str = "date +%Y%m%d -s \"$new_month$new_day$new_hour$new_min$new_year\"";
		$date_str = "date \"$new_month$new_day$new_hour$new_min$new_year\"";
		echo "new date: " . $date_str . "<br/>";
		
		$ret_code = shell_exec("date_str");
		echo "update_new_date ret_code: " . $ret_code . "</br>" ;
	}

	
	
	function read_new_datetime( $new_date_and_time){
		#$new_date_and_time = $_POST["datetimepicker2"] ; #$_POST["datetimepicker2"] ;
		if ( $new_date_and_time != "" ){
			echo "new date and time: \"$new_date_and_time\"<br/>" ;
		} else{
			echo "new date and time: empty/none<br/>" ;
		}
	}
	
	//
	// read the new time field from user UI
	//
	function read_new_time(  ){
		$new_hour = test_new_hour($_POST["new_hour_field"]) ;
		$new_min = test_new_min($_POST["new_min_field"]) ;
		$new_sec = test_new_min($_POST["new_sec_field"]) ;
		if ( ($new_hour != "") && ($new_min != "") && ($new_sec != "") ) {
			$time_value = $new_hour . ":" . $new_min . ":" . $new_sec  ;
			if ( verify_time_format( $time_value ) ) {
				$time_array = array( $new_hour , $new_min , $new_sec );
			} else {
				$time_array = array();
			}
		} else {
			$time_array = array();
		}
		return $time_array ;
	}
	
	function update_new_datetime( $new_date_and_time ){
		#$new_date_and_time_array = preg_split( '/^(-\d|:\d|/s\d)$/' ,$new_date_and_time);
		$new_date_and_time_array = array();
		
		$tok = strtok($new_date_and_time, "- ");
		$i = 0 ;
		$new_date_and_time_array[$i] = $tok ;
		#echo "$new_date_and_time_array $i = $tok <br/>" ;
		while ( $tok != false ) {
			$i = $i + 1 ;
			$tok = strtok("- ");
			$new_date_and_time_array[$i] = $tok ;
			#echo "$new_date_and_time_array $i = $tok <br/>";
		}

		$new_day = $new_date_and_time_array[0];
		$new_month = $new_date_and_time_array[1];
		$new_year = $new_date_and_time_array[2];
		$new_time = $new_date_and_time_array[3];
		
		$date_str = "/usr/share/aodf-scripts/run_root 4 $new_year.$new_month.$new_day-$new_time" ;
		# from date-time widget :		30-03-2016 12:38:11
		# required to date command :	yyyy.mm.dd-hh:mm:ss
		# 
				
				
				
				
				
				
		# $new_date_and_time_array : {dd mm yyyy hh mm ss} 
		# date mmddhhmmyyyy   		<- date command format
		#$date_str = "date +%Y%m%d -s \"$new_month$new_day$new_hour$new_min$new_year\"";

		#$date_str = "hwclock -r 2>&1  1>/dev/null" ;
		
		# use shell script 'set_new_datetime.sh' (which has: -rwsr-sr-x  permissions)
		#set date cmnd: /usr/share/aodf-web/root/set_new_datetime.sh 021011142016
		#set date cmnd output : "Your command line contains 1 arguments date with 021011142016 as param, \n outputs: date: can't set date: Operation not permitted "
		#$date_str = "/usr/share/aodf-web/root/set_new_datetime.sh $new_date_and_time_array[1]$new_date_and_time_array[0]$new_date_and_time_array[3]$new_date_and_time_array[4]$new_date_and_time_array[2]" ;
		#$out = shell_exec( $date_str );
		
		

		#$date_str = "/scripts/run_root 4 $new_date_and_time_array[1]$new_date_and_time_array[0]$new_date_and_time_array[3]$new_date_and_time_array[4]$new_date_and_time_array[2]" ;
		
		#$date_str = "/usr/share/aodf-scripts/run_root 4 $new_date_and_time_array[1]$new_date_and_time_array[0]$new_date_and_time_array[3]$new_date_and_time_array[4]$new_date_and_time_array[2]" ;
		#$date_str = "/scripts/run_root 5 $new_date_and_time_array[1]$new_date_and_time_array[0]$new_date_and_time_array[3]$new_date_and_time_array[4]$new_date_and_time_array[2]" ;
		//echo " date_str: " . $date_str . "</br>" ;
		$out = shell_exec( $date_str );
		
		
		//echo "set date cmnd: " . $date_str . "<br/>";
		//echo "set date cmnd output : \"" . $out . "\"<br/>";
		
		
		
		#$out = shell_exec( "$date_str" );
		#$date_str = "ls -la" ;
		#$out = shell_exec( $date_str );
		
	}
	
	function update_new_time( $new_hour , $new_min , $new_sec ){
		#echo "new time : " . $new_min .":". $new_hour .":". $new_sec ."<br>";
		# date +%T -s "12:21:00"
		#$time_str = "date +%T -s \"$new_hour$new_min$new_sec\"";
		#echo "new time string : \"" . $time_str . "\"";
		#echo " <br/>" ;

		#   ????????????????????????		
	}
	
	
	//
	// verify time data format in field user UI
	//
	function verify_time_format( $time_value ) {
		$pattern1 = '/^(0?\d|1\d|2[0-3]):[0-5]\d:[0-5]\d$/';
		#$pattern2 = '/^(0?\d|1[0-2]):[0-5]\d\s(am|pm)$/i'; # 11:59 am|pm
		#return preg_match($pattern1, $time_value) || preg_match($pattern2, $time_value);
		return preg_match($pattern1, $time_value) ; #|| preg_match($pattern2, $time_value);
	}	
	
	//
	// verify new hour format in field time user UI
	//
	function test_new_hour( $hour_data ) {
		if ( $hour_data < 0 ) {
			$hour_data = '0' ;
		}
		if ( $hour_data > 24 ) {
			$hour_data = '24' ;
		}
		return $hour_data ;
	}
	
	//
	// verify new minutes data format in field time user UI
	//
	function test_new_min( $min_data ) {
		if ( $min_data < 0 ) {
			$min_data = '0' ;
		}
		if ( $min_data > 59 ) {
			$min_data = '59' ;
		}
		return $min_data ;
	}
	
	//
	// verify new sec data format in field time user UI
	//
	function test_new_sec( $sec_data ) {
		if ( $sec_data < 0 ) {
			$sec_data = '0' ;
		}
		if ( $sec_data > 59 ) {
			$sec_data = '59' ;
		}
		return $min_data ;
	}

	function test_new_day( $day_data ) {
		if ( $day_data < 0 ) {
			$day_data = '1' ;
		}
		if ( $day_data > 31 ) {
			$day_data = '31' ;
		}
		return $day_data ;
	}
	
	function test_new_month( $month_data ) {
		if ( $month_data < 0 ) {
			$month_data = '1' ;
		}
		if ( $month_data > 12 ) {
			$month_data = '12' ;
		}
		return $month_data ;
	}
	
	function test_new_year( $year_data ) {
		#$year = "1990" ;
		if ( $year_data < 1990 ) {
			$year_data = '1990' ;
		}
		if ( $year_data > 2050 ) {
			$year_data = '2050' ;
		}
		return $year_data ;
	}

	function test_customer_id( $customer_id_data ) {
		#$customer_id_data = "4" ;
		return $customer_id_data ;
	}
	
	function test_ems_id( $ems_id_data ) {
		#$ems_id_data = "1990" ;
		return $ems_id_data ;
	}

	function test_robotic_module_serial_number( $new_robotic_module_serial_number ) {
		if ( $new_robotic_module_serial_number == "" ){
			return null;
		}
		return $new_robotic_module_serial_number ;
	}
	function test_robotic_module_part_number( $new_robotic_module_part_number ) {
		if ( $new_robotic_module_part_number == "" ){
			return null;
		}
		return $new_robotic_module_part_number ;
	}

	function test_optical_module_serial_number( $new_optical_module_serial_number ) {
		if ( $new_optical_module_serial_number == "" ){
			return null ;
		}
		return $new_optical_module_serial_number ;
	}	
	function test_optical_module_part_number( $new_optical_module_part_number ) {
		if ( $new_optical_module_part_number == "" ){
			return null ;
		}
		return $new_optical_module_part_number ;
	}

	function test_aodf_repository_ip( $new_aodf_repository_ip ) {
		return $new_aodf_repository_ip ;
	}
	

	function read_new_ntp_server_ip(){
		$new_ntp_server_ip = $_POST["new_ntp_server_ip_field"] ;
		
		return $new_ntp_server_ip ;
	}

	function load_hw_list( $hw_list_fn  ){
		$hw_list = array() ;
		$hw_list = read_json_file( $hw_list_fn ) ;
		return $hw_list ;
	}

	function write_new_hw_list( $hw_list_array, $new_hw_list_array ) {
		if ( $new_hw_list_array['AODF']['ROBOT']['S/N'] != "" ) {
			$hw_list_array['AODF']['ROBOT']['S/N'] = $new_hw_list_array['AODF']['ROBOT']['S/N'] ;
		} 
		
		if ( $new_hw_list_array['AODF']['ROBOT']['P/N'] != "" ) {
			$hw_list_array['AODF']['ROBOT']['P/N'] = $new_hw_list_array['AODF']['ROBOT']['P/N'] ;
		}		
		
		if ( $new_hw_list_array['AODF']['OPTMODULE']['S/N'] != "" ) {
			$hw_list_array['AODF']['OPTMODULE']['S/N'] = $new_hw_list_array['AODF']['OPTMODULE']['S/N'] ;
		}
		
		if ( $new_hw_list_array['AODF']['OPTMODULE']['P/N'] != "" ) {
			$hw_list_array['AODF']['OPTMODULE']['P/N'] = $new_hw_list_array['AODF']['OPTMODULE']['P/N'] ;
		}
		
		$fn = "/etc/hw-list/hw-list.json" ;
		write_json_file( $fn , $hw_list_array );

	}

	
	
	
	
	
#
# User messages
#	
	function display_field_warnning_msg( $msg1 , $msg2 ){
		echo "! Warnning, field: " . $msg1 . " value: \"" . $msg2 . "\" is invalid  <br>" ;
	}

	
	
	


#
#	Debug functions
#

	function dbg_display_new_date_time( $new_hour , $new_min , $new_day , $new_month , $new_year){
		echo "<h4> new date time :</h4>";
		echo  $new_hour . ":" . $new_min    . "<br>" ;
		echo  $new_day  . "-" . $new_month  . "-" . $new_year  .  "<br>" ;
	}

//	function dbg_display_new_mac( $new_mac_addr_valid , $new_ip_addr_valid ){
//		echo "<h4> AODF new set parameters :</h4>";
//		echo " new_mac_addr : " . $new_mac_addr_valid  .  "<br>" ;
//		echo " new_ip_addr :  " . $new_ip_addr_valid .  "<br>" ;
//	}
	
	function dbg_display_new_aodf_config( $new_customer_id , $new_ems_id , $new_aodf_repository_ip  ,  $new_robotic_module_serial_number ,  $new_optical_module_serial_number ){
		echo " new customer_id : " . $new_customer_id  .  "<br>" ;		
		echo " new ems_id : " .  $new_ems_id   . "<br>" ;		
		echo " new_aodf_repository_ip : " . $new_aodf_repository_ip . "<br>" ;		
		echo " new_robotic_module_serial_number : " . $new_robotic_module_serial_number . "<br>" ;		
		echo " new_optical_module_serial_number : " . $new_optical_module_serial_number .  "<br>" ;
	}
	
	function dbg_display_current_aodf_config( $current_customer_id , $current_ems_id , $aodf_repository_ip , $robotic_module_serial_number  , $optical_module_serial_number ){
		echo " current_customer_id : " . $current_customer_id  . "<br>" ;
		echo " ems_id : " . $current_ems_id  . "<br>" ;
		echo " aodf_repository_ip : " . $aodf_repository_ip . "<br>" ;
		echo " robotic_module_serial_number : " .  $robotic_module_serial_number  . "<br>" ;
		echo " optical_module_serial_number : " .  $optical_module_serial_number  . "<br>" ;
	}
	
	?>
    <!-- /div>  id="content" -->
	<!-- /div>  id="main" -->



<div style='float:left;'>
	<style>
		.error {color: #FF0000;}
		.tr_spacer {height:16px;}
		div.current_info {background-color: #DEDEDE;}
	</style>

	<script type="text/javascript">
			$(document).ready(function(){
				$("#aodf_info").change(function(){
					operator_ctrl.sendload();
				});
			});
	</script>


	
<table width="100%" style="height: 100%;" cellpadding="10" cellspacing="0" border="0">
<tr>
<!-- ============ HEADER SECTION ============== -->
    <td colspan="2" style="height: 80px;">
	<?php 
	require_once 'sysinfo_display.php';
	?>
    </td>
</tr>
<tr>
<!-- ============ LEFT COLUMN (MENU) ============== -->
<td width="10%" valign="top">

</td>

<!-- ============ RIGHT COLUMN (CONTENT) ============== -->
<td width="90%" valign="top" >
	
	
	
	<form id="aodf_info_form" method="post" action="aodf_info_setting.php" >	
	<table>
		<thead>
			<th align="center" style="font-weight:bold; font-color:dark-gray">Parameter name</th>
			<th align="left" style="font-weight:bold; width:250px">Current value</th>
			<th align="left"  style="font-weight:bold; ">New value</th>
		</thead>
		<tr class="tr_spacer"> 	<br/></tr>

		<tr>
			<td><label style="WIDTH:300px;">Current AODF MAC address:</label> </td>
			<td><?php echo $current_mac;?> </td>
			<td> N.A.
			</td>
		</tr>

		<tr>
			<td><label>AODF IP Address :</label> </td>
			<td><?php echo $ipAddress;?></td>
			<td>
	<input type="text" name="new_aodf_ip_addr1" style="width:40px" maxlength="3" >.<input type="text" name="new_aodf_ip_addr2" style="width:40px" maxlength="3" >.<input type="text" name="new_aodf_ip_addr3" style="width:40px" maxlength="3" >.<input type="text" name="new_aodf_ip_addr4" style="width:40px" maxlength="3" >
		</td>
		</tr>
		
		
		<tr>
			<td><label>AODF netmask :</label> </td>
			<td><?php echo $current_netmask;?></td>
			<td>
	<input type="text" name="new_netmask_addr1" style="width:40px ; maxlength=3;">.<input type="text" name="new_netmask_addr2" style="width:40px" maxlength="3" >.<input type="text" name="new_netmask_addr3" style="width:40px" maxlength="3" >.<input type="text" name="new_netmask_addr4" style="width:40px" maxlength="3" >
			</td>
		</tr>
		
		
		<tr>
			<td><label>AODF gateway :</label> </td>
			<td><?php echo $current_gateway;?></td>
			<td>
	<input type="text" name="new_gateway_addr1" style="width:40px" maxlength="3" >.<input type="text" name="new_gateway_addr2" style="width:40px" maxlength="3" >.<input type="text" name="new_gateway_addr3" style="width:40px" maxlength="3" >.<input type="text" name="new_gateway_addr4" style="width:40px" maxlength="3" >
			</td>
		</tr>
		<tr class="tr_spacer"> 	<br/></tr>


		
		<tr>
			<td><hr></td>
			<td></td>
			<td></td>
		</tr>
		<tr>
			<td><label>AODF Time (UTC):</label> </td>
			<td><?php $timestamp= time(); echo gmdate("d-m-Y\ H:i:s\ ", $timestamp);?> </td>
			<td>
				  <div id="datetimepicker2" class="input-append date" style="position:relative; visibility:visible">
					<input data-format="dd-MM-yyyy hh:mm:ss" type="text" style="height:25px;" name="new_datetime" ></input>
				   <span class="add-on" style="height:25px;">
					  <i data-time-icon="icon-time" data-date-icon="icon-calendar" ></i>
					</span>
				  </div>
				<script type="text/javascript">
				 $(function() {
					 $('#datetimepicker2').datetimepicker({minDate: 1});
					 });
				</script>
			</td>        
		</tr>
		<tr class="tr_spacer"> 	<br/></tr>
		
		
		<tr>
			<td><hr></td>
			<td></td>
			<td type="text" style="font-size:14px; font-weight:normal; color:c0c0c0;" ></td>
		</tr>
		
		
		<tr>
			<td><label>HW Clock :</label> </td>
				<td><?php echo $cur_hwclock;?></td>
			<td>  </td>        
		</tr>
		<tr class="tr_spacer"> 	<br/></tr>
		
		
		<tr>
			<td><hr></td>
			<td></td>
			<td type="text" style="font-size:14px; font-weight:normal; color:c0c0c0;" >upto 50 chars. &nbsp;&nbsp;&nbsp; [a-zA-Z0-9_-.]</td>
		</tr>
		<tr>
			<td><label>AODF Name :</label> </td>        
			<td><?php echo $current_aodf_name;?></td>
			<td> <input type="text" name="new_aodf_name_field" style="width:300px" maxlength="50" > </td>
		</tr>
		<tr class="tr_spacer"> 	<br/></tr>


		<tr>
			<td><hr></td>
			<td></td>
			<td type="text" style="font-size:14px; font-weight:normal; color:c0c0c0;" >max. len. 20 char.</td>
		</tr>
		<tr>
			<td><label>customer ID :</label> </td>
			<td><?php echo $current_customer_id;?></td>
			<td> <input type="text" name="new_customer_id_field" style="width:200px" maxlength="20" > </td>
		</tr>
		<tr class="tr_spacer"> 	<br/></tr>


		<tr>
			<td><hr></td>
			<td></td>
			<td type="text" style="font-size:14px; font-weight:normal; color:c0c0c0;" >max. len. 20 char.</td>
		</tr>
		<tr>
			<td><label>EMS ID :</label> </td>
			<td><?php echo $current_ems_id;?></td>
			<td> <input type="text" name="new_ems_id_field" style="width:200px" maxlength="20" >  </td>
		</tr>
		<tr class="tr_spacer"> 	<br/></tr>

		<tr>
			<td><hr></td>
			<td></td>
			<td type="text" style="font-size:14px; font-weight:normal; color:c0c0c0;" ></td>
		</tr>
		<tr>
			<td><label>AODF repository IP address :</label> </td>
			<td><?php echo $aodf_repository_ip;?></td>
	<td>		
	<input type="text" name="new_aodf_repository_ip_field1" style="width:40px" maxlength="3" >.<input type="text" name="new_aodf_repository_ip_field2" style="width:40px" maxlength="3" >.<input type="text" name="new_aodf_repository_ip_field3" style="width:40px" maxlength="3" >.<input type="text" name="new_aodf_repository_ip_field4" style="width:40px" maxlength="3" >
	</td>
		</tr>
		<tr class="tr_spacer"> 	<br/></tr>

		
		<tr>
			<td><hr></td>
			<td></td>
			<td type="text" style="font-size:14px; font-weight:normal; color:c0c0c0;" >max. len. 20 char.</td>
		</tr>
		<tr>
			<td><label>Robotic Module Part-Number :</label> </td>
			<td><?php echo $robotic_module_part_number;?></td>
			<td> <input type="text" name="new_robotic_module_part_number_field" style="width:200px" maxlength="20" >  </td>
		</tr>
		<tr>
			<td><hr></td>
			<td></td>
			<td type="text" style="font-size:14px; font-weight:normal; color:c0c0c0;" >max. len. 20 char.</td>
		</tr>
		<tr>
			<td><label>Robotic Module Serial-Number :</label> </td>
			<td><?php echo $robotic_module_serial_number;?></td>
			<td> <input type="text" name="new_robotic_module_serial_number_field" style="width:200px" maxlength="20" >  </td>
		</tr>
		<tr class="tr_spacer"> 	<br/></tr>



		<tr>
			<td><hr></td>
			<td></td>
			<td type="text" style="font-size:14px; font-weight:normal; color:c0c0c0;" >max. len. 20 char.</td>
		</tr>
		<tr>
			<td><label>Optical Module Part-Number :</label> </td>
			<td><?php echo $optical_module_part_number;?></td>
			<td> <input type="text" name="new_optical_module_part_number_field" style="width:200px" maxlength="20" >  </td>
		</tr>
		<tr>
			<td><hr></td>
			<td></td>
			<td type="text" style="font-size:14px; font-weight:normal; color:c0c0c0;" >max. len. 20 char.</td>
		</tr>
		<tr>
			<td><label>Optical Module Serial-Number :</label> </td>
			<td><?php echo $optical_module_serial_number;?></td>
			<td> <input type="text" name="new_optical_module_serial_number_field" style="width:200px" maxlength="20" >  </td>
		</tr>
		<tr class="tr_spacer"> 	<br/></tr>
	</table>

	<table>
		<tr>
		<td><label>NTP-server IP address/es :</label> </td>
		</tr>
		<tr>
		<td class="current_info"><?php echo $ntp_server_ip_field;?></td>
		</tr>
		<tr>
		<td> <label>new NTP-server's IP address/es :</label> <input type="text" name="new_ntp_server_ip_field"  style="width:600px" maxlength="300" > </td>
		</tr>
		<tr class="tr_spacer"> 	<br/></tr>
	</table>
	
	
	<table>
		<tr>
			<td><hr></td>
			<td></td>
			<td type="text" style="font-size:14px; font-weight:normal; color:#c0c0c0;" >---</td>
		</tr>
		<tr class="tr_spacer">       </tr>
		<tr>
			<td>  </td>        		
			<td> <input type="submit" name="submit" value="Submit new config"> </td>
		</tr>
	</table>
	
	
	</form> <!-- id="aodf_info_form" -->

    <br/><br/>
    <br/><br/>
	<div>
	  
	  <?php
		#dbg_display_new_date_time( $new_hour , $new_min , $new_day , $new_month , $new_year);
		#dbg_display_new_mac( $new_mac_addr_valid , $new_ip_addr_valid );
		#dbg_display_new_aodf_config( $new_customer_id , $new_ems_id , $new_aodf_repository_ip  ,  $new_robotic_module_serial_number ,  $new_optical_module_serial_number );
	  ?>

	</div>
	
    <br/><br/>
	<table>
		<tr>
			<td> <label>AODF Support : </label> </td>
			<td> <?php echo "<a href='mailto:support@teliswitch.com?subject=Support AODF'> support@teliswitch.com </a>"; ?> </td>
		</tr>
		<tr>
			<td></td>
			<td>Copyright © TeliSwitch 2016</td>
		</tr>
	</table>
	</div>
	
</tr>
<!-- ============ FOOTER SECTION ============== -->
<tr>
	<td></td>
</tr>
</table>	

</body>
</html>
