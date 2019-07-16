<?php
error_reporting(E_ALL);
ini_set("display_errors", '1');
require_once 'utils.php';
list($plates, $reels) = getplateports();
$records=$reels[0];
?>
<script type="text/javascript">
        function fillports()
        {
            $("#reelinfo_newplateportnum").html('');
            appendOption("0", 'Not Set', "#reelinfo_newplateportnum");
                 <?php foreach ($plates as $key => $value)
                 {?>
                 if($("#reelinfo_newplatenum").attr('value')==<?php echo $key; ?>)
                 {
                  <?php foreach ($value as $childkey => $childvalue)
                  {?>
                      appendOption("<?php echo $childkey;?>", '<?php echo $childkey;?>', "#reelinfo_newplateportnum");
                  <?php } ?>
                }
                <?php } ?>
        }
        $(document).ready(function(){
            $("#reelinfo_reelnum").change(function(){
                wheel_ctrl.sendload();
            });
            $("#reelinfo_newplatenum").change(function(){fillports();});
            wheel_ctrl.sendload();
        });
</script>
<div style='float:left;'>
      <br/><br/>
      <form id="reelform" method="post" action="">
      <table border="1" cellpadding="1">
      <tr>
        <td style="WIDTH:250px;" >
           Select Reel To Edit:
           <input type="hidden" name="functionname" value="" />
        </td>
        <td>
             <select id="reelinfo_reelnum" name="reelinfo_reelnum" style="WIDTH:200px;" >
                <?php foreach($reels as $key => $value){?>
                <option value="<?php echo $value["wheelid"];?>" <?php if($value["wheelid"]==$records["wheelid"]) echo 'selected="selected"';?> > <?php echo $value["wheelid"];?> </option>
                <?php }?>
            </select>
        </td>
    </tr>
</table>
<table>
    <tr>
        <td>
           <label>Reel Angle:</label>
        </td>
        <td id="reelinfo_reelangle">
            <?php echo $records['wheelangle'];?>
        </td>
    </tr>
    <tr>
        <td>
           <label>Parking Plate Number:</label>
        </td>
        <td id="parkingplatenum">
            <?php echo $records['parkingplatenum'];?>
        </td>
    </tr>
    <tr>
        <td>
           <label>Counter:</label>
        </td>
        <td id="connections_counter">
            <?php echo $records['connections_counter'];?>
        </td>
    </tr>
    <tr>
        <td>
            <label>Administrator Comment:</label>
        </td>
        <td>
            <input id="reelinfo_adcmt" name="reelinfo_adcmt" value="<?php echo $records["administrator_comment"];?>" type="text" style="WIDTH:200px;"/>
        </td>
    </tr>
    <tr>
        <td>
            <label>Operator Comment:</label>
        </td>
        <td>
            <input id="reelinfo_opcmt" name="reelinfo_opcmt" value="<?php echo $records["operator_comment"];?>" type="text" style="WIDTH:200px;"/>
        </td>
    </tr>
    <tr>
        <td>
            <label>Plate Number:</label>
        </td>
        <td id="currentplate">
            <?php echo $records['plate_number'];?>
        </td>
    </tr>
    <tr>
        <td>
            <label>Plate Port Number:</label>
        </td>
        <td id="currentport">
            <?php echo $records['plate_port_number'];?>
        </td>
    </tr>
    <tr>
        <td>
            <label>Physical Status:</label>
        </td>
        <td>
            <select name="reelinfo_status" id="reelinfo_status" style="WIDTH:200px;" >
                <option value="Available" <?php if($records["wheelstatus"]=="Available")echo 'selected="selected"';?> >Available</option>
                <option value="Not Available" <?php if($records["wheelstatus"]=="Not Available")echo 'selected="selected"';?> >Not Available</option>
                <option value="In Progress" <?php if($records["wheelstatus"]=="In Progress")echo 'selected="selected"';?> >In Progress</option>
                <option value="Planned Switch" <?php if($records["wheelstatus"]=="Planned Switch")echo 'selected="selected"';?> >Planned Switch</option>
            </select>
        </td>
    </tr>
</table>
</form>
         </div>
<div class='clearFloats' style="clear: both;"></div>
<div style='float:left;margin-left: 60px;'>
<input id="reelinfo_save" name="reelinfo_save" type="button" value="SAVE" style="WIDTH:200px;HEIGHT:35px;" onclick="wheel_ctrl.sendsave();"/>
</div>
<?php
?>
