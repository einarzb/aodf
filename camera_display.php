<script type="text/javascript">
        $(document).ready(function(){
            runner.rungetoutputcallback('getsensorsdata', camera.setsensorsdata);
        });
</script>
    <div style="float: left;">
        <div style="float: left;">
            <table id="tableelevator">
                <tr>
                    <td>
                        Elevator: <span id="elevatorvalue"></span>
                        <script type="text/javascript">
                        document.write(max_elevator.toFixed(2));
                        </script>
                    </td>
                </tr>
                <tr>
                    <td>
                        <img src="/bar.php?percent=30" alt="" id="cameraelevatorimage" style="width:30px;"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        1
                    </td>
                </tr>
            </table>
            <table id="tablerotate">
                <tr>
                    <td colspan="3">
                        Rotate In/Out: <span id="rotatevalue"></span>
                    </td>
                </tr>
                <tr>
                    <td>
                       1
                    </td>
                    <td>
                       <img src="/hbar.php?percent=50" alt="" id="camerastatusimage" style="height:30px;"/>
                    </td>
                    <td>
                       100
                    </td>
                </tr>
            </table>
            <table id="tableplate">
                <tr>
                    <td colspan="3">
                        Plate: <span id="platevalue"></span><br />
                        <script type="text/javascript">
                        document.write((max_plateangle/4).toFixed(2));
                        </script>
                    </td>
                </tr>
                <tr>
                    <td>
                        <script type="text/javascript">
                         document.write((max_plateangle/2).toFixed(2));
                        </script>
                    </td>
                    <td>
                        <img src="/round.php?angle=90" alt="" id="cameraplateimage" style="width:150px;"/>
                    </td>
                    <td>
                        <script type="text/javascript">
                        document.write("0 / " + max_plateangle.toFixed(2));
                        </script>
                    </td>
                </tr>
                <tr>
                    <td colspan="3">
                        <script type="text/javascript">
                        document.write((max_plateangle*3/4).toFixed(2));
                        </script>
                    </td>
                </tr>
            </table>
            <table id="tablestage">
                <tr>
                    <td colspan="3">
                        Stage: <span id="stagevalue"></span><br />
                        <script type="text/javascript">
                        document.write((max_stageangle/4).toFixed(2));
                        </script>
                    </td>
                </tr>
                <tr>
                    <td>
                        <script type="text/javascript">
                        document.write((max_stageangle/2).toFixed(2));
                        </script>
                    </td>
                    <td>
                        <img src="/round.php?angle=270" alt="" id="camerastageimage" style="width:150px;"/>
                    </td>
                    <td>
                        <script type="text/javascript">
                        document.write("0 / " + max_stageangle.toFixed(2));
                        </script>
                    </td>
                </tr>
                <tr>
                    <td colspan="3">
                        <script type="text/javascript">
                        document.write((max_stageangle*3/4).toFixed(2));
                        </script>
                    </td>
                </tr>
            </table>
            <table id="tablegripperoc">
                <tr>
                    <td colspan="2">
                        Gripper Open/Close: <span id="gripperocvalue"></span><br />
                    </td>
                </tr>
                <tr>
                    <td>
                       1
                    </td>
                    <td>
                        <img src="/gripper.php?percent=50" alt="" id="cameragripperocimage" style="width:150px;"/>
                    </td>
                    <td>
                       100
                    </td>
                </tr>
            </table>
            <table id="tablegripperio">
                <tr>
                    <td colspan="3">
                        Gripper In/Out: <span id="gripperiovalue"></span>
                    </td>
                </tr>
                <tr>
                    <td>
                       1
                    </td>
                    <td>
                       <img src="/hbar.php?percent=50" alt="" id="cameragripperioimage" style="width:150px;"/>
                    </td>
                    <td>
                       100
                    </td>
                </tr>
            </table>
            <div id="submenu">
                <input id="cameracapture1" name="capture" type="button" value="Get Picture1" onclick="runner.rungetoutputcallback('capture',camera.processdata2);"/>
                <br/>
                <input id="cameracapture1" name="capture" type="button" value="Get Picture2" onclick="runner.rungetoutputcallbackwithargs('capture', 'dir park',camera.processdata2);"/>
                <br/>
                <input id="cameracapture3" name="capture" type="button" value="View Image" onclick="camera.viewimage();"/>
                <br/>
                <input id="cameramovetorel" name="cameramovetorel" type="button" value="Move Rel" onclick="camera.movetorel();"/>
                <br/>

                <table>
                    <tr>
                        <td style="text-align: left;">Motor:</td>
                    </tr>
                    <tr>
                        <td>
                <select id="cameramotor" name="cameramotor">
                    <option value="1" >Elevator</option>
                    <option value="2" >Stage</option>
                    <option value="3" >Plate Rotate</option>
                    <option value="4" >Plate In/Out</option>
                    <option value="5" >Gripper Open/Close</option>
                    <option value="6" >Gripper In/Out</option>
                </select></td>
                    </tr>
                    <tr>
                        <td style="text-align: left;">Value:</td>
                    </tr>
                    <tr>
                        <td><input id="cameravalue" name="cameravalue" type="text" /></td>
                    </tr>
                </table>
            </div>
        </div>

        <img id="cameramainimage" src="/images/bar.jpg" alt=""/>
        <div id="tablevalues">
            <table style="border: 1px solid black; " cellpadding="2">
                <thead>
                    <tr>
                        <td style="border: 1px solid black; width: 60px;">Target</td>
                        <td style="border: 1px solid black; width: 60px;">&nbsp;&nbsp;X&nbsp;&nbsp;</td>
                        <td style="border: 1px solid black; width: 60px;">&nbsp;&nbsp;Y&nbsp;&nbsp;</td>
                        <td style="border: 1px solid black; width: 60px;">Confidense Level</td>
                    </tr>
                </thead>
                <tbody>
                    <tr id="targetrow1">
                        <td style="border: 1px solid black; width: 60px;">1</td>
                        <td id="target1x" style="border: 1px solid black; width: 60px;">&nbsp;&nbsp;&nbsp;&nbsp;</td>
                        <td id="target1y" style="border: 1px solid black; width: 60px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                        <td id="target1c" style="border: 1px solid black; width: 60px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                    </tr>
                    <tr id="targetrow2">
                        <td style="border: 1px solid black; width: 60px;">2</td>
                        <td id="target2x" style="border: 1px solid black; width: 60px;">&nbsp;&nbsp;&nbsp;&nbsp;</td>
                        <td id="target2y" style="border: 1px solid black; width: 60px;">&nbsp;&nbsp;&nbsp;&nbsp;</td>
                        <td id="target2c" style="border: 1px solid black; width: 60px;">&nbsp;&nbsp;&nbsp;&nbsp;</td>
                    </tr>
                    <tr id="targetrow3">
                        <td style="border: 1px solid black; width: 60px;">3</td>
                        <td id="target3x" style="border: 1px solid black; width: 60px;">&nbsp;</td>
                        <td id="target3y" style="border: 1px solid black; width: 60px;">&nbsp;</td>
                        <td id="target3c" style="border: 1px solid black; width: 60px;">&nbsp;</td>
                    </tr>
                </tbody>
            </table>
            <input type="hidden" id="cameraarguments" value="" style="width: 400px;" />
        </div>
    </div>
