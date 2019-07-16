<?php
function dropdown($_id, $_elements, $_selected="")
{
    $result="<select id=\"{$_id}\" name=\"{$_id}\">";
    $option="<option value=\"%s\">%s</option>";
    $selectedoption="<option value=\"%s\" selected=\"selected\" >%s</option>";
    if(count($_elements) > 0)
    {
      foreach ($_elements as $value)
      {
          if(!empty ($_selected) && $value==$_selected)
          {
              $result.=sprintf($selectedoption,$value,$value);
          }
          else
          {
              $result.=sprintf($option,$value,$value);
          }
      }
    }
    else
    { // In case of empty list put empty option!
      $result.=sprintf($option,'','');
    }
    $result.="</select>";
    return $result;
}
function dropdown_keys($_id, $_elements, $_selected="",$disabled=array())
{
    $result="<select id=\"{$_id}\" name=\"{$_id}\">";
    $option="<option value=\"%s\">%s</option>";
    $optiondisabled="<option value=\"%s\" disabled=\"disabled\">%s</option>";
    $selectedoption="<option value=\"%s\" selected=\"selected\">%s</option>";
    $selectedoptiondisabled="<option value=\"%s\" selected=\"selected\" disabled=\"disabled\">%s</option>";
    $flag=(count($disabled)>0)?TRUE:FALSE;
    foreach($_elements as $keys=>$value)
    {
        if(!empty ($_selected) && $keys==$_selected)
        {
            if($flag && in_array($value, $disabled))
                $result.=sprintf($selectedoptiondisabled,$keys,$value);
            else
                $result.=sprintf($selectedoption,$keys,$value);
        }
        else
        {
            if($flag && in_array($value, $disabled))
                $result.=sprintf($optiondisabled,$keys,$value);
            else
                $result.=sprintf($option,$keys,$value);
        }
    }

    $result.="</select>";
    return $result;
}
function td($_str)
{
    return '<td>'.$_str."</td>\n";
}

function get_data()
{
  $db = new PDO('sqlite:AODF.db');
   $result = $db->query('SELECT PLATE_NUMBER, PLATE_TYPE FROM PLATE_INFO where PLATE_NUMBER != 0 ');
   $plates=array();

   $parking =array();
   $c = 0;
   while($plate=$result->fetch(PDO::FETCH_ASSOC))
   {
       if($plate['PLATE_TYPE'] == 'Regular')
       {
          $plate_number = $plate['PLATE_NUMBER'];
          $read2 = $db->query("select homeportnum, portnum, status, opcomment from platesports_info where plateid = $plate_number and status !='Not Available' ");
          $have_port = 0;
          while($port = $read2->fetch(PDO::FETCH_ASSOC))
          {

            if($port['status'] != 'Not Available'){
              $plates[$c]["plate_id"] = $plate_number;
              $plates[$c]["port"] = $port["portnum"];
              $plates[$c]["opcomment"] = $port["opcomment"];
              $plates[$c]["status"] = $port["status"];
              $plates[$c]["currentWheel"] = $port["homeportnum"];
              $c+=1;

            }

          }
       }else if($plate['PLATE_TYPE'] == 'Parking')
       {
          $parking[$c]["id"] = $plate['PLATE_NUMBER'];
          $plate_number = $plate['PLATE_NUMBER'];
          $read2 = $db->query("select homeportnum, portnum, status, opcomment from platesports_info where plateid = $plate_number");
          while($port = $read2->fetch(PDO::FETCH_ASSOC))
          {
            $parking[$c]["opcomment"] = $port['opcomment'];
          }



       }
       $c+=1;
    }
    $result = $db->query("SELECT * FROM wheel_info where wheelstatus != 'Not Available';");
    $reels=array();
    while($reel=$result->fetch(PDO::FETCH_ASSOC))
    {
     $reels[]=$reel;
    }
    return array($plates, $reels, $parking);
}
function getplateports()
{
   $db = new PDO('sqlite:AODF.db');
   // get plates
   $result = $db->query('SELECT PLATE_NUMBER, PLATE_TYPE FROM PLATE_INFO');
   $plates=array();
   while($plate=$result->fetch(PDO::FETCH_ASSOC))
   {
       if($plate['PLATE_TYPE'] == 'Regular')
       {
          $plate_number = $plate['PLATE_NUMBER'];
          $read2 = $db->query("select homeportnum, portnum, status from platesports_info where plateid = $plate_number");
          $have_port = 0;
          while($port = $read2->fetch(PDO::FETCH_ASSOC))
          {
            if($port['status'] == 'Available' && $port['homeportnum'] == 0)
              $have_port = 1;
          }
          if($have_port == 1)
          {
            $read3 = $db->query("select homeportnum, portnum, status from platesports_info where plateid = $plate_number");
            $plates[$plate_number] = array();
            while($port = $read3->fetch(PDO::FETCH_ASSOC))
            {
              if($port['status'] == 'Available' && $port['homeportnum'] == 0)
                $plates[$plate_number][$port['portnum']] = true;
            }
          }
       }
   }
   $platekeys=array_keys($plates);
   $platesvalues=array_combine($platekeys, $platekeys);
   // end get plates
   $result = $db->query("SELECT * FROM wheel_info;");
   $reels=array();
   while($reel=$result->fetch(PDO::FETCH_ASSOC))
   {
    $reels[]=$reel;
   }
   $db = null;
   $reel_num=count($reels);
   $records=$reels[0];
   return array($plates, $reels, $platesvalues);
}
?>
