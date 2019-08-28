import { SAVE_SETTINGS } from '../actions/settings-actions';

let showPasscodeModal = false;

let initState = {
  showPasscodeModal:showPasscodeModal
}


export default function saveConfigsReducer(state=initState, action){  
    switch (action.type) {
        case SAVE_SETTINGS:
           return saveConfigChanges(action.data);     
        case (! action.data || action.data == ''):
          return state;  
        default:
          return state;  
      }
}

function saveConfigChanges (data) {
  initState.showPasscodeModal = data.res;
  return {...initState}
}
