import { FETCH_CONFIG } from '../actions/settings-actions';
 
const defaultState = {
  "mac_address":"00:00:00:00:00:00",
  "part_and_serial_numbers":{
    "aodf":{"serial":"02005","part":"AOD10005"},
    "robot":{"serial":"0032","part":"AOR10004"}
  },
  "temp":{
    "aodf":{"high":"50","low":"0"}
  },
  "optic_cable_list":{
    "plates_fiber_optic_cable":{"model":"FBR00007-12"},
    "reels_fiber_optic_cable":{"model":"FBR00013"}
  }
}

let resState = {}

export default function configSettingsReducer(state=defaultState, action){  
    switch (action.type) {
        case FETCH_CONFIG:
          return fetchConfigSettings(action.data);
        case (! action.data || action.data == ''):
          return state;  
        default:
          return state;  
      }
}

//fetch initial data from the API
function fetchConfigSettings(data) {  
  resState=data.res;  
  return {...resState};
}

//check if update settting will work here without writing another 