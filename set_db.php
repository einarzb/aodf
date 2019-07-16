<?php
/**
 * Created by PhpStorm.
 * User: ori
 * Date: 25/01/16
 * Time: 16:32
 */
$db = file_get_contents('php://input');
file_put_contents('./AODF.db',$db);
echo 'SUCCESS';