import { UPDATE_CALIBRATION } from '../actions/settings-actions';

let unSavedCalibrationChanges = [];

export default function calibrationReducer(state=unSavedCalibrationChanges, action){  
    switch (action.type) {
        case UPDATE_CALIBRATION:
          return checkForConfigChangesToSave(action.data);
        case (! action.data || action.data == ''):
          return state;  
        default:
          return state;  
      }
}


//update initial data from the API
/*
function updateCalibrationSettings(data) {  
   confState=data.data;  
   return {...confState};
 }
 */

 function checkForConfigChangesToSave (data) { 
  let alreadyChangedIndex = unSavedCalibrationChanges.findIndex((e) => {
    return e.fieldKey === data.fieldKey
  });
  
  if (alreadyChangedIndex == -1) {    
    unSavedCalibrationChanges.push(
      {
        ...data
      }
    );             
  } else {
    unSavedCalibrationChanges[alreadyChangedIndex] = {
      ...data
    }
  }    
  console.log('******* calibration changes ********');
  console.log(unSavedCalibrationChanges);
  console.log('***************');
  return {unSavedCalibrationChanges}
}