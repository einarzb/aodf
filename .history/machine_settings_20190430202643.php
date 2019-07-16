<?php 
require_once 'utils.php';
$systemname = shell_exec("hostname");
$systemip = shell_exec("/sbin/ifconfig eth0 | grep 'inet addr:' | awk -F':' '{print $2}' | awk '{print $1}'");
list($plates, $reels, $platesvalues) = getplateports();
$records=$reels[0];

?>
<html>
    <head>       
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>AODF <?php echo $systemname;?></title>

        <!-- Bootstrap -->
        <link href="css/bootstrap.min.css" rel="stylesheet">
        <link href="css/bootstrap_new.css" rel="stylesheet">
        <link href="css/bootstrap-datetimepicker.min.css" rel="stylesheet">
 
        <style>
.twitter-typeahead{
margin-bottom:10px;    
}
.tt-dropdown-menu {
  position: absolute;
  top:100%;
  left: 0;
  display: none;
  float: left;
  min-width: 160px;
  padding: 5px 0;
  margin: 2px 0 0;
  list-style: none;
  font-size: 14px;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  background-clip: padding-box;
}
.tt-suggestion > p {
  display: block;
  padding: 3px 20px;
  clear: both;
  font-weight: normal;
  line-height: 1.428571429;
  color: #333333;
  white-space: nowrap;
}
.tt-suggestion > p:hover,
.tt-suggestion > p:focus,
.tt-suggestion.tt-cursor p {
  color: #ffffff;
  text-decoration: none;
  outline: 0;
  background-color: #428bca;
}


</style>
    </head>
        <body >
             <script src="js/jquery-2.1.1.min.js"></script>
            <script src="js/bootstrap.min.js"></script>
            <script src="js/typeahead.js"></script>
            <script src="js/date.js"></script>
            <script src="js/bootstrap-datetimepicker.min.js"></script>
            <script type="text/javascript" src="aodf.js"></script>
            <div  >
              <div class="row" style="z-index:1;width:95%">
                    <img src="/images/logo-opacity.gif" alt="" style="float:left;margin-left:20px" />
                <div id="sysinfo" style="float:right">
                    <div style='padding:10px;text-align:left;width:250px;display:block;border: 1px dashed black;'>
                        System Name: <?php echo $systemname;?><br/>
                        IP Address: <?php echo $systemip;?><br/>
                    </div>
                </div>            

              </div>
            </div>



    <ul class="nav nav-tabs" role="tablist">
      <li class="active"><a href="#">Switch</a></li>
      <li><a href="/info.php?param=aodf_info">AODF info</a></li>
      <li><a href="/info.php?param=operators_info">Operators</a></li>
      <li><a href="/info.php?param=plate_info">Plates</a></li>
      <li><a href="/info.php?param=wheel_info">Reels</a></li>
      <li><a onclick="info_page.connlist()" style="cursor:pointer">Connections Report</a></li>
      <li><a href="/connections_log.csv">Activity Report</a></li>
    </ul>
    <nav class="navbar navbar-default" role="navigation">
      <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
            <button type="submit" id="switch" class="btn btn-primary hidden" style="margin:10px;">Switch</button>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1" style="z-index:1;width:95%;height:30px;">

          <form class="navbar-form navbar-left" role="search">
            <div class="form-group" style="height:30px;">
                <span style="position:relative;top:-4px;">Sort:</span>            
                <select id="sortBy"  style="width:100px;background-color:#ffffff;height:30px;position:relative;top:0px;">
                  <option value="id">Number</option>
                  <option value="name">Comment</option>
                </select>            
                <span style="position:relative;top:-4px;"><!--Time:--></span>
  
                  <div id="datetimepicker1" class="input-append date" style="position:relative;top:-40px;left:180px;visibility:hidden">
                    <input data-format="dd/MM/yyyy hh:mm:ss" type="text" style="height:30px;" id="datetime"></input>
 
                   <span class="add-on" style="height:30px;">
 
                      <i data-time-icon="icon-time" data-date-icon="icon-calendar">
 
                      </i>
  
                    </span>
  
                  </div>
   
                <script type="text/javascript">
                 $(function() {
                    $('#datetimepicker1').datetimepicker({minDate: 1
                      
                    });
                  });
                </script>

            </div>

          </form>
        </div><!-- /.navbar-collapse -->
      </div><!-- /.container-fluid -->
    </nav>  
    <div class="row" style="z-index:1;width:95%;position:relative;top:-14px;">
        <div class="col-md-8 col-xs-8 col-sm-8 col-lg-8">
            
            <table class="table" style="border-bottom:2px solid #000000;height:30px;">
                <tr>
                    <td width="50%">                          
                            <select id="ew"  style="width:100px;background-color:#fff;height:30px;margin:0px">
                              <option value="reel">Reels</option>                    
                              <option value="plate">Plates</option>
                            </select>

                    </td>
                    <td width="50%"><b>Current</b></td>
                </tr>
            </table>    
        </div>
        <div class="col-md-4 col-xs-4 col-sm-4 col-lg-4" >
            <table class="table" style="border-bottom:2px solid #000000;height:49px">
                <tr>
                    <td><b>Target </b></td>
                </tr>
            </table>    
        </div>
    </div>        
    <div class="row" style="z-index:1;width:95%;position:relative;top:-30px">        
        <div class="col-md-8 col-xs-8 col-sm-8 col-lg-8">            
            <table>
                <tr>
                    <Td>
                        <span id="searchP"><input  id="search" type="text"  style="height:30px;" placeholder="Primary Search..."></span>                
                </tr>
            </table>    
 
           
        </div>
        <div class="col-md-4 col-xs-4 col-sm-4 col-lg-4">
            <table  >
                <tr>
                    <Td>
                        <span id="searchT"><input  id="search1" style="height:30px;" type="text" placeholder="Target Search..." ></span>                
                </tr>
            </table>    
        </div>
    </div>    

    <div class="row" style="z-index:1;width:95%;position:relative;top:-30px">        
        <div class="col-md-8 col-xs-8 col-sm-8 col-lg-8" style="height:430px;overflow-y:scroll">
            <table class="table table-bordered" id = "inProgress" >
            </table>    

            <table class="table table-bordered" id = "primaryTable" style="padding:0px;">
            </table>    
        </div>
        <div class="col-md-4 col-xs-4 col-sm-4 col-lg-4" style="height:430px;;overflow-y:scroll;">
            <table class="table table-bordered" style="z-index:100" id="targetTable">
            </table>    
        </div>
    </div>    
</body>  

</html>
<script>
    var currentTarget = "";
    var currentPrimary = "";
    var targets = [];
    var searchP = [];
    var searchT = [];
    var searchE = [];
    var searchW = [];
    var currentPlates =[];
    var currentwheels =[];
    var connWheels =[];
    var connPlates = [];
    var plate = [];
    var reel =[];
    var portToShow =""
    for ( var i = 0; i < 400; i++ ) {
        var target = {};        
        target["name"] = "Loading";
        target["id"] =  "0";
        targets.push(target);
        
    }    
    var primaries = [];
    for ( var i = 0; i < 40; i++ ) {
        var primary = {};       
        var possible = "abcdefghijklmnopqrstuvwxyz";
        text = possible.charAt(Math.floor(Math.random() * possible.length)); 
        primary["name"] = "Loading..."
        primary["id"] =  "0";
        primary["current"] =  "Loading";
        primaries.push(primary);
        
    }    
    //var theTable = $('#targetTable');
    $.each( targets, function( key, value ) {
        plate.push(value);

        $('#targetTable').append( '<tr><td id="target-'+ value["id"] +'">' + value["id"] + "-" + value["name"] +'</td></tr>' );        
        $( "#target-" + value["id"] ).click(function() {             
               $.each( targets, function( key, value ) {
                    $( "#target-" + value["id"] ).css("background-color", "#ffffff");
                });
                $( "#target-" + value["id"] ).css("background-color", "rgb(50, 200, 0)");
                currentTarget =  "target-" + value["id"];     
                checkSwitch();        
        });


    });    

    sortBy("id",primaries);
    sortBy("id",targets);
    $.each( primaries, function( key, value ) {                
        reel.push(value);
        $('#primaryTable').append( '<tr><td id="primary-'+ value["id"] +'">' + value["id"] + '-' + value["name"] +'</td><td>'+ value["current"]+'</td></tr>' );        
        $( "#primary-" + value["id"] ).click(function() {             
               $.each( primaries, function( key, value ) {
                    $( "#primary-" + value["id"] ).css("background-color", "#ffffff");
                });
                $( "#primary-" + value["id"] ).css("background-color", "rgb(50, 200, 0)");  
                currentPrimary = "primary-" + value["id"];  
                checkSwitch();            

        });
    });        


    function doSwitch(r,tp,to,time1){
        if(time1.length > 40){
            time1= "";

        }
        else if(time1.length==0){

        }else{
            time1 = Date.parse(time1).getTime()/1000;    
        }
        

        if($('#ew').val()=="reel"){

            $.get("runapi.php?command=connect&arguments="+ r +"%20" + tp + "%20" + to + "%20"+time1, function(data){
                console.log(data);
                getTabels();
            });

        }else{
            $.get("runapi.php?command=plate_connect&arguments="+ tp +"%20" + to + "%20" + r + "%20"+time1, function(data){
                console.log(data);
                getTabels();
            });
        }
        currentPrimary = "";
        currentTarget = "";
        checkSwitch();
        $('#datetime').val('');

        showTables($('#ew').val());


    }

    function disconnect(r,tp,to,time){
        if(time.length >0){
            time = Date.parse(time).getTime()/1000;
        }
        
        if($('#ew').val()=="reel"){
            $.get("runapi.php?command=connect&arguments="+ r +"%20" + tp + "%20" + to + "%20"+time, function(data){
                console.log(data);
                getTabels();
     
            });

        }else{
            $.get("runapi.php?command=plate_connect&arguments="+ tp +"%20" + to + "%20p%20"+time, function(data){
                console.log(data); 
                getTabels();   
            });
        }
        currentPrimary = "";
        currentTarget = "";
        checkSwitch();
        $('#date').val('');
        $('#time').val('');

        showTables($('#ew').val());


    }
    function checkSwitch(){
        if(currentTarget != "" & currentPrimary != "" && currentTarget != "parking"){
            $( "#switch" ).removeClass( "hidden" )
            $( "#switch" ).css("background-color", "rgb(50, 200, 0)"); 
            $( "#switch" ).html('Switch');
            $( "#switch").unbind( "click" );
            $( "#switch" ).click(function(){
                if($('#ew').val()=="reel"){
                    var wheel = currentPrimary.substring(currentPrimary.indexOf("-") +1);
                    var plate = currentTarget.substring(currentTarget.indexOf("-")+1);
                    plate = plate.substring(0,plate.indexOf("-"));
                    var port = currentTarget.substring(currentTarget.indexOf("-")+1);
                    var port = port.substring(port.indexOf("-")+1);
                    args= wheel + " " +  plate + " " +port;
                    var t =$("#datetime").val();

                    if($("#" + currentPrimary).data("active")==true){

                        var r = confirm("Connection Reel " + $("#" + currentPrimary).data("name") + " to Plate " + $("#" + currentPrimary).data("current_name") + " will be lost. Are you sure?");
                        if (r == true) {
                           doSwitch(wheel,plate,port,t);    
                        }

                    }else{
                        doSwitch(wheel,plate,port,t);                        
                    }

                }else{
                    console.log(currentPrimary);                    
                    var wheel = currentTarget.substring(currentTarget.indexOf("-") +1);                    
                    var plate = currentPrimary.substring(currentPrimary.indexOf("-")+1);
                    plate = plate.substring(0,plate.indexOf("-"));
                    var port = currentPrimary.substring(currentPrimary.indexOf("-")+1);
                    var port = port.substring(port.indexOf("-")+1);
                    args= wheel + " " +  plate + " " +port;
                    var t = $("#datetime").val()                   
                    if($("#" + currentPrimary).data("active")==true){
                       var r = confirm("Connection Plate " + $("#" + currentPrimary).data("name") + " to Reel " + $("#" + currentPrimary).data("current_name") + " will be lost. Are you sure?");
                        if (r == true) {
                            doSwitch(wheel,plate,port,t);        
                        }

                    }else{
                        doSwitch(wheel,plate,port,t);    
                    }
                    


                }

            });

        }else if(currentTarget == "" && currentPrimary != "" && $("#" + currentPrimary).data("active")==true){
            $( "#switch" ).removeClass( "hidden" )
            $( "#switch" ).css("background-color", "rgb(255, 153, 51)"); 
            $( "#switch" ).html('Disconnect');
            $( "#switch").unbind( "click" );
            $( "#switch" ).click(function(){                
                if($('#ew').val()=="reel"){
                    var wheel = currentPrimary.substring(currentPrimary.indexOf("-") +1);
                    var t = $("#datetime").val();
                    var r = confirm("Connection Reel " + $("#" + currentPrimary).data("name") + " to Plate " + $("#" + currentPrimary).data("current_name") + " will be lost. Are you sure?");
                    if (r == true) {
                        disconnect(wheel,"p","p",t);
                    } else {                        
                    }                    
                    
                }else{
                    var plate = currentPrimary.substring(currentPrimary.indexOf("-")+1);
                    plate = plate.substring(0,plate.indexOf("-"));
                    var port = currentPrimary.substring(currentPrimary.indexOf("-")+1);
                    var port = port.substring(port.indexOf("-")+1);
                    var t = $("#datetime").val();
                    var r = confirm("Connection Plate " + $("#" + currentPrimary).data("name") + " to Reel " + $("#" + currentPrimary).data("current_name") + " will be lost. Are you sure?");
                    <!--var r = confirm("Connection Reel " + $("#" + currentPrimary).data("name") + " to Plate " + $("#" + currentTarget).data("name") + " will be lost. Are you sure?");-->
                    if (r == true) {
                        disconnect("p",plate,port,t);
                    } else {                        
                    }                    

                }

            });
        }else if(currentTarget == "parking" && currentPrimary !=""){
            $( "#switch" ).removeClass( "hidden" )
            $( "#switch" ).css("background-color", "rgb(50, 200, 0)"); 
            $( "#switch" ).html('Switch');
            $( "#switch").unbind( "click" );
            $( "#switch" ).click(function(){                
                if($('#ew').val()=="reel"){
                    var wheel = currentPrimary.substring(currentPrimary.indexOf("-") +1);
                    var t = $("#datetime").val();
                    var r = confirm("Connection Reel " + $("#" + currentPrimary).data("name") + " to Plate " + $("#" + currentPrimary).data("current_name") + " will be lost. Are you sure?");
                    if (r == true) {
                        disconnect(wheel,"p","p",t);
                    } else {                        
                    }                    
                    
                }else{
                    var plate = currentPrimary.substring(currentPrimary.indexOf("-")+1);
                    plate = plate.substring(0,plate.indexOf("-"));
                    var port = currentPrimary.substring(currentPrimary.indexOf("-")+1);
                    var port = port.substring(port.indexOf("-")+1);
                    var t = $("#datetime").val();
                    var r = confirm("Connection Plate " + $("#" + currentPrimary).data("name") + " to Reel " + $("#" + currentPrimary).data("current_name") + " will be lost. Are you sure?");
                    <!--var r = confirm("Connection Reel " + $("#" + currentPrimary).data("name") + " to Plate " + $("#" + currentTarget).data("name") + " will be lost. Are you sure?");-->
                    if (r == true) {
                        disconnect("p",plate,port,t);
                    } else {                        
                    }                    

                }

            });    

        }else{
            $( "#switch" ).addClass( "hidden" )
            $( "#switch" ).css("background-color", "blue"); 
            $( "#switch" ).html('Switch');
        }

    }
    function natcmp(a, b) {
        var ra = a.match(/\D+|\d+/g);
        var rb = b.match(/\D+|\d+/g);
        var r = 0;

        while(!r && ra.length && rb.length) {
            var x = ra.shift(), y = rb.shift(),
                nx = parseInt(x), ny = parseInt(y);

            if(isNaN(nx) || isNaN(ny))
                r = x > y ? 1 : (x < y ? -1 : 0);
            else
                r = nx - ny;
        }
        return r || ra.length - rb.length;
    }

    function sortBy(sorter,array1){
        if(sorter=="id"){            
                array1.sort(function(a, b){
                    if(a["port"]){
                        return (a["id"] + a["port"]) - (b["id"] + b["port"])    
                    }else{
                        return (a["id"] - b["id"]);                        
                    }
                    
                });                
            
                
            
            
        }else{            
            //array1.sort(function(a, b) { return a["sortName"] > b["sortName"] ? 1 : a["sortName"] < b["sortName"] ? -1 : 0; });
            array1.sort(function (a,b){

                if(a["sortName"] == undefined || a["sortName"] == "" ){
                    a["sortName"] = "z";
                }
                if(b["sortName"] == undefined || b["sortName"] == ""){
                    b["sortName"] = "z"
                }
                if(a["sortName"] == "z" && b["sortName"] == "z"){
                    if(a["port"]){
                        return (a["id"] + a["port"]) - (b["id"] + b["port"])    
                    }else{
                        return (a["id"] - b["id"]);                        
                    }                    
                }else{
                    return natcmp(a["sortName"].toLowerCase(),b["sortName"].toLowerCase());
                }
                

            });

        }

    }

    function inProgress(){
        $('#inProgress').html('');
        console.log(connections);
        $.each( connections, function( key, value ) { 
            if( value["wheel"]){
                $('#inProgress').append( '<tr style="border:2px solid red"><td width=100%">' + value["wheel"] + ":" +value["wheel_comment"] +'==>'+ value["plate"] +'-' + value["port"] + ":"+ value["plate_comment"] + " *" + value["status"] +"</td></tr>" );                                            
            }            
            
        });    
        showTables($('#ew').val(),portToShow);  

    }
    function showTables(ew,show){
        var dontShow = show;                
        if (ew=="reel"){
            $('#targetTable').html( '' );        
            $('#primaryTable').html( '' ); 
            sortBy($('#sortBy').val(),primaries);
            sortBy($('#sortBy').val(),targets);      
            //console.log(currentPrimary);
            $('#targetTable').append( '<tr><td  id="parking">Parking</td></tr>' );                         
            if(show != undefined){                
                var dontShow = show.substring(show.indexOf("-") + 1,show.indexOf(":"));
                show = show.substring(0,show.indexOf("-"));

            }
            $.each( targets, function( key, value ) {
                if(jQuery.inArray( value["id"], currentwheels ) == -1 || (value["id"] == show && value["port"] != dontShow) ){
                    if(jQuery.inArray( value["id"], connPlates ) != -1 ){                        
                        $('#targetTable').append( '<tr><td  id="target-'+ value["id"] +'-'+ value["port"]+'"><img src="images/hourglass.png" width="10px" style="position:relative;top:-1px;"/>&nbsp;' + value["name"] +'</td></tr>' );                         
                    }else{
                        $('#targetTable').append( '<tr><td  id="target-'+ value["id"] +'-'+ value["port"]+'">' + value["name"] +'</td></tr>' );                         
                    }

                    $("#target-" + value["id"] + "-" + value["port"]).data("name",value["name"]);  

                    $("#target-" + value["id"] + "-" + value["port"] ).click(function() { 
                        $( "#parking" ).css("background-color", "#ffffff");            
                           $.each( targets, function( key, value ) {
                                $( "#target-" + value["id"] + "-" + value["port"] ).css("background-color", "#ffffff");
                            });
                            $( "#target-" + value["id"] + "-" + value["port"] ).css("background-color", "rgb(50, 200, 0)");
                            currentTarget =  "target-" + value["id"] + "-" + value["port"] ;     
                            checkSwitch();    
                    });
                    
                    if(currentTarget == "target-"+ value["id"] +"-"+ value["port"] ){

                        $( "#target-" + value["id"] + "-" + value["port"] ).css("background-color", "rgb(50, 200, 0)");
                    }

                }
                

            });    
           $.each( primaries, function( key, value ) {            
                if(value["status"] == "Available"){
                    if(jQuery.inArray( value["id"], connWheels ) != -1 ){
                        $('#primaryTable').append( '<tr><td id="primary-'+ value["id"] +'" width="50%"><img src="images/hourglass.png" width="10px" style="position:relative;top:-1px;"/>&nbsp;' + value["name"] +'</td><td width="50%" style="background-color:#eeeeee">'+ value["current"]+'</td></tr>' );                                
                    }else{
                        $('#primaryTable').append( '<tr><td id="primary-'+ value["id"] +'" width="50%">' + value["name"] +'</td><td width="50%" style="background-color:#eeeeee">'+ value["current"]+'</td></tr>' );                                
                    }
                    
                    $( "#primary-" + value["id"] ).data("name",value["name"]);                      
                    $( "#primary-" + value["id"] ).data("current_name",value["current"]);                      
                    $( "#primary-" + value["id"] ).click(function() {  
                            currentTarget = "";
                            $.each( primaries, function( key, value ) {                                
                                if(value["parking"]){
                                    $( "#primary-" + value["id"] ).css("background-color", "#ffffff");        
                                }else{
                                    $( "#primary-" + value["id"] ).data("active",true);          

                                    $( "#primary-" + value["id"] ).css("background-color", "#FFF4E6");
                                                        
                                }

                            });
                            $( "#primary-" + value["id"] ).css("background-color", "rgb(50, 200, 0)");  
                            currentPrimary = "primary-" + value["id"];  
                            checkSwitch();    
                            portToShow = value["current"] ;       
                            showTables(ew,value["current"]); 
                    });

                    if(value["parking"]){
                        $( "#primary-" + value["id"] ).css("background-color", "#ffffff");
                        
                    }else{

                        $( "#primary-" + value["id"] ).data("active",true);
                        $( "#primary-" + value["id"] ).css("background-color", "#FFF4E6");<!--rgb(255, 153, 51)-->
                    
                    }

                    if(currentPrimary == "primary-" + value["id"] ){
                        $( "#primary-" + value["id"] ).css("background-color", "rgb(50, 200, 0)");
                        
                    }

                }    


            });                
        }else{
            $('#targetTable').html( '' );        
            $('#primaryTable').html( '' ); 
            $('#targetTable').append( '<tr><td  id="parking">Parking</td></tr>' );                         
            sortBy($('#sortBy').val(),primaries);
            sortBy($('#sortBy').val(),targets);      
            $.each( primaries, function( key, value ) {                
                if(jQuery.inArray( value["id"], currentPlates) == -1){
                    if(jQuery.inArray( value["id"], connWheels ) != -1 ){
                        $('#targetTable').append( '<tr><td  id="target-'+ value["id"] +'"><img src="images/hourglass.png" width="10px" style="position:relative;top:-1px;"/>&nbsp;' + value["name"] +'</td></tr>' );     
                    }else{
                        $('#targetTable').append( '<tr><td  id="target-'+ value["id"] +'">' + value["name"] +'</td></tr>' ); 
                    }
                    
                    $("#target-" + value["id"]).data("name",value["name"]);     

                    $("#target-" + value["id"]).click(function() { 
                           $( "#parking" ).css("background-color", "#ffffff");            
                           $.each( primaries, function( key, value ) {
                                $( "#target-" + value["id"] ).css("background-color", "#ffffff");
                            });
                            $( "#target-" + value["id"] ).css("background-color", "rgb(50, 200, 0)");
                            currentTarget =  "target-" + value["id"] ;     
                            checkSwitch();        
                    });
                    if(currentTarget == "target-"+ value["id"] ){

                        $( "#target-" + value["id"] ).css("background-color", "rgb(50, 200, 0)");
                    }
                }

            });    
           $.each( targets, function( key, value ) {     
                if(jQuery.inArray( value["id"], connPlates ) != -1 ){           
                    $('#primaryTable').append( '<tr><td id="primary-'+ value["id"] + "-" + value["port"] +'" width="50%"><img src="images/hourglass.png" width="10px" style="position:relative;top:-1px;"/>&nbsp;' + value["name"] +'</td><td width="50%" style="background-color:#eeeeee">'+ value["current"]+'</td></tr>' );        
                }else{
                    $('#primaryTable').append( '<tr><td id="primary-'+ value["id"] + "-" + value["port"] +'" width="50%">' + value["name"] +'</td><td width="50%" style="background-color:#eeeeee">'+ value["current"]+'</td></tr>' );            
                }
                
                $("#primary-" + value["id"] + "-" + value["port"] ).data("name",value["name"]);   
                $( "#primary-" + value["id"] + "-" + value["port"] ).data("current_name",value["current"]);                                         
                if(value["current"] == ""){
                    $( "#primary-" + value["id"] + "-" + value["port"] ).css("background-color", "#ffffff");                            
                }else{
                    $( "#primary-" + value["id"] + "-" + value["port"] ).css("background-color", "#FFF4E6");
                    $( "#primary-" + value["id"] + "-" + value["port"]).data("active",true);                    
                }
                $( "#primary-" + value["id"] + "-" + value["port"] ).click(function() {             
                        currentTarget = "";
                       $.each( targets, function( key, value ) {                           
                            if(value["current"] == ""){
                                $( "#primary-" + value["id"] + "-" + value["port"] ).css("background-color", "#ffffff");                            
                            }else{
                                $( "#primary-" + value["id"] + "-" + value["port"] ).css("background-color", "#FFF4E6");
                                $( "#primary-" + value["id"] +"-" + value["port"]  ).data("active",true);
                                
                            }



                        });
                        //$( "#primary-" + value["id"] + "-" + value["port"] ).css("background-color", "rgb(50, 200, 0)");  

                        currentPrimary = "primary-" + value["id"] + "-" + value["port"];  
                        $( "#primary-" + value["id"] + "-" + value["port"] ).css("background-color", "rgb(50, 200, 0)");
                        checkSwitch();  
                        showTables(ew,value["current"]);           

                });

                if(currentPrimary == "primary-" + value["id"]  + "-" + value["port"] ){
                    $( "#primary-" + value["id"]  + "-" + value["port"] ).css("background-color", "rgb(50, 200, 0)");
                }

            });  

        }        
        $("#parking").click(function() {             
                $( "#parking" ).css("background-color", "rgb(50, 200, 0)");
                currentTarget =  "parking";     
               $.each( targets, function( key, value ) {
                    $( "#target-" + value["id"] + "-" + value["port"] ).css("background-color", "#ffffff");
                });
               $.each( primaries, function( key, value ) {
                    $( "#target-" + value["id"] ).css("background-color", "#ffffff");
                });


                checkSwitch();        
        });
        if (currentTarget == "parking"){
            $( "#parking" ).css("background-color", "rgb(50, 200, 0)");
        }


    }
    //end of show tables

    $('#sortBy').change(function(){ 
        var value = $(this).val();
        sortBy(value,targets);
        sortBy(value,primaries);  
        showTables($('#ew').val(),portToShow); 

        
    });
    $('#ew').change(function(){ 
        if($(this).val() == "reel"){
            $('#search').typeahead('destroy');
            $('#search').typeahead({

              hint: true,
              highlight: true,
              minLength: 1
            },

            {
              
              displayKey: 'value',
              source: substringMatcher(searchP)
            }).on('typeahead:selected', function($e, datum){
                        doSearch();
                    }
                );    

                $('#search').keyup(function(){ 
                    doSearch();
                });            
            $('#search1').typeahead('destroy');
            $('#search1').typeahead({

              hint: true,
              highlight: true,
              minLength: 1
            },

            {
              
              displayKey: 'value',
              source: substringMatcher(searchT)
            }).on('typeahead:selected', function($e, datum){
                        doSearch();
                    }
                );    

                $('#search1').keyup(function(){ 
                    doSearch();
                });            

        }else{
            $('#search').typeahead('destroy');
            $('#search').typeahead({

              hint: true,
              highlight: true,
              minLength: 1
            },

            {
              
              displayKey: 'value',
              source: substringMatcher(searchT)
            }).on('typeahead:selected', function($e, datum){
                        doSearch();
                    }
                );    

                $('#search').keyup(function(){ 
                    doSearch();
                });            
            $('#search1').typeahead('destroy');
            $('#search1').typeahead({

              hint: true,
              highlight: true,
              minLength: 1
            },

            {
              
              displayKey: 'value',
              source: substringMatcher(searchP)
            }).on('typeahead:selected', function($e, datum){
                        doSearch();
                    }
                );    

                $('#search1').keyup(function(){ 
                    doSearch();
                });            

//            $('#search1').typeahead().data('typeahead').source = searchP;             
//            $('#search').typeahead().data('typeahead').source = searchT;

        }

        var value = $(this).val();
        currentTarget = "";
        currentPrimary = "";        
        showTables(value,portToShow);          
    });
var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substrRegex;
 
    // an array that will be populated with substring matches
    matches = [];
 
    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');
 
    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        // the typeahead jQuery plugin expects suggestions to a
        // JavaScript object, refer to typeahead docs for more info
        matches.push({ value: str });
      }
    });
 
    cb(matches);
  };
};
 

$('#search').typeahead({

  hint: true,
  highlight: true,
  minLength: 1
},

{
  
  displayKey: 'value',
  source: substringMatcher(searchP)
}).on('typeahead:selected', function($e, datum){
            doSearch();
        }
    );    

    $('#search').keyup(function(){ 
        doSearch();
    });
$('#search1').typeahead({

  hint: true,
  highlight: true,
  minLength: 1
},

{
  displayKey: 'value',
  source: substringMatcher(searchT)
}).on('typeahead:selected', function($e, datum){
            doSearch();
        }
    );    

    $('#search1').keyup(function(){ 
        doSearch("targets");
    });   

 function doSearch(ew){
   // var result = $.grep(plate, function(e){ return e["name"].indexOf($('#search').val()) >=0  });

    if(ew == "targets"){

        var result;
        if($('#ew').val() == "reel"){
            result = $.grep(plate, function(e){ return e["name"].toLowerCase().indexOf($('#search1').val().toLowerCase()) >=0  });            
            targets = result;
        }else{
            result = $.grep(reel, function(e){ return e["name"].toLowerCase().indexOf($('#search1').val().toLowerCase()) >=0  });            
            primaries = result;
        }

//        targets = result;
        if (result.length == 0){
            $('#search1').val($('#search1').val().substring(0,$('#search1').val().length-1 ))  ;

            if($('#ew').val() == "reel"){
                result = $.grep(plate, function(e){ return e["name"].toLowerCase().indexOf($('#search1').val().toLowerCase()) >=0  });            
                targets = result;
            }else{
                result = $.grep(reel, function(e){ return e["name"].toLowerCase().indexOf($('#search1').val().toLowerCase()) >=0  });            
                primaries = result;
            }

            
        }

    }
    else{
        var result;
        if($('#ew').val() == "reel"){
            result = $.grep(reel, function(e){ return e["name"].toLowerCase().indexOf($('#search').val().toLowerCase()) >=0  });            
            primaries = result;
        }else{
            result = $.grep(plate, function(e){ return e["name"].toLowerCase().indexOf($('#search').val().toLowerCase()) >=0  });            
            targets = result;
        }

//        primaries = result;
        if (result.length == 0){
            $('#search').val($('#search').val().substring(0,$('#search').val().length-1 ))  ;
            if($('#ew').val() == "reel"){
                result = $.grep(reel, function(e){ return e["name"].toLowerCase().indexOf($('#search').val().toLowerCase()) >=0  });            
                primaries = result;
            }else{
                result = $.grep(plate, function(e){ return e["name"].toLowerCase().indexOf($('#search').val().toLowerCase()) >=0  });            
                targets = result;
            }

        }

    }

    sortBy($('#sortBy').val(),targets);
    sortBy($('#sortBy').val(),primaries);
    showTables($('#ew').val(),portToShow);            

 }   
function setData(data){
    primaries = [];
    targets = [];
    currentwheels = [];
    currentPlates = [];
     console.log(data);
     $.each( data["wheels"], function( key, value ) {
        searchP.push(value["wheelid"] + ":" + value["operator_comment"]);
        var primary = {};                       
        primary["name"] = value["wheelid"] + ":" + value["operator_comment"];
        primary["sortName"] = value["operator_comment"];
        primary["id"] =  value["wheelid"];
        primary["current"] = "";
        primary["status"] = value["wheelstatus"];
        primary["plate_number"] = value["plate_number"]
        primary["plate_port_number"] = value["plate_port_number"]
        $.each( data["plates"], function( key, p ) {
            if(p["plate_id"] == value["plate_number"] && p["port"] == value["plate_port_number"]){
                primary["current"] =  value["plate_number"] + "-" +p["port"] + ":" + p["opcomment"];                
                currentwheels.push(value["plate_number"])
            }

        });
        
        primary["parking"] = false;
        $.each(data["parking"], function(key, p){
            if(p["id"] == value["plate_number"]){
                primary["parking"] = true;
                primary["current"] =  "Parking";
            }

        });
        primaries.push(primary);        

     });
     $.each( data["plates"], function( key, value ) {
        var primary = {};                       
        searchT.push(value["plate_id"] + "-" + value["port"] + ":" + value["opcomment"]);        
        primary["name"] = value["plate_id"] + "-" + value["port"] + ":" + value["opcomment"];
        primary["sortName"] = value["opcomment"];        
        primary["id"] =  value["plate_id"];
        primary["port"] =  value["port"];
        primary["status"] = value["status"];
        primary["currentWheel"] = value["currentWheel"];
        primary["current"] ="";        
        if(value["currentWheel"] != "0"){
            currentwheels.push(value["plate_id"]);
        }

        $.each( data["wheels"], function( key, wheel ) {
            if(wheel["plate_number"] == value["plate_id"] && wheel["plate_port_number"] == value["port"]){
                primary["current"] = wheel["wheelid"] + ":" + wheel["operator_comment"];
                currentPlates.push(wheel["wheelid"]) ;
            } 

            
        });
         primary["parking"] = false;
        $.each(data["parking"], function(key, p){
            if(p["id"] == value["id"]){
                primary["parking"] = true;
            }

        });

        targets.push(primary);                

     });     

    plate = targets;
    reel = primaries;
    searchW = searchP;
    searchE = searchT;    
    showTables($('#ew').val(),portToShow);
    
    console.log("++++!!!++++!!!!++++!!!+++");


}
console.log(targets);
 getTabels();

var connections = [];
function getTabels(){
    $.ajax({url:"s_api.php",success:function(result){
        setData(jQuery.parseJSON(result));  
        doSearch(); 
        doSearch("targets"); 
    }});    

    $.ajax({url:"runapi.php?command=next_switch_list",success:function(result){
        connections = [];
        connWheels =[] ; 
        connPlates = [] ;
        var res = result.split(/\r\n|\r|\n/g);    
        $.each( res, function( key, rs ) {        
            var connection = {};
            var r = rs.split(",");
            connection["wheel"] = r[1];
            connection["wheel_comment"] = r[2];
            connection["plate"] = r[3];
            connection["port"] = r[4]; 
            connection["plate_comment"] = r[5]; 
            connection["status"] = r[6];
            connWheels.push(connection["wheel"]);
            connPlates.push(connection["plate"])
            connections.push(connection);                    
        }); 
        if(result != "empty"){
            inProgress();       
        }else{
            $('#inProgress').html('');
        }
        
        
      }});    
}
setInterval(getTabels, 15000);
</script>
<?php 
    
    //print_r($reels);
?>