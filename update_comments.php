<?php
error_reporting(E_ALL);
ini_set("display_errors", '1');
$db = new PDO('sqlite:AODF.db');
require_once 'utils.php';

$postdata = file_get_contents("php://input");
$data = json_decode($postdata,true);
$all_result = true;
foreach ($data['plates'] as $plate_data) {
    if( !save_plate($db,$plate_data) ){
        $all_result = false;
    }
}

foreach ($data['reels'] as $reel_data) {
    if( !save_reel($db,$reel_data) ){
        $all_result = false;
    }
}

echo json_encode(array('status' => $all_result ? 'ok' : 'Update Failed'));

function save_plate($db,$plate_data){
    $plate = $plate_data['number'];
    $all_result = true;
    $sql="SELECT PORTS_NUMBER FROM PLATE_INFO WHERE PLATE_NUMBER=$plate";
    $result = $db->query($sql);
    $ports_number = 0;
    if($result)
    {
        $rec1=$result->fetch(PDO::FETCH_ASSOC);
        $ports_number = $rec1["PORTS_NUMBER"];
    }
    foreach ($plate_data['ports'] as $port) {
        $sql="update 'platesports_info' set opcomment='{$port['opcomment']}', adcomment='{$port['adcomment']}' where plateid=$plate and portnum={$port['number']}";
        $result = $db->query($sql);
        if($result == false)
            $all_result = false;
    }
    return $all_result && $ports_number > 0;
}

function save_reel($db,$reel_data){
    $sql="UPDATE wheel_info SET administrator_comment='{$reel_data['adcomment']}',operator_comment='{$reel_data['opcomment']}' WHERE wheelid={$reel_data["number"]}";
    $result = $db->query($sql);
    return $result!=false;
}