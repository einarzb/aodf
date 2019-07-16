<?php
error_reporting(E_ALL);
ini_set("display_errors", '1');
$systemname = shell_exec("hostname");
if(empty($_GET["param"])){
  header( 'Location:/switch.php' ) ;

}

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">

<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<script type="text/javascript" src="/js/jquery.min.js"></script>
<script type="text/javascript" src="aodf.js"></script>
<link rel="stylesheet" type="text/css" href="aodf.css" />
<title>AODF <?php echo $systemname;?></title>
<style type="text/css">
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
<?php
require_once 'sysinfo_display.php';


?>
  <div id="main" >
        <div id="mainmenu" >
          <br/>
          <br/>

          <button id="conn_info" <?php if((isset($_GET["param"]) && $_GET["param"]=="conn_info") || empty($_GET["param"]))echo 'class="selectedtab"';?> name="conn_info" type="button" style="WIDTH:200px;HEIGHT:35px;" onclick="window.location.href='switch.php'"><!--<b>Teli --><b style="color:#FF6600">S</b>witch</b></button>
          <br/>
          <input id="aodf_info" <?php if(isset($_GET["param"])&&($_GET["param"]=="aodf_info"))echo 'class="selectedtab"';?> name="aodf_info" type="button" value="AODF info" style="WIDTH:200px;HEIGHT:35px;" onclick="window.location.href='info.php?param=aodf_info'"/>
          <br/>
          <input id="operators_info" <?php if(isset($_GET["param"])&&($_GET["param"]=="operators_info"))echo 'class="selectedtab"';?> name="operators_info" type="button" value="Operators" style="WIDTH:200px;HEIGHT:35px;" onclick="window.location.href='info.php?param=operators_info'"/>
          <br/>
          <input id="plate_info" <?php if(isset($_GET["param"])&&($_GET["param"]=="plate_info"))echo 'class="selectedtab"';?> name="plate_info" type="button" value="Plates" style="WIDTH:200px;HEIGHT:35px;" onclick="window.location.href='info.php?param=plate_info'"/>
          <!--
          <br/>
          <input id="homes_info" <?php if(isset($_GET["param"])&&($_GET["param"]=="homes_info"))echo 'class="selectedtab"';?> name="homes_info" type="button" value="Homes" style="WIDTH:200px;HEIGHT:35px;" onclick="window.location.href='info.php?param=homes_info'"/>
          -->
          <br/>
          <input id="wheel_info" <?php if(isset($_GET["param"])&&($_GET["param"]=="wheel_info"))echo 'class="selectedtab"';?> name="wheel_info" type="button" value="Reels" style="WIDTH:200px;HEIGHT:35px;" onclick="window.location.href='info.php?param=wheel_info'"/>
          <br/>
          <input id="conn_list" name="conn_list" type="button" value="Connections Report" style="WIDTH:200px;HEIGHT:35px;" onclick="info_page.connlist()"/>
          <!--
          <br/>
          <input id="conn_oper" <?php if(isset($_GET["param"])&&($_GET["param"]=="conn_oper"))echo 'class="selectedtab"';?> name="conn_oper" type="button" value="Connect to operator" style="WIDTH:200px;HEIGHT:35px;" onclick="window.location.href='info.php?param=conn_oper'"/>
          -->
          <br/>
          <input id="log_file" name="log_file" type="button" value="Activity Report" style="WIDTH:200px;HEIGHT:35px;" onclick="info_page.getlog()"/>
        </div>
    <div id="content" >
      <?php
      if(isset($_GET["param"])&&!empty ($_GET["param"]))
      switch ($_GET["param"])
      {
         case "aodf_info":
             require 'aodfinfo_display.php';
             break;
         case "homes_info":
             require 'homesinfo_display.php';
             break;
         case "plate_info":
             require 'plateinfo_display.php';
             break;
         case "operators_info":
             require 'operators_display.php';
             break;
         case "conn_info":
             require 'conifo_display.php';
             break;
         case "conn_oper":
             require 'conifo_operators.php';
             break;
         case "wheel_info":
             require 'wheelinfo_display.php';
             break;
      }
      else
        require 'conifo_display.php';
      ?>
    </div>
  </div>
</body>
</html>
