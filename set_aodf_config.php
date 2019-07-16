<?php
/**
 * Created by PhpStorm.
  * User: ori
   * Date: 25/01/16
    * Time: 16:32
     */
     $aodf_config = file_get_contents('php://input');
     file_put_contents('./aodf_config.json',$aodf_config);
     echo 'SUCCESS';
