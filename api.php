<?php
error_reporting(E_ALL);
ini_set("display_errors", '1');
$db = new PDO('sqlite:AODF.db');
require_once 'utils.php';
require_once 'aodf_settings.php';
require_once 'passcode.php';
function input($_id, $_default="")
{
    $result="<input id=\"{$_id}\" name=\"{$_id}\" value=\"$_default\" />";
    return $result;
}
$post_data = json_decode(file_get_contents('php://input'), true);
// print_r($data);
// die();
if(isset($post_data["method"])&&!empty ($post_data["method"])){
    // ec(json_encode($_POST["method"]));
    switch( $post_data["method"]){
        case 'change_settings':
            die(json_encode(change_settings($post_data['settings'])));
        case 'set_date':
            die(json_encode(set_machine_date($post_data['date'])));
        case 'get_date':
            
            die(
                json_encode(array(
                    "date" =>get_machine_date())));
        case 'verification_pin':
            die(json_encode(array(
                'code'=>get_passcode()
            )));      
        case 'dump_log':
            dump_log();
            sleep(3);
            return "{result:\"OK\"}";      
        case 'plate_restart':
                die(json_encode(plate_restart()));          
                break;     
        default:    
            break;
    }
    // $this-
}

if(isset($_GET["functionname"])&&!empty ($_GET["functionname"]))
{
    switch ($_GET["functionname"])
    {
        case 'zivtest':
            echo shell_exec("usr/bin/bash -c /root/run_root_settings 1 ecalla");
            die('after'); 
            break;
    // ~~~~~~~~~~~~~~~
    // Homes screen
    // ~~~~~~~~~~~~~~~
       case "reelload":
           $sql="SELECT * FROM HOMES WHERE HOME_ID={$_GET["reelinfo_homeid"]}";
           $result = $db->query($sql);
           if($result!=false)
           {
               $records=$result->fetch(PDO::FETCH_ASSOC);
               $records["status"]="ok";
           }
           else
               $records["status"]="No records found";
           echo json_encode($records);
           break;
       case "reelsave":
           $sql="update HOMES set HOME_NAME='{$_GET["reelinfo_homename"]}', COUNTRY='{$_GET["reelinfo_country"]}',CITY='{$_GET["reelinfo_city"]}',ZIP_CODE='{$_GET["reelinfo_zipcode"]}',STREET='{$_GET["reelinfo_street"]}',STREET__='{$_GET["reelinfo_streetnum"]}',APARTMENT__='{$_GET["reelinfo_apartmentnum"]}',PHONE='{$_GET["reelinfo_phone"]}',OPERATOR_COMMENT='{$_GET["reelinfo_opcmt"]}',ADMINISTRATOR_COMMENT='{$_GET["reelinfo_adcmt"]}',HOME_PORT_NUMBER={$_GET["reelinfo_reelnum"]},QUARTER='{$_GET["reelinfo_quarter"]}' WHERE HOME_ID={$_GET["reelinfo_homeid"]}";
           $result = $db->query($sql);
           if($result!=false)
               $records["status"]="ok";
           else
               $records["status"]="Update Failed";
           echo json_encode($records);
           break;
       case "reelinsert":
            $sql="SELECT MAX(HOME_ID) as result FROM HOMES;";
            $result = $db->query($sql);
            $records=$result->fetch(PDO::FETCH_ASSOC);
            $new_home_id = $records["result"] + 1;
            $sql="INSERT INTO HOMES VALUES($new_home_id,'{$_GET["reelinfo_homename"]}','{$_GET["reelinfo_country"]}','{$_GET["reelinfo_city"]}','{$_GET["reelinfo_zipcode"]}','{$_GET["reelinfo_street"]}','{$_GET["reelinfo_streetnum"]}','{$_GET["reelinfo_apartmentnum"]}','{$_GET["reelinfo_phone"]}','','{$_GET["reelinfo_opcmt"]}','{$_GET["reelinfo_adcmt"]}','Disconnected','{$_GET["reelinfo_quarter"]}',0,0,0);";
            $result = $db->query($sql);
            if($result!=false)
               $records["status"]="ok";
            else
               $records["status"]="Insert Failed - Check Home ID";
            echo json_encode($records);
            break;
       case "reeldelete":
            $sql="DELETE FROM HOMES WHERE HOME_ID={$_GET["reelinfo_homeid"]}'";
            $result = $db->query($sql);
            if($result!=false)
            {
                $records=$result->fetch(PDO::FETCH_ASSOC);
                $records["status"]="ok";
            }
            else
                $records["status"]="Delete Failed";
            echo json_encode($records);
            break;
    // ~~~~~~~~~~~~~~~
    // Plateinfo screen
    // ~~~~~~~~~~~~~~~
       case "platesave":
           $all_result = true;
           $plate=$_GET["plateinfo_platenum"];
           $sql="SELECT PORTS_NUMBER FROM PLATE_INFO WHERE PLATE_NUMBER=$plate";
           $result = $db->query($sql);
           $ports_number = 0;
           if($result)
           {
               $rec1=$result->fetch(PDO::FETCH_ASSOC);
               $ports_number = $rec1["PORTS_NUMBER"];
           }
           for($index = 0; $index < $ports_number; $index++)
           {
               $plateport = $index + 1;
               $sql="update 'platesports_info' set opcomment='{$_GET["plateinfo_opcmt".$index]}', adcomment='{$_GET["plateinfo_adcmt".$index]}', status='{$_GET["plateinfo_status".$index]}', operator='{$_GET["plateinfo_operator".$index]}' where plateid=$plate and portnum=$plateport";
               $result = $db->query($sql);
               if($result == false)
                   $all_result = false;
           }
           if($all_result && $ports_number > 0)
               $records["status"]="ok";
           else
               $records["status"]="Update Failed";
           echo json_encode($records);
       break;
       case "plateload":
           $sql="SELECT * FROM 'PLATE_INFO' WHERE PLATE_NUMBER={$_GET["plateinfo_platenum"]} ";
           $result = $db->query($sql);
           if($result!=false)
           {
               $records=$result->fetch(PDO::FETCH_ASSOC);
               $records["status"]="ok";
           }
           else
               $records["status"]="Update Failed";
           echo json_encode($records);
           break;
       case "plategetportsform":
            if(isset($_GET["plateinfo_platenum"]))
            {
                $recordid=$_GET["plateinfo_platenum"];
                // select default ports of current record id
                $sql="SELECT * FROM 'PLATE_INFO' WHERE PLATE_NUMBER=$recordid";
                $result = $db->query($sql);
                if($result!=FALSE)
                {
                    $records=$result->fetch(PDO::FETCH_ASSOC);
                    $plateinfo_portsnum = $records["PORTS_NUMBER"];
                    $plate_type =  $records['PLATE_TYPE'];
                }
                else
                    return;
                // get operators list
                $result = $db->query("SELECT NAME FROM OPERATORS;");
                $operatorslist=null;
                $operatorslist[]="Not Assigned";
                while($operator=$result->fetch(PDO::FETCH_ASSOC))
                {
                    $operatorslist[]=$operator['NAME'];
                }
                //$statuslist=null;
                $statuslist[]="Available";
                $statuslist[]="Not Available";
                echo '<table style="margin:0;border: 1px solid gray;" border="1">';
                echo '<tr>';
                echo td("Port");
                echo td("Reel");
                if($plate_type == 'Regular')
                {
                    echo td("Operator");
                    echo td("Operator Comment");
                }
                echo td("Admin Comment");
                echo td("Physical Status");
                echo td("Counter");
                echo '</tr>';
                for ($index = 0; $index < $plateinfo_portsnum; $index++)
                {
                    $port_index = $index+1;
                    $sql = "select * from 'platesports_info' where plateid= $recordid and portnum = $port_index";
                    $result = $db->query($sql);
                    $port_info=$result->fetch(PDO::FETCH_ASSOC);
                    echo '<tr>';
                    echo td($port_index);
                    $sql="SELECT wheelid FROM 'wheel_info' WHERE plate_number=$recordid and plate_port_number=$port_index";
                    $result = $db->query($sql);
                    $records=$result->fetch(PDO::FETCH_ASSOC);
                    $wheelid = $records['wheelid'];
                    if($wheelid  > 0)
                        echo td("$wheelid");
                    else
                        echo td("None");
                    if($plate_type == 'Regular')
                    { // Parking plate does not have operator
                        echo td(dropdown('plateinfo_operator'.$index, $operatorslist,$port_info['operator']));
                        echo td(input('plateinfo_opcmt'.$index, $port_info['opcomment']));
                    }
                    echo td(input('plateinfo_adcmt'.$index, $port_info['adcomment']));
                    echo td(dropdown('plateinfo_status'.$index, $statuslist,$port_info['status']));
                    echo td($port_info['connections_counter']); // Counter
                    echo '</tr>';
                }
                echo '</table>';
                }
            break;
        // ~~~~~~~~~~~~~~~
        // Coninfo screen
        // ~~~~~~~~~~~~~~~
        case 'conoperhomeportstatus':
               $homeport = $_GET['conoper_reelnum'];
               $sql="SELECT * FROM wheel_info WHERE wheelid=$homeport";
               $result = $db->query($sql);
               if($result)
               {
                 $wheel_info=$result->fetch(PDO::FETCH_ASSOC);
                 $plate = $wheel_info['plate_number'];
                 $sql="SELECT PLATE_TYPE FROM PLATE_INFO WHERE PLATE_NUMBER=$plate";
                 $result = $db->query($sql);
                 if($result)
                 {
                   $plat_info=$result->fetch(PDO::FETCH_ASSOC);
                   if($plat_info['PLATE_TYPE'] == 'Parking')
                     $ret['stat'] = 'On parking';
                   else
                   {
                     $plate_port = $wheel_info['plate_port_number'];
                     $sql="SELECT operator FROM platesports_info WHERE plateid=$plate and portnum=$plate_port";
                     $result = $db->query($sql);
                     if($result)
                     {
                       $platport_info=$result->fetch(PDO::FETCH_ASSOC);
                       $ret['stat']=$platport_info['operator'];
                     }
                     else
                       $ret['stat']="Fail to find plate port";
                   }
                 }
                 else
                   $ret['stat']="Fail to find plate";
               }
               else
                 $ret['stat']="Fail to find home port";
               echo json_encode($ret);
        break;
        // ~~~~~~~~~~~~~~~
        // Reelinfo screen
        // ~~~~~~~~~~~~~~~
        case 'wheelload':
               $sql="SELECT * FROM wheel_info WHERE wheelid={$_GET["reelinfo_reelnum"]}";
               $result = $db->query($sql);

               if($result!=false)
               {
                   $records=$result->fetch(PDO::FETCH_ASSOC);
                   $records["status"]="ok";
               }
               else
               {
                   $records["status"]="Update Failed";
               }
               echo json_encode($records);
        break;
        case 'wheelsave':
            $sql="UPDATE wheel_info SET administrator_comment='{$_GET['reelinfo_adcmt']}',operator_comment='{$_GET['reelinfo_opcmt']}',wheelstatus='{$_GET['reelinfo_status']}' WHERE wheelid={$_GET["reelinfo_reelnum"]}";
            $result = $db->query($sql);
            if($result!=false)
            {
                $records["status"]="ok";
            }
            else
            {
                $records["status"]="Update Failed";
            }
            echo json_encode($records);
        break;
        // ~~~~~~~~~~~~~~~
        // Operatorsinfo screen
        // ~~~~~~~~~~~~~~~
        case "operatordelete":
               $sql="DELETE FROM 'OPERATORS' WHERE NAME='{$_GET["selected_operator"]}'";
               $result = $db->query($sql);
               if($result!=false)
               {
                   $records=$result->fetch(PDO::FETCH_ASSOC);
                   $records["status"]="ok";
               }
               else
                   $records["status"]="Delete Failed";
               echo json_encode($records);
        break;
        case 'operatorload':
               $sql="SELECT * FROM OPERATORS WHERE NAME='{$_GET["selected_operator"]}'";
               $result = $db->query($sql);

               if($result!=false)
               {
                   $records=$result->fetch(PDO::FETCH_ASSOC);
                   $records["status"]="ok";
               }
               else
               {
                   $records["status"]="Select Failed";
               }
               echo json_encode($records);
        break;
        case 'operatorsave':
            $sql="UPDATE OPERATORS SET DESCRIPTION='{$_GET['DESCRIPTION']}', COMMENT='{$_GET['COMMENT']}' WHERE NAME='{$_GET["selected_operator"]}'";
            $result = $db->query($sql);
            if($result!=false)
            {
                $records["status"]="ok";
            }
            else
            {
                $records["status"]="Update Failed";
            }
            echo json_encode($records);
            break;
        case 'operatorinsert':
            $sql="INSERT INTO OPERATORS VALUES('{$_GET["NAME"]}','{$_GET['DESCRIPTION']}','{$_GET['COMMENT']}',0,0,0);";
            $result = $db->query($sql);
            if($result!=false)
            {
                $records["name"] = $_GET["NAME"];
                $records["status"]="ok";
            }
            else
            {
                $records["status"]="Insert Failed";
            }
            echo json_encode($records);
            break;
        case 'get_settings':
            echo json_encode( array(
               "settings"=>get_settings(),
                "need_reboot"=>is_reboot_needed()
            ));
            break;
        case 'get_config_settings':
                echo json_encode( array(
                "config_settings"=>get_config_settings()
            ));
        break;
        case 'reboot':
            die(do_reboot());    
            break;
        case 'reel_calibration':
            die(get_reel_calibration());
            break;
        case 'set_reel_to_parking':
            die(set_reel_to_parking());  
            break;
        case 'plate_rot_in':
            die(plate_rot_in());     
            break;
        case 'plate_rot_out':
            die(plate_rot_out());  
            break;
        case 'gripper_in':
            die(gripper_in());
            break;
        case 'gripper_out':
            die(gripper_out());   
            break;
        case 'gripper_close':
            die(gripper_close());   
            break;
        case 'gripper_open':
            die(gripper_open());      
            break;
        case 'power_off':
            die(power_off());
            break;         
            // case 'change_settings':
            //     echo json_encode(get_settings());     
        default :
            echo '{"status":"error"}';
            break;
    
        }
}
$db = null;

/**
 * Supplementary json_encode in case php version is < 5.2 (taken from http://gr.php.net/json_encode)
 */
if (!function_exists('json_encode'))
{
    function json_encode($a=false)
    {
        if (is_null($a)) return 'null';
        if ($a === false) return 'false';
        if ($a === true) return 'true';
        if (is_scalar($a))
        {
            if (is_float($a))
            {
                // Always use "." for floats.
                return floatval(str_replace(",", ".", strval($a)));
            }

            if (is_string($a))
            {
                static $jsonReplaces = array(array("\\", "/", "\n", "\t", "\r", "\b", "\f", '"'), array('\\\\', '\\/', '\\n', '\\t', '\\r', '\\b', '\\f', '\"'));
                return '"' . str_replace($jsonReplaces[0], $jsonReplaces[1], $a) . '"';
            }
            else
            return $a;
        }
        $isList = true;
        for ($i = 0, reset($a); $i < count($a); $i++, next($a))
        {
            if (key($a) !== $i)
            {
                $isList = false;
                break;
            }
        }
        $result = array();
        if ($isList)
        {
            foreach ($a as $v) $result[] = json_encode($v);
            return '[' . join(',', $result) . ']';
        }
        else
        {
            foreach ($a as $k => $v) $result[] = json_encode($k).':'.json_encode($v);
            return '{' . join(',', $result) . '}';
        }
    }
}
?>
