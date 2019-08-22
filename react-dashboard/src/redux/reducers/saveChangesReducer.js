import { UPDATE_SETTINGS, CLEAR_CACHE } from '../actions/settings-actions';

let unSavedChanges = [];

export default function saveChangesReducer(state=unSavedChanges, action){  
    switch (action.type) {
        case UPDATE_SETTINGS:
          return checkForChangesToSave(action.data).unSavedChanges;
        case CLEAR_CACHE:
          return clearCacheAfterSaving(state);  
        case (! action.data || action.data == ''):
            return state;  
        default:
          return state;  
      }
}

function checkForChangesToSave (data) {
    
  let alreadyChangedIndex = unSavedChanges.findIndex((e) => {
    return e.fieldKey === data.fieldKey
  });
  
  if (alreadyChangedIndex == -1) {
      unSavedChanges.push(data);      
  } else {
      unSavedChanges[alreadyChangedIndex] = {
        ...data
      }
  }  
  return {unSavedChanges}
}

//clear unSavedChanges after passcode modal is finished 
function clearCacheAfterSaving (state){ 
  unSavedChanges = [];
  state = unSavedChanges;  
  return {...state}
}