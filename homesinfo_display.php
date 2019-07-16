<?php
require_once 'utils.php';
$db = new PDO('sqlite:AODF.db');
$result = $db->query("SELECT * FROM HOMES");
$homes=array();
while($home=$result->fetch(PDO::FETCH_ASSOC))
{
 $homes[]=$home;
}
if(count($homes) > 0)
{
 $records=$homes[0];
}
else
{ // No records in database, so use empty.
 $records["HOME_ID"]='';
 $records['HOME_PORT_NUMBER']= '';
 $records["HOME_NAME"]='';
 $records["CITY"]='';
 $records["COUNTRY"]='';
 $records["QUARTER"]='';
 $records["ZIP_CODE"]='';
 $records["STREET"]='';
 $records["STREET__"]='';
 $records["APARTMENT__"]='';
 $records["PHONE"]='';
 $records["ADMINISTRATOR_COMMENT"]='';
 $records["OPERATOR"]='';
 $records["STATUS"]='';
}
$wheels['0']="Not Set";
$result = $db->query("SELECT wheelid FROM wheel_info WHERE wheelstatus='Available'");
while($wheel=$result->fetch(PDO::FETCH_ASSOC))
{
 $wheels[$wheel['wheelid']]=$wheel['wheelid'];
}
$db=null;
$disabled=array();
foreach ($homes as $value)
{
    if($value['HOME_PORT_NUMBER']!=0 && !in_array($value['HOME_PORT_NUMBER'], $disabled))
        $disabled[$value['HOME_ID']]=$value['HOME_PORT_NUMBER'];
}
?>
<script type="text/javascript">
        $(document).ready(function(){
            $("#reelinfo_homeid").change(function(){
                homes_info.sendload();
            });
            $("#reelinfo_reelnum").change(function(){
                homes_info.sendloadwheel();
            });
            homes_info.sendloadwheel();
        });
</script>
<div style='float:left;'>
    <br/><br/>
    <form id="reelform" method="post" action="">
    <table border="1" cellpadding="1">
    <tr>
        <td style="WIDTH:200px;" >
            Select Home To Edit:
            <input type="hidden" name="functionname" value="" />
        </td>
        <td>
            <select id="reelinfo_homeid" name="reelinfo_homeid" style="WIDTH:200px;" >
              <?php if(count($homes) > 0) {
                foreach($homes as $key => $value){?>
                <option value="<?php echo $value["HOME_ID"];?>"
                <?php if($value["HOME_ID"]==$records["HOME_ID"]) echo 'selected="selected"';?> >
                <?php echo $value['HOME_ID']," ",$value['HOME_NAME'];?> </option>
                <?php }
              } else { // List can not be empty! ?>
                <option value="" ></option>
              <?php } ?>
            </select>
        </td>
    </tr>
</table>
<table>
    <tr>
        <td>
      <label style="WIDTH:300px;">Home Port Number:</label>
        </td>
        <td>
            <?php echo dropdown_keys("reelinfo_reelnum", $wheels,$records['HOME_PORT_NUMBER'],$disabled); ?>
        </td>
    </tr>
    <tr>
        <td>
      <label>Home name:</label>
        </td>
        <td>
            <input id="reelinfo_homename" name="reelinfo_homename" value="<?php echo $records["HOME_NAME"];?>" type="text" style="WIDTH:200px;"/>
        </td>
    </tr>
    <tr>
        <td>
      <label>City:</label>
        </td>
        <td>
            <input id="reelinfo_city" name="reelinfo_city" value="<?php echo $records["CITY"];?>" type="text" style="WIDTH:200px;"/>
        </td>
    </tr>
    <tr>
        <td>
      <label>Country:</label>
        </td>
        <td>
            <input id="reelinfo_coutry" name="reelinfo_country" value="<?php echo $records["COUNTRY"];?>" type="text" style="WIDTH:200px;"/>
        </td>
    </tr>
    <tr>
        <td>
      <label>Quarter Number:</label>
        </td>
        <td>
            <input id="reelinfo_quarter" name="reelinfo_quarter" value="<?php echo $records["QUARTER"];?>" type="text" style="WIDTH:200px;"/>
        </td>
    </tr>
    <tr>
        <td>
      <label>Zip Code:</label>
        </td>
        <td>
            <input id="reelinfo_zipcode" name="reelinfo_zipcode" value="<?php echo $records["ZIP_CODE"];?>" type="text" style="WIDTH:200px;"/>
        </td>
    </tr>
    <tr>
        <td>
      <label>street:</label>
        </td>
        <td>
            <input id="reelinfo_street" name="reelinfo_street" value="<?php echo $records["STREET"];?>" type="text" style="WIDTH:200px;"/>
        </td>
    </tr>
    <tr>
        <td>
      <label>street Number:</label>
        </td>
        <td>
            <input id="reelinfo_streetnum" name="reelinfo_streetnum" value="<?php echo $records["STREET__"];?>" type="text" style="WIDTH:200px;"/>
        </td>
    </tr>
    <tr>
        <td>
      <label>Appartment Number:</label>
        </td>
        <td>
            <input id="reelinfo_apartmentnum" name="reelinfo_apartmentnum" value="<?php echo $records["APARTMENT__"];?>" type="text" style="WIDTH:200px;"/>
        </td>
    </tr>
    <tr>
        <td>
      <label>Phone:</label>
        </td>
        <td>
            <input id="reelinfo_phone" name="reelinfo_phone" value="<?php echo $records["PHONE"];?>" type="text" style="WIDTH:200px;"/>
        </td>
    </tr>
    <tr>
        <td>
            <label>Administrator Comment:</label>
        </td>
        <td>
            <input id="reelinfo_adcmt" name="reelinfo_adcmt" value="<?php echo $records["ADMINISTRATOR_COMMENT"];?>" type="text" style="WIDTH:200px;"/>
        </td>
    </tr>
    <tr>
        <td>
            <label>Operator Comment:</label>
        </td>
        <td>
            <input id="reelinfo_opcmt" name="reelinfo_opcmt" value="<?php echo $records["OPERATOR"];?>" type="text" style="WIDTH:200px;"/>
        </td>
    </tr>
    <tr>
        <td>
            <label>Status:</label>
        </td>
        <td>
            <select name="reelinfo_status" id="coninfo_status">
                <option value="Disconnected" <?php if($records["STATUS"]=="Disconnected")echo 'selected="selected"';;?> >Disconnected</option>
                <option value="Connected" <?php if($records["STATUS"]=="Connected")echo 'selected="selected"';;?> >Connected</option>
                <option value="Not Available" <?php if($records["STATUS"]=="Not Available")echo 'selected="selected"';;?> >Not Available</option>
            </select>
        </td>
    </tr>
</table>
</form>
         </div>
<div class='clearFloats' style="clear: both;"></div>
<div style='float:left;margin-left: 60px;'>
    <input id="reelinfo_save" name="reelinfo_save" type="button" value="Save" style="WIDTH:200px;HEIGHT:35px;" onclick="homes_info.sendsave();"/>
    <input id="reelinfo_insert" name="reelinfo_insert" type="button" value="Insert" style="WIDTH:200px;HEIGHT:35px;" onclick="homes_info.sendinsert();"/>
    <input id="reelinfo_delete" name="reelinfo_delete" type="button" value="Delete" style="WIDTH:200px;HEIGHT:35px;" onclick="homes_info.senddelete();"/>
</div>
