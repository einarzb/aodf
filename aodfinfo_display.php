<?php
$db = new PDO('sqlite:AODF.db');
$result = $db->query('SELECT * FROM AODF');
$records=$result->fetch(PDO::FETCH_ASSOC);
$db=null;
$mac = shell_exec("/sbin/ifconfig eth0 | grep HWaddr | sed 's/.*HWaddr //'");
$ver = shell_exec("cat /etc/teliswitch_version");
$dver = shell_exec("cat /etc/debian_version");
$krel = shell_exec("uname -s ; uname -r");
$kver = shell_exec("uname -v");
$cam = shell_exec("/scripts/run_root 1 | grep camera | sed 's/^camera - //'");
$scripts = shell_exec("/scripts/run_root 1 | grep aodf-scripts | sed 's/^aodf-scripts - //'");
?>
<div style='float:left;'>
<br/><br/>
<table>
    <tr>
        <td>
      <label style="WIDTH:300px;">MAC Address:</label>
        </td>
        <td>
            <?php echo $mac;?>
        </td>
    </tr>
    <tr>
        <td><label>Software version:</label></td>
        <td><?php echo $ver;?></td>
    </tr>
    <!--
    <tr>
        <td><label>Debian software version:</label></td>
        <td><?php echo $dver;?></td>
    </tr>
    <tr>
        <td><label>Kernel release:</label></td>
        <td><?php echo $krel;?></td>
    </tr>
    <tr>
        <td><label>Kernel version:</label></td>
        <td><?php echo $kver;?></td>
    </tr>
    <tr>
        <td><label>Camera version:</label></td>
        <td><?php echo $cam;?></td>
    </tr>
    <tr>
        <td><label>AODF scripts version:</label></td>
        <td><?php echo $scripts;?></td>
    </tr>
    -->
    <tr>
        <td>
      <label>Total Number of Reels:</label>
        </td>
        <td>
            <?php echo round($records['NO_OF_HOME_PORTS']);?>
        </td>
    </tr>
    <tr>
        <td>
      <label>Total Number of Plates:</label>
        </td>
        <td>
            <?php echo round($records['NO_OF_PLATES']);?>
        </td>
    </tr>
    <tr>
        <td>
      <label>Ports Per Plates:</label>
        </td>
        <td>
            <?php echo round($records['NO_OF_PORTS_PER_PLATE']);?>
        </td>
    </tr>
    <tr>
        <td>
      <label>AODF Time (UTC):</label>
        </td>
        <td>
           <?php
           $timestamp= time();
           echo gmdate("d-m-Y\ H:i:s\ ", $timestamp);?>
        </td>
    </tr>
    <tr>
       <td>
     <label>AODF Support:</label>
       </td>
       <td>
          <?php 
            echo "<a href='mailto:support@teliswitch.com?subject=Support AODF'>support@teliswitch.com</a>";?>
       </td>
    </tr>
</table>
</div>
