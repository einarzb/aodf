import { UPDATE_SETTINGS, FETCH_SETTINGS, UPDATE_TIME } from '../actions/settings-actions';

const defaultState = {
    "Ntp_sync":"0","mac_address":"00:00:00:00:00:00","ip":"000.000.000.000","netmask":"000.000.000.000","gateway":"000.000.000.000","hostname":"...","time":new Date(Date.now()).toUTCString(),"repo_ip":"000.000.000.000","ntp_server":"...",
    "CUSTOMER_MAJOR_ID":"1","CUSTOMER_MINOR_ID":"0.1","EMS_MAJOR_ID":"EMS1","EMS_MINOR_ID":"33",
    "part_and_serial_numbers":{"aodf":{"serial":"02005","part":"AOD10005"},"robot":{"serial":"02005","part":"AOD10003"}}

};

let resState = {}
let time; 
export default function settingsReducer(state=defaultState, action){  
    switch (action.type) {
        case FETCH_SETTINGS:
          return fetchSettings(action.data);
        case UPDATE_SETTINGS:
          return checkSettings(state, action.data);
        case UPDATE_TIME:
          return updateTime(state, action);  
        case (! action.data || action.data == ''):
          return resState;  
        default:
          return state;  
      }
}

//fetch initial data from the API
function fetchSettings(data) {
  resState=data.res.settings;  
  return {...resState};
}

//push the new data for the view
function checkSettings (state, data){  
  state[data.fieldKey]=data.value;    
  return {...state};
}

function updateTime (state,data){
  console.log(state);
  console.log(data.time);
  console.log('yo');
  time = data.time;
  return {...time};
}