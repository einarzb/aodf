import { UPDATE_CALIBRATION } from '../actions/settings-actions';

let defaultState = {
  "plate_number":1,
  "sample":2
}

let confState = {}

export default function calibrationReducer(state=defaultState, action){  
    switch (action.type) {
        case UPDATE_CALIBRATION:
          return updateCalibrationSettings(action);
        case (! action.data || action.data == ''):
          return state;  
        default:
          return state;  
      }
}


//update initial data from the API
function updateCalibrationSettings(data) {  
   confState=data.data;  
   return {...confState};
 }
 