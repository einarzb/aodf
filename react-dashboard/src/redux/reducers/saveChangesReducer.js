import { UPDATE_SETTINGS } from '../actions/settings-actions';

let unSavedChanges = [];

export default function saveChangesReducer(state=unSavedChanges, action){  
    switch (action.type) {
        case UPDATE_SETTINGS:
          return checkForChangesToSave(action.data).unSavedChanges;
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
  console.log('******* setings changes ********');
  console.log(unSavedChanges);
  console.log('***************');
  return {unSavedChanges}
}
