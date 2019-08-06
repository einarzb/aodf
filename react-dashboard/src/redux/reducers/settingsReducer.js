import { UPDATE_SETTINGS } from '../actions/settings-actions';

//dummy data --- > remove this and call get_settings api 
//https://82.81.211.231:10561/api.php?functionname=get_settings 
const defaultState = {
    "Ntp_sync":"0","mac_address":"00:00:00:00:00:00","ip":"000.000.000.000","netmask":"000.000.000.000","gateway":"000.000.000.000","hostname":"...","time":new Date(Date.now()).toUTCString(),"repo_ip":"000.000.000.000","ntp_server":"...",
    "CUSTOMER_MAJOR_ID":"1","CUSTOMER_MINOR_ID":"0.1","EMS_MAJOR_ID":"EMS1","EMS_MINOR_ID":"33",
    "part_and_serial_numbers":{"aodf":{"serial":"02005","part":"AOD10005"},"robot":{"serial":"02005","part":"AOD10003"}}

};


export default function settingsReducer(state, action){  
    switch (action.type) {
        case UPDATE_SETTINGS:
          return checkSettings(state, action.data);
        case (! action.data || action.data == ''):
          return defaultState;  
        default:
          return defaultState;  
      }
}

//push the new data for the view
function checkSettings (state, data){
    state[data.fieldKey]=data.value;    
    return {...state};
}