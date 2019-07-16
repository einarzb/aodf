function appendOption(value, text, id) {
  $("<option>").attr("value",value).text(text).appendTo(id);
}
function prependOption(value, text, id) {
  $("<option>").attr("value",value).text(text).prependTo(id);
}
var datarefreshrate=1500; //mili seconds
var runner = {
  runsimple:function(command) {
     $.get("/runapi.php", "command="+command,
         function(data){});
  },
  rungetoutput:function(command,targetfieldid) {
     $.get("/runapi.php", "command="+command,
         function(data) {
             $(document.getElementById(targetfieldid)).attr('value',data);
         });
  },
  rungetoutputcallback:function(command,callback) {
     $.get("/runapi.php", "command="+command,callback);
  },
  rungetoutputcallbackwithargs:function(command, args, callback) {
     $.get("/runapi.php", "command=" + command + "&" + "arguments=" + args, callback);
  },
  rungetoutputcallbackwithargsretry:function(command, args, callback) {
     // This function retry after timeout!
     $.ajax({
          url: "/runapi.php",
          data: "command=" + command + "&" + "arguments=" + args,
          timeout: datarefreshrate,
          success: callback,
          cache: false,
          error: function(request, strError){
             // We probably have timeout so try again.
             if(strError == "timeout")
               setTimeout(function(){
                 runner.rungetoutputcallbackwithargsretry(command, args, callback);
                 }, datarefreshrate);
          }}
     );
  }
};
var camera = {
  setrowvalues:function(rownum, rowx, rowy, rowc) {
     $("#target"+rownum+"x").html(rowx);
     $("#target"+rownum+"y").html(rowy);
     $("#target"+rownum+"c").html(rowc);
     $("#targetrow"+rownum).show();
  },
  setsensorsvalues:function(elevator, rotate, plate, stage, gripperoc ,gripperio) {
     camera.setsensor("#cameraelevatorimage",'/bar.php?percent='+elevator);
     camera.setsensor("#camerastatusimage",'/hbar.php?percent='+rotate);
     camera.setsensor("#cameraplateimage",'/round.php?angle='+plate);
     camera.setsensor("#camerastageimage",'/round.php?angle='+stage);
     camera.setsensor("#cameragripperocimage",'/gripper.php?percent='+gripperoc);
     camera.setsensor("#cameragripperioimage",'/hbar.php?percent='+gripperio);
  },
  setsensor:function(sensor,newvalue) {
     oldvalue=$(sensor).attr('src');
     if(oldvalue !== newvalue) {
        $(sensor).attr('src',newvalue);
     }
  },
  processdata:function(obj) {
     var data = jQuery.parseJSON(obj);
     if(data.target1.set=='1') {
       camera.setrowvalues('1', data.target1.x, data.target1.y, data.target1.c);
       if(data.target2.set=='1') {
         camera.setrowvalues('2', data.target2.x, data.target2.y, data.target2.c);
         if(data.target3.set=='1') {
           camera.setrowvalues('3', data.target3.x, data.target3.y, data.target3.c);
         }
         else
         {
           $("#targetrow3").hide();
         }
       }
       else
       {
         $("#targetrow2").hide();
         $("#targetrow3").hide();
       }
     }
     else
     {
       $("#targetrow1").hide();
       $("#targetrow2").hide();
       $("#targetrow3").hide();
     }
     return data;
  },
  viewimage:function() {
     timestamp=new Date().getTime();
     $("#cameramainimage").attr('src',"frame-www.jpg?ts="+timestamp);
  },
  processdata2:function(obj) {
     camera.processdata(obj);
     camera.viewimage();
  },
  setsensorsdata:function(obj) {
     var res = jQuery.parseJSON(obj);
     var data = res.result;
     $("#elevatorvalue").html(data.elevation_position);
     $("#rotatevalue").html(data.status_position);
     $("#platevalue").html(data.plate_angle);
     $("#stagevalue").html(data.stage_angle);
     $("#gripperiovalue").html(data.gripper_io);
     $("#gripperocvalue").html(data.gripper_oc);
     camera.setsensorsvalues(data.elevation_position/data.elevator_factor,
             data.status_position/data.height_factor,
             data.plate_angle/data.plate_angle_factor,
             data.stage_angle/data.stage_angle_factor,
             data.gripper_oc/data.height_factor,
             data.gripper_io/data.height_factor);
  },
  movetorel:function() {
     myarguments = $("#cameramotor").attr('value') + " 4 1 " + $("#cameravalue").attr('value');
     runner.rungetoutputcallbackwithargs('direct_mode',myarguments,camera.movetoreloutput);
     runner.rungetoutputcallback('getsensorsdata',camera.setsensorsdata);
  },
  movetoreloutput:function(obj) {
  }
};
var connections = {
  connectcheck:function(obj) {
     var data = jQuery.parseJSON(obj);
     if(data.wait == 'true')
     { // Need to wait further
           args = data.parameters.homeport;
           setTimeout(function(){
             runner.rungetoutputcallbackwithargsretry('connectstatus', args,
                 connections.connectcheck);
             }, datarefreshrate);
     }
     else
     {
       if(data.status == 'Success' && data.parameters.status == 'connected')
         alert('Home port ' + data.parameters.homeport + ' connected');
       else
         alert('Error: home port ' + data.parameters.homeport + ' ' + data.result)
       $("#coninfo_connect").attr('style','WIDTH:100px;HEIGHT:35px;');
       $("#coninfo_connect").attr('value','CONNECT');
       $("#coninfo_connect").removeAttr('disabled');
     }
  },
  sendconnect:function() {
     args= $("#coninfo_reelnum").attr('value') + " " +
           $("#coninfo_targetplate").attr('value') + " " +
           $("#coninfo_targetportnum").attr('value');
     runner.rungetoutputcallbackwithargs("connect", args, function(obj) {
           var data = jQuery.parseJSON(obj);
           var result = data.result;
           if(result=="ok")
           {
             //alert("Start conncting ...");
             $("#coninfo_connect").attr('style','WIDTH:150px;HEIGHT:35px;');
             $("#coninfo_connect").attr('value','Connect in progress');
             $("#coninfo_connect").attr('disabled','disabled');
             args = $("#coninfo_reelnum").attr('value');
             setTimeout(function(){
               runner.rungetoutputcallbackwithargsretry('connectstatus', args,
                   connections.connectcheck);
               }, datarefreshrate * 7);
           }
           else
             alert(data.result);
     });
  },
  getallresults:function(obj) {
     var data = jQuery.parseJSON(obj);
     connections.plate_info = data.result.database.plate_info;
     connections.wheel_info = data.result.database.wheel_info.sort(
       function(a, b){
         if(a.administrator_comment === '') {
           if(b.administrator_comment === '') {
             // If no comment sort with wheel ID (Number)
             return a.wheelid - b.wheelid;
           }
           else
             return 1;
         }
         if(b.administrator_comment === '') {
           return -1;
         }
         // If both sides have comment sort by comment!
         if(a.administrator_comment > b.administrator_comment)
           return 1;
         if(a.administrator_comment < b.administrator_comment)
           return -1;
         return 0;
       });
     // Fill reel select
     for(var reel in connections.wheel_info) {
       var item = connections.wheel_info[reel];
       var comm;
       if(item.administrator_comment === '')
         comm = '';
       else
         comm = ' - ' + item.administrator_comment;
       appendOption(item.wheelid, item.wheelid + comm, "#coninfo_reelnum");
     }
     // Fill plates
     appendOption(0, 'Parking', "#coninfo_targetplate");
     for(var plate in connections.plate_info) {
       var item = connections.plate_info[plate];
       if(item.plate_type === 'Regular')
         appendOption(item.plate_number, item.plate_number, "#coninfo_targetplate");
     }
     connections.sendload();
  },
  getall:function() {
     runner.rungetoutputcallback('getconnections',connections.getallresults);
  },
  sendload:function() {
     var item = connections.wheel_info[$('#coninfo_reelnum').val()];
     $("#coninfo_plate").html(item.plate_number);
     $("#coninfo_plateport").html(item.plate_port_number);
     $("#coninfo_parking").html(item.parkingplatenum);
  },
  fillports:function() {
    $("#coninfo_targetportnum").html('');
    var item = connections.plate_info[$("#coninfo_targetplate").val()];
    if(item.plate_type === 'Regular') {
      for(var portid in item.ports) {
        var port = item.ports[portid];
        var pid = Number(portid) + 1;
        var comm;
        if(port.adcomment === '')
          comm = '';
        else
          comm = ' - ' + port.adcomment;
        appendOption(pid, pid + comm, "#coninfo_targetportnum");
      }
    }
  },
};
var con_oper = {
  connectcheck:function(obj) {
     var data = jQuery.parseJSON(obj);
     if(data.wait == 'true')
     { // Need to wait further
           args = data.parameters.homeport;
           setTimeout(function(){
             runner.rungetoutputcallbackwithargsretry('connectstatus', args,
                 connections.connectcheck);
             }, datarefreshrate);
     }
     else
     {
       if(data.status == 'Success' && data.parameters.status == 'connected')
         alert('Home port ' + data.parameters.homeport + ' connected');
       else
         alert('Error: home port ' + data.parameters.homeport + ' ' + data.result)
       $("#conoper_connect").attr('style','WIDTH:100px;HEIGHT:35px;');
       $("#conoper_connect").attr('value','CONNECT');
       $("#conoper_connect").removeAttr('disabled');
     }
  },
  sendconnect:function() {
     args= $("#conoper_reelnum").attr('value') + ' "' +
           $("#conoper_operator").val() + '"';
     runner.rungetoutputcallbackwithargs("conoper", args, function(obj) {
           var data = jQuery.parseJSON(obj);
           var result = data.result;
           if(result=="ok")
           {
             //alert("Start conncting ...");
             $("#conoper_connect").attr('style','WIDTH:150px;HEIGHT:35px;');
             $("#conoper_connect").attr('value','Connect in progress');
             $("#conoper_connect").attr('disabled','disabled');
             args = $("#conoper_reelnum").attr('value');
             setTimeout(function(){
               runner.rungetoutputcallbackwithargsretry('connectstatus', args,
                   con_oper.connectcheck);
               }, datarefreshrate * 7);
           }
           else
             alert(data.result);
     });
  },
  fill_status:function() {
     $('input[name="functionname"]').attr('value','conoperhomeportstatus');
     $.getJSON("/api.php", $("#conoperform").serialize(),
        function(data) {
            if(data.stat === null)
                data.stat='';
            $("#conoper_status").html(data.stat);
        }
     );
  }
};
var instructions_manager = {
  execute:function() {
     myarguments =       $("#motorNum").attr('value')
                 + " " + $("#instructions").attr('value')
                 + " " + $("#insttype").attr('value')
                 + " " + $("#value").attr('value');
     runner.rungetoutputcallbackwithargs('direct_mode',myarguments,instructions_manager.processdata);
  },
  processdata:function(obj) {
     alert("Execution Ended");
     $("#functionsoutput").html(obj);
     var data = jQuery.parseJSON(obj);
     $("#hostresult").html(data.result.host);
     $("#targetresult").html(data.result.target);
     $("#statusresult").html(data.result.status);
     $("#instrresult").html(data.result.instr);
     $("#valueresult").html(data.result.value);
     $("#diagramresult").html(data.result.diagram);
  }
};
var homes_info = {
  sendsave:function() {
     $('input[name="functionname"]').attr('value','reelsave');
     $.getJSON("/api.php", $("#reelform").serialize(),
         function(data) {
             alert(data.status);
         }
     );
  },
  sendloadwheel:function() {
     $('input[name="functionname"]').attr('value','wheelload');
     $.get("/api.php", $("#reelform").serialize(),
         function(obj) {
         }
     );
  },
  sendload:function() {
     $('input[name="functionname"]').attr('value','reelload');
     $.getJSON("/api.php", $("#reelform").serialize(),
         function(data) {
             if(data.PORT_NUMBER === null)
                 data.PORT_NUMBER=0;
             $("#reelinfo_apartmentnum").attr('value',data.APARTMENT__);
             $("#reelinfo_phone").attr('value',data.PHONE);
             $("#reelinfo_adcmt").attr('value',data.ADMINISTRATOR_COMMENT);
             $("#reelinfo_status").attr('value',data.STATUS);
             $("#reelinfo_city").attr('value',data.CITY);
             $("#reelinfo_street").attr('value',data.STREET);
             $("#reelinfo_streetnum").attr('value',data.STREET__);
             $("#reelinfo_country").attr('value',data.COUNTRY);
             $("#reelinfo_homename").attr('value',data.HOME_NAME);
             $("#reelinfo_reelnum").find("option[selected='selected']").removeAttr("selected");
             $("#reelinfo_reelnum").find("option[value='"+data.REEL_NUMBER+"']").attr("selected","selected");
             homes_info.sendloadwheel();
             $("#reelinfo_opcmt").attr('value',data.OPERATOR_COMMENT);
             if(data.PARKING_PLATE_NUMBER === null)
                 data.PARKING_PLATE_NUMBER=0;
             $("#reelinfo_quarter").attr('value',data.QUARTER);
             $("#reelinfo_zipcode").attr('value',data.ZIP_CODE);
         }
     );
  },
  sendinsert:function() {
     $('input[name="functionname"]').attr('value','reelinsert');
     $.getJSON("/api.php", $("#reelform").serialize(),
         function(data) {
             alert(data.status);
         }
     );
  },
  senddelete:function() {
     $('input[name="functionname"]').attr('value','reeldelete');
     $.getJSON("/api.php", $("#reelform").serialize(),
         function(data) {
             alert(data.status);
         }
     );
  }
};
var gpio = {
  getledstatus:function(obj) {
     var data = jQuery.parseJSON(obj);
     var on='/images/on.gif';
     var off='/images/off.gif';
/*
     for(var i = 1; i <= 8; i++)
     {
      document.write("The number is " + i);
      document.write("<br />");
     }
*/
     if(data.led1==1) {
         $("#led1").attr('src',on);
     }
     else
     {
         $("#led1").attr('src',off);
     }
     if(data.led2==1) {
         $("#led2").attr('src',on);
     }
     else
     {
         $("#led2").attr('src',off);
     }
     if(data.led3==1) {
         $("#led3").attr('src',on);
     }
     else
     {
         $("#led3").attr('src',off);
     }
     if(data.led4==1) {
         $("#led4").attr('src',on);
     }
     else
     {
         $("#led4").attr('src',off);
     }
     if(data.led5==1) {
         $("#led5").attr('src',on);
     }
     else
     {
         $("#led5").attr('src',off);
     }
     if(data.led6==0) {
         $("#led6").attr('src',on);
     }
     else
     {
         $("#led6").attr('src',off);
     }
     if(data.led7==1) {
         $("#led7").attr('src',on);
     }
     else
     {
         $("#led7").attr('src',off);
     }
     if(data.led8==1) {
         $("#led8").attr('src',on);
     }
     else
     {
         $("#led8").attr('src',off);
     }
  }
};
function led_update() {
     runner.rungetoutputcallback('gpio',gpio.getledstatus);
}
function set_led(id) {
     runner.rungetoutputcallbackwithargs('gpio', id, gpio.getledstatus);
}
var operator_ctrl = {
  senddelete:function() {
     if(confirm("Do you really want to delete this record?")) {
        $('input[name="functionname"]').attr('value','operatordelete');
        $.getJSON("/api.php", $("#operatorsform").serialize(),
            function(data) {
                alert(data.status);
                window.location.reload();
            }
        );
     }
  },
  sendsave:function() {
     $('input[name="functionname"]').attr('value','operatorsave');
     $.getJSON("/api.php", $("#operatorsform").serialize(),
        function(data) {
            alert(data.status);
        }
     );
  },
  sendload:function() {
     $('input[name="functionname"]').attr('value','operatorload');
     $.getJSON("/api.php", $("#operatorsform").serialize(),
        function(data) {
           $("#OPNAME").attr('value',data.NAME);
           if(data.DESCRIPTION === null)
              data.DESCRIPTION="";
           $("#DESCRIPTION").attr('value',data.DESCRIPTION);
           if(data.COMMENT === null)
              data.COMMENT="";
           $("#COMMENT").attr('value',data.COMMENT);
           if(data.CURRENT_PORTS === null)
              data.CURRENT_PORTS=0;
           $("#CURRENT_PORTS").attr('value',data.CURRENT_PORTS);
        }
     );
  },
  sendinsert:function() {
     $('input[name="functionname"]').attr('value','operatorinsert');
     $.getJSON("/api.php", $("#operatorsform").serialize(),
        function(data) {
           alert(data.status);
           if(data.name !== null) {
             appendOption(data.name, data.name, "#selected_operator");
             $("#selected_operator").attr("value",data.name);
           }
        }
     );
  }
};
var plateinfo_ctrl = {
  sendsave:function() {
     $('input[name="functionname"]').attr('value','platesave');
     $.getJSON("/api.php", $("#plateform").serialize(),
         function(data) {
             alert(data.status);
         }
     );
  },
  sendload:function() {
     $('input[name="functionname"]').attr('value','plateload');
     if($("#plateinfo_platenum").attr('value')==0)return;
     $.getJSON("/api.php", $("#plateform").serialize(),
         function(data) {
             if(data.PLATE_NUMBER === null)
                 data.PLATE_NUMBER=0;
             $("#plateinfo_platenum").attr('value',data.PLATE_NUMBER);
             $("#plateinfo_plateheight").html(data.PLATE_HEIGHT);
             $("#plateinfo_platetype").html(data.PLATE_TYPE);
             $("#plateinfo_plateposition").html(data.PLATE_POSITION);
             plateinfo_ctrl.sendgetportsform();
         }
     );
  },
  sendgetportsform:function() {
     $('input[name="functionname"]').attr('value','plategetportsform');
     $.get("/api.php", $("#plateform").serialize(),
         function(obj) {
            $("#portscontainer").html(obj);
         }
     );
  }
};
var wheel_ctrl = {
  sendsave:function() {
     $('input[name="functionname"]').attr('value','wheelsave');
     $.getJSON("/api.php", $("#reelform").serialize(),
        function(data) {
           alert(data.status);
        }
     );
  },
  sendload:function() {
     $('input[name="functionname"]').attr('value','wheelload');
     if($("#reelinfo_reelnum").attr('value')==0)return;
     $.getJSON("/api.php", $("#reelform").serialize(),
        function(data) {
           $("#reelinfo_adcmt").attr('value',data.administrator_comment);
           $("#reelinfo_status").find("option[selected='selected']").removeAttr("selected");
           $("#reelinfo_status").find("option[value='"+data.wheelstatus+"']").attr("selected","selected");
           $("#reelinfo_opcmt").attr('value',data.operator_comment);
           $("#parkingplatenum").html(data.parkingplatenum);
           $("#connections_counter").html(data.connections_counter);
           $("#reelinfo_reelangle").html(data.wheelangle);
           if(data.plate_number === null)
              data.plate_number=0;
           $("#currentplate").html(data.plate_number);
           if(data.plate_port_number === null)
              data.plate_port_number=0;
           $("#currentport").html(data.plate_port_number);
        }
     );
  },
};
var info_page = {
  connlistback:function(obj) {
    timestamp=new Date().getTime();
    window.location.href='connection_spreadsheet.csv?ts='+timestamp;
  },
  connlist:function() {
    runner.rungetoutputcallback('csv_connection_map', info_page.connlistback);
  },
  getlog:function() {
    timestamp=new Date().getTime();
    window.location.href='connections_log.csv?ts='+timestamp;
  },
};
