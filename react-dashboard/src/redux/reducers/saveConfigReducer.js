import { UPDATE_CONFIG, CLEAR_CACHE } from '../actions/settings-actions';

let unSavedConfigChanges = [];

export default function saveConfigReducer(state=unSavedConfigChanges, action){  
    switch (action.type) {
        case UPDATE_CONFIG:
          return checkForConfigChangesToSave(action.data).unSavedConfigChanges;
        case (! action.data || action.data == ''):
            return state;  
        default:
          return state;  
      }
}

function checkForConfigChangesToSave (data) { //(fieldKey,value ,fieldName) 
   //console.log(data);
    
  let alreadyChangedIndex = unSavedConfigChanges.findIndex((e) => {
    return e.fieldKey === data.fieldKey
  });
  
  if (alreadyChangedIndex == -1) {    
    unSavedConfigChanges.push(
      {
        ...data
      }
    );      
    //console.log(unSavedConfigChanges); 
       
  } else {
    unSavedConfigChanges[alreadyChangedIndex] = {
      ...data
    }
  }  
 // console.log(unSavedConfigChanges);
  
  return {unSavedConfigChanges}
}

/*
 // tryToSave = (fieldName, value, method)=>{
  //   this.setState({showPasscodeModal:true, tryingToSave:{fieldName,value,method}})
  // }
  onSettingChanged = (fieldKey,value ,fieldName) =>{
      
    if (! value || value == ''){
      return;
    }  
    let { unSavedChanges, settings } = this.state;

    let alreadyChangedIndex = unSavedChanges.findIndex((e) => {return e.fieldKey === fieldKey})
    if (alreadyChangedIndex == -1) {
      unSavedChanges.push({
          fieldName,
          fieldKey,
          value
        } )
    }else{
      unSavedChanges[alreadyChangedIndex] = {
          fieldName,
          fieldKey,
          value
        }
    }
    settings[fieldKey] = value
    this.setState({settings:{...settings}}, ()=>{
      console.log(this.state);
      
    })
    
  }
*/

/*
//clear unSavedChanges after passcode modal is finished 
function clearCacheAfterSaving (state){ 
  unSavedConfigChanges = [];
  state = unSavedConfigChanges;  
  return {...state}
}*/