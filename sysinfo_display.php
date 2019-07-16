<?php
$systemname = shell_exec("hostname");
$systemip = shell_exec("/sbin/ifconfig eth0 | grep 'inet addr:' | awk -F':' '{print $2}' | awk '{print $1}'");
?>
</head>
<body height="100%">
<div id="header">
    <div id="logo">
        <img src="/images/logo-opacity.gif" alt="" />
    </div>
    <div id="sysinfo">
        <div style='padding:10px;text-align:left;width:250px;display:block;border: 1px dashed black;'>
            System Name: <?php echo $systemname;?><br/>
            IP Address: <?php echo $systemip;?><br/>
        </div>
    </div>
</div>
