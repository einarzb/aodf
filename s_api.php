<?php
    require_once 'utils.php';
    list($plates, $reels, $parking) = get_data();
    $records=$reels[0];
    $data = array();
    $data["wheels"] = $reels;
    $data["plates"] = $plates;
    $data["parking"] = $parking;
    echo json_encode($data);
?>
