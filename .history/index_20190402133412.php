<?php
error_reporting(E_ALL);
ini_set("display_errors", '1');
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">

<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<link href="react-dashboard/build/static/css/main.cfde9a6f.chunk.css" rel="stylesheet">

<script type="text/javascript" src="/js/jquery.min.js"></script>
<script type="text/javascript" src="aodf.js"></script>
<link rel="stylesheet" type="text/css" href="aodf.css" />
<script type="text/javascript">
      function doneReset(obj)
      {
        alert('Reset is done');
      }
      function confirmAction(msg,param) {
        if(confirm(msg))
                 // runner.runsimple(param);
                 runner.rungetoutputcallback(param, doneReset);
      }
</script>
<title>AODF Main Page</title>
<style type="text/css">
    td
    {
        text-align: center;
    }
</style>
<?php require_once 'sysinfo_display.php';?>
    <div id="main">
        <div id="mainmenu">
            <input id="test"   name="reset_ms" type="button" value="TEST" onclick="window.location.href='index.php?param=test'"/>
            <br/>
            <input id="reset_ms" <?php if(isset($_GET["param"])&&($_GET["param"]=="resetMS"))echo 'class="selectedtab"';?> name="reset_ms" type="button" value="Reset Motors" onclick="window.location.href='index.php?param=resetMS'"/>
            <br/>
            <input id="temperature" <?php if(isset($_GET["param"])&&($_GET["param"]=="temperature"))echo 'class="selectedtab"';?> name="temperature" type="button" value="Temperature Sensor" onclick="window.location.href='index.php?param=temperature'"/>
            <br/>
            <input id="i_o" <?php if(isset($_GET["param"])&&($_GET["param"]=="IO"))echo 'class="selectedtab"';?> name="i_o" type="button" value="I/O" onclick="window.location.href='index.php?param=IO'"/>
            <br/>
            <input id="Set_Functions" <?php if(isset($_GET["param"])&&($_GET["param"]=="Functions"))echo 'class="selectedtab"';?> name="Set_Functions" type="button" value="Set Functions" onclick="window.location.href='index.php?param=Functions'"/>
            <br/>
            <input id="Camera" <?php if(isset($_GET["param"])&&($_GET["param"]=="Camera"))echo 'class="selectedtab"';?> name="Camera" type="button" value="Camera" onclick="window.location.href='index.php?param=Camera'"/>
            <br/>
            <input id="aodfdblink" name="aodfdblink" type="button" value="AODF Database" onclick="window.location.href='/info.php'"/>
        </div>
        <div id="content">
<?php
if(isset($_GET["param"])&&!empty ($_GET["param"]))
switch ($_GET["param"]){
   case 'test':
?>

   <div style='float:left;'>
   <div id="root"></div><script>!function(l){function e(e){for(var r,t,n=e[0],o=e[1],u=e[2],f=0,i=[];f<n.length;f++)t=n[f],p[t]&&i.push(p[t][0]),p[t]=0;for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(l[r]=o[r]);for(s&&s(e);i.length;)i.shift()();return c.push.apply(c,u||[]),a()}function a(){for(var e,r=0;r<c.length;r++){for(var t=c[r],n=!0,o=1;o<t.length;o++){var u=t[o];0!==p[u]&&(n=!1)}n&&(c.splice(r--,1),e=f(f.s=t[0]))}return e}var t={},p={1:0},c=[];function f(e){if(t[e])return t[e].exports;var r=t[e]={i:e,l:!1,exports:{}};return l[e].call(r.exports,r,r.exports,f),r.l=!0,r.exports}f.m=l,f.c=t,f.d=function(e,r,t){f.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t})},f.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},f.t=function(r,e){if(1&e&&(r=f(r)),8&e)return r;if(4&e&&"object"==typeof r&&r&&r.__esModule)return r;var t=Object.create(null);if(f.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:r}),2&e&&"string"!=typeof r)for(var n in r)f.d(t,n,function(e){return r[e]}.bind(null,n));return t},f.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return f.d(r,"a",r),r},f.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},f.p="/";var r=window.webpackJsonp=window.webpackJsonp||[],n=r.push.bind(r);r.push=e,r=r.slice();for(var o=0;o<r.length;o++)e(r[o]);var s=n;a()}([])</script><script src="react-dashboard/build/static/js/2.96dfd52e.chunk.js"></script>   </div>
    </div>
<?php
      break;   
   case "resetMS":
?>
      <div style='float:left;'>
      <br/>
      <br/>
      <input id="reset_ms1" name="reset_ms1" type="button" value="Reset Elevator Motor" style="WIDTH:200px;HEIGHT:35px;" onclick="confirmAction('Do you want to reset the Elevator motor?','elev_reset')"/>
      <br/>
      <input id="reset_ms3" name="reset_ms3" type="button" value="Reset Plate Rotate Motor" style="WIDTH:200px;HEIGHT:35px;" onclick="confirmAction('Do you want to reset the Rotate motor?','plt_reset')"/>
      <br/>
      <input id="reset_ms4" name="reset_ms4" type="button" value="Reset Plate In/Out Motor" style="WIDTH:200px;HEIGHT:35px;" onclick="confirmAction('Do you want to reset the Plate In/Out motor?','plt_io_reset')"/>
      <br/>
      <input id="reset_ms5" name="reset_ms5" type="button" value="Reset Gripper Open/Close Motor" style="WIDTH:200px;HEIGHT:35px;" onclick="confirmAction('Do you want to reset the Gripper Open/Close motor?','grp_oc_reset')"/>
      <br/>
      <input id="reset_ms6" name="reset_ms6" type="button" value="Reset Gripper In/Out Motor" style="WIDTH:200px;HEIGHT:35px;" onclick="confirmAction('Do you want to reset the Gripper In/Out motor?','grp_io_reset')"/>
      <br/>
      <input id="reset_ms_all" name="reset_ms_all" type="button" value="Reset all Motors" style="WIDTH:200px;HEIGHT:35px;" onclick="confirmAction('Do you want to reset all motors?','reset_mot')"/>
         </div>
      <?php
      break;
   case "temperature":
      require 'temperature_display.php';
      break;
   case "IO":
      require_once 'microswitch_display.php';
      break;
   case "Functions":
      require_once 'functions_display.php';
      break;
   case "Camera":
      echo "<br/>";
      require 'camera_display.php';
      break;
   case "capture":
      echo "<br/>";
      require 'camera_display.php';
      break;
   case "cameramovetorel":
      echo "<br/>";
      require 'camera_display.php';
      break;
   case "cameramotor":
      echo "<br/>";
      require 'camera_display.php';
      break;
   case "cameravalue":
      echo "<br/>";
      require 'camera_display.php';
      break;
   case "cameraexe":
      echo "<br/>";
      require 'camera_display.php';
      break;
}
?>
</div>
</div>
</body>
</html>
