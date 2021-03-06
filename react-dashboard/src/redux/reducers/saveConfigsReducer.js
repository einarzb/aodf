import { UPDATE_CONFIG, CLEAR_CACHE } from '../actions/settings-actions';

let unSavedConfigChanges = [];

export default function saveConfigsReducer(state=unSavedConfigChanges, action){  
    switch (action.type) {
        case UPDATE_CONFIG:
          return checkForConfigChangesToSave(action.data).unSavedConfigChanges;
        case CLEAR_CACHE:
          return clearCache(state);    
        case (! action.data || action.data == ''):
            return state;  
        default:
          return state;  
      }
}


function checkForConfigChangesToSave (data) { 
  let alreadyChangedIndex = unSavedConfigChanges.findIndex((e) => {
    return e.fieldKey === data.fieldKey
  });
  
  if (alreadyChangedIndex == -1) {    
    unSavedConfigChanges.push(
      {
        ...data
      }
    );             
  } else {
    unSavedConfigChanges[alreadyChangedIndex] = {
      ...data
    }
  }    
  console.log('******* config changes ********');
  console.log(unSavedConfigChanges);
  console.log('***************');
  return {unSavedConfigChanges}
}

//clears array
function clearCache(state){
  unSavedConfigChanges = [];
  state = unSavedConfigChanges; 
  return {...state}
}