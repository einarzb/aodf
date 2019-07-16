<?php
$db = new PDO('sqlite:AODF.db');

$result = $db->query("SELECT * FROM PLATE_INFO");
$plates=array();
while($plate=$result->fetch(PDO::FETCH_ASSOC))
{
 $plates[]=$plate;
}
$db=null;
if(count($plates) > 0)
    $records=$plates[0];
else
    $records=null;
?>
<script type="text/javascript">
        $(document).ready(function()
        {
            plateinfo_ctrl.sendgetportsform();
            $("#plateinfo_platenum").change(function(){
                plateinfo_ctrl.sendload();
            });
        });
</script>
<form id="plateform" method="post" action="">
<div style='float:left;'>
<input type="hidden" name="functionname" value=""/>
<br/>
<br/>
<table border="1" cellpadding="1" style="width:350px;">
    <tr>
        <td style="width:200px;" >
      Select Plate To Edit:
        </td>
        <td>
            <select id="plateinfo_platenum" name="plateinfo_platenum" style="width:150px;" >
                <?php foreach($plates as $key => $value){?> <option value="<?php echo $value["PLATE_NUMBER"];?>" <?php if($value["PLATE_NUMBER"]==$records["PLATE_NUMBER"]) echo 'selected="selected"';?> > <?php echo $value["PLATE_NUMBER"];?> </option>
                <?php }?>
            </select>
        </td>
    </tr>
</table>
<table>
    <tr>
        <td style="width:180px">
            <label>Postion of Plate:</label>
        </td>
        <td id="plateinfo_plateposition">
            <?php echo $records["PLATE_POSITION"];?>
        </td>
    </tr>
    <tr>
        <td>
            <label>Plate Height:</label>
        </td>
        <td id="plateinfo_plateheight">
            <?php echo $records["PLATE_HEIGHT"];?>
        </td>
    </tr>
    <tr>
        <td>
            <label>Plate Type:</label>
        </td>
        <td id="plateinfo_platetype">
            <?php echo $records["PLATE_TYPE"];?>
        </td>
    </tr>
</table>
<div id="portscontainer" style='float:left;margin-left: 60px;'></div>
</div>
</form>
<div class='clearFloats' style="clear: both;"></div>
<div style='float:left;margin-left: 60px;'>
    <input id="plateinfo_save" name="plateinfo_save" type="button" value="SAVE" style="WIDTH:200px;HEIGHT:35px;" onclick="plateinfo_ctrl.sendsave();"/>
</div>
