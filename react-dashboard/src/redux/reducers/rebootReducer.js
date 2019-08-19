import { FETCH_SETTINGS , CHECK_SWITCHES, SWITCH_PINGER} from '../actions/settings-actions';

let needReboot = false;
let rebootSafe = false; 
let checkingSwitches = false;
let rebootOngoing = false;

let initState = {
  needReboot:needReboot, 
  rebootSafe:rebootSafe,
  checkingSwitches:checkingSwitches,
  rebootOngoing:rebootOngoing
}

export default function rebootReducer (state=initState, action){            
    switch (action.type) {
         case FETCH_SETTINGS:
           return fetchRebootStatus (action.data);
         case SWITCH_PINGER:
           return switchPinger();
         case CHECK_SWITCHES:
           return checkSwitchesStatus (action.data);
         case (! action.data || action.data == ''):
           return initState;  
         default:          
          return initState;  
      }
}

//fetch reboot status from API
function fetchRebootStatus (data) {    
  initState.needReboot=data.res.need_reboot;  
  return {...initState};
}

//check switches and change flags if needed to reboot 
function checkSwitchesStatus(data){  
  if (data.res.indexOf('switch') !== -1){
     initState.rebootSafe = false;
  } else {
    initState.rebootSafe = true;
    initState.checkingSwitches = false;
  }
  return {...initState}
  }

  // turn checkingSwitches from false to true
  function switchPinger(){
    console.log('im invoked');
    console.log(initState.checkingSwitches);
    initState.checkingSwitches = true;
    console.log(initState.checkingSwitches);
    return {...initState}
  }