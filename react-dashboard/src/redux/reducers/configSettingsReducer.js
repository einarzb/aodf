import { FETCH_CONFIG, UPDATE_CONFIG } from '../actions/settings-actions';

let defaultState = {
  "mac_address":"00:00:00:00:00:00",
  "part_and_serial_numbers_aodf_part":"AOD10005",
  "part_and_serial_numbers_aodf_serial":"02005",
  "part_and_serial_numbers_robot_part":"AOR10004",
  "part_and_serial_numbers_robot_serial":"0032",
  "plates_fiber_optic_cable_model":"FBR00007-12",
  "reels_fiber_optic_cable_model":"FBR00013",
  "temp_aodf_high":"20",
  "temp_aodf_low":"0"
}

let confState = {}

export default function configSettingsReducer(state=defaultState, action){  
    switch (action.type) {
        case FETCH_CONFIG:
          return fetchConfigSettings(action);
        case UPDATE_CONFIG:
          return checkConfigs(state, action.data);  
        case (! action.data || action.data == ''):
          return state;  
        default:
          return state;  
      }
}

//fetch initial data from the API
function fetchConfigSettings(data) {  
 // console.log(data.data.res);
  confState=data.data.res;  
  return {...confState};
}

//push the new data for the view
function checkConfigs (state, data){  
   state[data.fieldKey]=data.value;
   return {...state};
  }


