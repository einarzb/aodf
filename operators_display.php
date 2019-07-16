<?php
error_reporting(E_ALL);
ini_set("display_errors", '1');
$db = new PDO('sqlite:AODF.db');
$result = $db->query("SELECT * FROM OPERATORS;");
$reels=null;
while($reel=$result->fetch(PDO::FETCH_ASSOC))
{
 $reels[]=$reel;
}
$db=null;
$opsnum_num=count($reels);
$records=$reels[0];

if($records!=NULL)
{
?>
<script type="text/javascript">
        $(document).ready(function(){
            $("#selected_operator").change(function(){
                operator_ctrl.sendload();
            });
        });
</script>

<div style='float:left;'>
    <br/><br/>
    <form id="operatorsform" method="post" action="" >
    <table border="1" cellpadding="1">
    <tr>
        <td style="WIDTH:250px;" >
      Select Operator To Edit:
        </td>
        <td>
             <select id="selected_operator" name="selected_operator" style="WIDTH:200px;" >
                <?php foreach($reels as $key => $value){?> <option value="<?php echo $value["NAME"];?>" <?php if($value["NAME"]==$records["NAME"]) echo 'selected="selected"';?> > <?php echo $value["NAME"];?> </option>
                <?php }?>
            </select>
        </td>
    </tr>
</table>

<table><tr><td>
<input type="hidden" name="functionname" value="" />
Name
</td><td>
<input id="OPNAME" name="NAME" value="<?php echo $records['NAME']?>" />
</td></tr><tr><td>
Description
</td><td>
<input id="DESCRIPTION" name="DESCRIPTION" value="<?php echo $records['DESCRIPTION']?>" />
</td></tr><tr><td>
Comment
</td><td>
<input id="COMMENT" name="COMMENT" value="<?php echo $records['COMMENT']?>" />
</td></tr><tr><td>
Current Allocated Ports
</td><td>
<input id="CURRENT_PORTS" name="CURRENT_PORTS" readonly="readonly" value="<?php echo $records['CURRENT_PORTS']?>" />
</td></tr><tr><td>
</td></tr></table></form>
         </div>
<div class='clearFloats' style="clear: both;"></div>
<div style='float:left;margin-left: 60px;'>
<input id="reelinfo_save" name="reelinfo_save" type="button" value="Save" style="WIDTH:200px;HEIGHT:35px;" onclick="operator_ctrl.sendsave();"/>
<input id="reelinfo_insert" name="reelinfo_insert" type="button" value="Insert" style="WIDTH:200px;HEIGHT:35px;" onclick="operator_ctrl.sendinsert();"/>
<input id="reelinfo_delete" name="reelinfo_delete" type="button" value="Delete" style="WIDTH:200px;HEIGHT:35px;" onclick="operator_ctrl.senddelete();"/>
</div>
<?php }
else
{
    echo "no records found!";
}
?>
