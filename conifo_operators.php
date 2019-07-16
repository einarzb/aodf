<?php
ini_set("display_errors", 1);
require_once 'utils.php';
list($plates, $reels) = getplateports();
$records=$reels[0];
$db = new PDO('sqlite:AODF.db');
$result = $db->query("SELECT * FROM OPERATORS;");
$operators=null;
$operators[0] = 'Parking';
$index = 1;
while($operator=$result->fetch(PDO::FETCH_ASSOC))
{
 $operators[$index++]=$operator['NAME'];
}
$db=null;
?>
<script type="text/javascript">
        $(document).ready(function()
        {
            $("#conoper_reelnum").change(function(){
                con_oper.fill_status();
            });
            con_oper.fill_status();
        });
</script>
<div id="conoperdisp" style='float:left;'>
<br/>
<br/>
<form id="conoperform" method="post" action="">
<table>
    <tr>
        <td>
            Home Port Number
            <input type="hidden" name="functionname" value="" />
        </td>
        <td>
             <select id="conoper_reelnum" name="conoper_reelnum" style="WIDTH:200px;" >
                <?php foreach($reels as $key => $value){?>
                <option value="<?php echo $value["wheelid"];?>"
                    <?php if($value["wheelid"]==$records["wheelid"]) echo 'selected="selected"';?> >
                    <?php echo $value["wheelid"];?> </option>
                <?php }?>
            </select>
        </td>
    </tr>
    <tr>
        <td>
           <label>Current Operator </label>
        </td>
        <td id="conoper_status">
        </td>
    </tr>
    <tr>
        <td>
            <label>Operator</label>
        </td>
        <td>
            <?php echo dropdown("conoper_operator", $operators); ?>
        </td>
    </tr>
</table>
</form>
</div>
<div style='float:left;'>
        <br/><br/><br/>
        <input id="conoper_connect" name="update" type="button" value="CONNECT" style="WIDTH:100px;HEIGHT:35px;" onclick="con_oper.sendconnect();"/>
</div>
