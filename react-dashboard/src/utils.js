/*
SPEC:
As long as the test routine is not running all indicators have dark color (gray) and start
button also colored by light gray.

//TODO: CHANGE BTN to GRAY too 
// WHEN pressed change to green 

• Push on start button to lunch the test routine and make change start button color (to
green) as long as the test routine is running. (it should run few seconds ~30)

• While the test routine is running it return limit switch status by ‘1’ and ‘0’.

• If limit switch status = ‘1’ make the LED indicator Red.

If limit switch status = ‘0’ make the LED indicator Green.

• Once the routine stops running color the start button by light gray and indicators by
dark color (gray)

*/
export function ledsIndicators (ledColor){  
  switch(ledColor){
    case "0":
       ledColor = "#7CFC00";
       break;
    case "1":
       ledColor = "#B22222";
       break;
    default:
      ledColor = "#D3D3D3";  
  }
  return ledColor;
}
