import { UPDATE_SETTINGS } from '../actions/settings-actions';

const unSavedChanges = [];

export default function saveChangesReducer(state, action){  

    switch (action.type) {
        case UPDATE_SETTINGS:
          return checkForChangesToSave(action.data).unSavedChanges;
        case (! action.data || action.data == ''):
            return unSavedChanges;  
        default:
          return unSavedChanges;  
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