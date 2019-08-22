import { FETCH_CONFIG } from '../actions/settings-actions';
//problem is it's empty to begin with so needs to do some dummy text 

let resState = {}

export default function configSettingsReducer(state=resState, action){  
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
