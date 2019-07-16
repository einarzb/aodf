<?php
$db = new PDO('sqlite:AODF.db');
$result = $db->query("select * from instructions left join types on types.instid=instructions.instid;");
while($instruction=$result->fetch(PDO::FETCH_ASSOC))
{
 $instructions_array[]=$instruction;
}
$db=null;
foreach ($instructions_array as $key=>$inst)
{
    $newKey=trim(preg_replace("/[^a-zA-Z0-9\s]/", "", $inst['instname']));
    $instructions_array[$newKey]['instname']=$newKey;
     $instructions_array[$newKey]['instvalue']=$inst['instvalue'];
    if(isset($inst['typename']['childs'] ))
    {
        $instructions_array[$newKey]['childs'][]['typename']=trim(preg_replace("/[^a-zA-Z0-9\s]/", "", $inst['typename']));
        $id=count($instructions_array[$newKey]['childs'])-1;
        $instructions_array[$newKey]['childs'][$id]['typevalue']=$inst['typevalue'];
    }
    unset($instructions_array[$key]);
}
?>
<script type="text/javascript">
    function filltypes()
    {
        $("#insttype").html('');
        <?php foreach ($instructions_array as $key => $value)
        {?>
        if($("#instructions").attr('value')==<?php echo $value["instvalue"]; ?>)
        {
           <?php if(isset ($value["childs"]))
                foreach ($value["childs"] as $portnumber)
           {?>
               appendOption("<?php echo $portnumber["typevalue"];?>",
                            "<?php echo $portnumber["typename"];?>", "#insttype");
           <?php } ?>
        }
        <?php } ?>
    }
    function fillinstructions()
    {
        <?php foreach ($instructions_array as $key => $value)
        {?>
        appendOption("<?php echo $value["instvalue"];?>", "<?php echo $value["instname"];?>", "#instructions");
        <?php } ?>
    }
    $(document).ready(function(){
        runner.rungetoutput('set_default', 'functionsoutput');
        $("#instructions").html(''); // Clear empty selection
        fillinstructions();
        filltypes();
        $("#instructions").change(function(){filltypes();});
    });
</script>
      <div style='float:left'>
      <br/>
      <br/>
                <table border="1" cellpadding="4">
    <tr>
        <td>
            Instruction
        </td>
        <td>
            Inst Type
        </td>
        <td>
             Motor Num
        </td>
        <td>
             Value
        </td>
        <td>
            &nbsp;
        </td>
    </tr>
    <tr>
        <td>
            <select id="instructions" name="instructions" style="">
            <option value="0" ></option>
            </select>
        </td>
        <td>
           <select id="insttype" name="insttype" style="" >
            <option value="0" ></option>
           </select>
        </td>

        <td>
              <select id="motorNum" name="motorNum">
                                    <option value="1" >Elevator</option>
                                    <option value="2" >Stage</option>
                                    <option value="3" >Plate Rotate</option>
                                    <option value="4" >Plate In/Out</option>
                                    <option value="5" >Gripper Open/Close</option>
                                    <option value="6" >Gripper In/Out</option>
                                </select>
        </td>
        <td>
            <input id="value" name="value" style="width:100px;" />
        </td>
        <td>
            <input id="Execute" name="Execute" type="button" value="Execute" style="width:100px;" onclick="instructions_manager.execute();"/>
        </td>
    </tr>
</table><br /><br /><br />
            Result:
            <table border="1" cellpadding="4">
                <tr>
                    <td>
                        Host:
                    </td>
                    <td>
                        Target:
                    </td>
                    <td>
                       Status:
                    </td>
                    <td>
                        Instr
                    </td>
                    <td>
                        Value
                    </td>
                    <td>
                        Diagram:
                    </td>
                </tr>
                <tr>
                    <td id="hostresult">
                        localhost
                    </td>
                    <td id="targetresult">
                    </td>
                    <td id="statusresult">
                    </td>
                    <td id="instrresult">
                    </td>
                    <td id="valueresult">
                    </td>
                    <td id="diagramresult">
                    </td>
                </tr>
            </table>
      <br/>
      <table>
          <tr>
              <td>
                  Output:
              </td>
              <td>
                  <textarea readonly="readonly" id="functionsoutput" style="width: 400px;" rows="4" cols="100"></textarea>
              </td>
          </tr>
      </table>
</div>
