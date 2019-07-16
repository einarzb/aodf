<script type="text/javascript" >
    $(document).ready(function(){
        runner.rungetoutput('temprature','temperatureoutput');
    });
</script>
  <div style='float:left'>
  <br/>
  <br/>
  <table>
       <tr>
         <td>
             Temperature:
         </td>
         <td>
             <input id="temperatureoutput" value="" readonly="readonly"/>
         </td>
         <td>
             <input id="temperaturerefresh" type="button" value="Refresh"
              onclick="runner.rungetoutput('temprature','temperatureoutput');"/>
         </td>
       </tr>
  </table>
  </div>
