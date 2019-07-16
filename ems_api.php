<?php
    require_once 'utils.php';
    $db = new PDO('sqlite:AODF.db');
    $result = $db->query('SELECT PLATE_NUMBER, PLATE_TYPE FROM PLATE_INFO where PLATE_NUMBER != 0 ');
    $plates=array();

    $parking =array();
    $c = 0; 
   while($plate=$result->fetch(PDO::FETCH_ASSOC))
   {     
       if($plate['PLATE_TYPE'] == 'Regular')
       {
          $plate_number = $plate['PLATE_NUMBER'];
          $read2 = $db->query("select homeportnum, portnum, status, opcomment from platesports_info where plateid = $plate_number and status !='Not Available' ");
          $have_port = 0;
          while($port = $read2->fetch(PDO::FETCH_ASSOC))
          {            
//            if($port['status'] != 'Not Available'){
              $plates[$c]["plate_id"] = $plate_number;  
              $plates[$c]["port"] = $port["portnum"];
              $plates[$c]["opcomment"] = $port["opcomment"];
              $plates[$c]["status"] = $port["status"];
              $plates[$c]["currentWheel"] = $port["homeportnum"];
              $c+=1;

//            }            

          }
       }else if($plate['PLATE_TYPE'] == 'Parking')
       {
          $parking[$c]["id"] = $plate['PLATE_NUMBER'];    
          $plate_number = $plate['PLATE_NUMBER'];
          $read2 = $db->query("select homeportnum, portnum, status, opcomment from platesports_info where plateid = $plate_number");
          while($port = $read2->fetch(PDO::FETCH_ASSOC))
          {
            $parking[$c]["opcomment"] = $port['opcomment'];            
          }



       }
       $c+=1;
    }  
    $result = $db->query("SELECT * FROM wheel_info order by wheelid ;");
    $reels=array();
    while($reel=$result->fetch(PDO::FETCH_ASSOC))
    {
     $reels[]=$reel;
    }     

    $result = $db->query("SELECT * FROM plate_info ;");
    $plates_info = array();
    while($plate_info=$result->fetch(PDO::FETCH_ASSOC))
    {
     $plates_info[]=$plate_info;
    }     

    $db = new PDO('sqlite:AODF.db');
    $result = $db->query('SELECT * FROM AODF');
    $records=$result->fetch(PDO::FETCH_ASSOC);
    $mac = shell_exec("/sbin/ifconfig eth0 | grep HWaddr | sed 's/.*HWaddr //'");
    $ver = shell_exec("cat /etc/teliswitch_version");
    $dver = shell_exec("cat /etc/debian_version");
    $krel = shell_exec("uname -s ; uname -r");
    $kver = shell_exec("uname -v");
    $cam = shell_exec("/scripts/run_root 1 | grep camera | sed 's/^camera - //'");
    $scripts = shell_exec("/scripts/run_root 1 | grep aodf-scripts | sed 's/^aodf-scripts - //'");
    $db=null;
    $mac = trim(preg_replace('/\s+/', ' ', $mac));
    $systemname = shell_exec("hostname");    
    $systemname = trim(preg_replace('/\s+/', ' ', $systemname));
    $data["reels"] = $reels;
    $data["platesPorts"] = $plates;
    $data["plates_info"] = $plates_info;
    $data["parking"] = $parking;
    $data["mac"] = $mac ; 
    $data["name"] = $systemname; 
    $data["customer_pretty_id"] = "694499689";
    echo json_encode($data);
?>