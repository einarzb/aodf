<?php
error_reporting(E_ALL);
ini_set("display_errors", '1');
function runner($command)
{
    $filename = "/scripts/$command";
    if(file_exists($filename))
    {
        if(isset ($_GET["arguments"]))
        {
            $filename.=" ".stripslashes($_GET["arguments"]);
        }
        $cmd = exec($filename,$retval);
        print(implode("\n", $retval));
        return;
    }
    echo '{status:"error"}';
    return;
}

if(isset($_GET["command"])&&!empty ($_GET["command"]))
{
    runner($_GET["command"]);
}
?>
