<script type="text/javascript">
  $(document).ready(led_update);
</script>
<div style='float:left; line-height:230%;'>
      <br/>
      <br/><label style="position:absolute; left:30px;">microswitch 1</label>
      <input id="micro1" name="micro1" class="micro" type="button" value="" style="position:absolute; left:165px;WIDTH:50px;HEIGHT:35px;" onclick="set_led('1');"/>
      <label style="position:absolute; left:250px;">LED 1</label>
      <img id="led1" alt="led1" style="position:absolute; left:300px; WIDTH:25px;vertical-align: middle;" src="/images/off.gif"/>
      <br/><label style="position:absolute; left:30px;">microswitch 2</label>
      <input id="micro2" name="micro2" class="micro" type="button" value="" style="position:absolute; left:165px;WIDTH:50px;HEIGHT:35px;" onclick="set_led('2');"/>
      <label style="position:absolute; left:250px;">LED 2</label>
      <img id="led2" alt="led2" style="position:absolute; left:300px; WIDTH:25px;vertical-align: middle;" src="/images/off.gif"/>
      <br/><label style="position:absolute; left:30px;">microswitch 3</label>
      <input id="micro3" name="micro3" class="micro" type="button" value="" style="position:absolute; left:165px;WIDTH:50px;HEIGHT:35px;" onclick="set_led('3');"/>
      <label style="position:absolute; left:250px;">LED 3</label>
      <img id="led3" alt="led3" style="position:absolute; left:300px; WIDTH:25px;vertical-align: middle;" src="/images/off.gif"/>
      <br/><label style="position:absolute; left:30px;">Panel Interface</label>
      <input id="micro4" name="micro4" class="micro" type="button" value="" style="position:absolute; left:165px;WIDTH:50px;HEIGHT:35px;" onclick="set_led('4');"/>
      <label style="position:absolute; left:250px;">LED 4</label>
      <img id="led4" alt="led4" style="position:absolute; left:300px; WIDTH:25px;vertical-align: middle;" src="/images/off.gif"/>
      <br/><label style="position:absolute; left:30px;">Lower Stage Driver</label>
      <input id="micro5" name="micro5" class="micro" type="button" value="" style="position:absolute; left:165px;WIDTH:50px;HEIGHT:35px;" onclick="set_led('5');"/>
      <label style="position:absolute; left:250px;">LED 5</label>
      <img id="led5" alt="led5" style="position:absolute; left:300px; WIDTH:25px;vertical-align: middle;" src="/images/off.gif"/>
      <br/><label style="position:absolute; left:30px;">Camera Leds-</label>
      <input id="micro6" name="micro6" class="micro" type="button" value="" style="position:absolute; left:165px;WIDTH:50px;HEIGHT:35px;" onclick="set_led('6');"/>
      <label style="position:absolute; left:250px;">LED 6</label>
      <img id="led6" alt="led6" style="position:absolute; left:300px; WIDTH:25px;vertical-align: middle;" src="/images/off.gif"/>
      <br/><label style="position:absolute; left:30px;">Upper Stage Driver </label>
      <input id="micro7" name="micro7" class="micro" type="button" value="" style="position:absolute; left:165px;WIDTH:50px;HEIGHT:35px;" onclick="set_led('7');"/>
      <label style="position:absolute; left:250px;">LED 7</label>
      <img id="led7" alt="led7" style="position:absolute; left:300px; WIDTH:25px;vertical-align: middle;" src="/images/off.gif"/>
      <br/><label style="position:absolute; left:30px;">microswitch 8</label>
      <input id="micro8" name="micro8" class="micro" type="button" value="" style="position:absolute; left:165px;WIDTH:50px;HEIGHT:35px;" onclick="set_led('8');"/>
      <label style="position:absolute; left:250px;">LED 8</label>
      <img id="led8" alt="led8" style="position:absolute; left:300px; WIDTH:25px;vertical-align: middle;" src="/images/off.gif"/>
      <br/><br/>
      <input id="updateio" name="updateio" type="button" value="UPDATE" style="WIDTH:200px;HEIGHT:35px;margin-left:80px" onclick="led_update();"/>

</div>
