export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';
export const settingsChangedAction = (fieldKey, value, fieldName) => ({
    type: UPDATE_SETTINGS,
    data: {
      fieldKey,
      value,
      fieldName
     }
  });

export const FETCH_SETTINGS = 'FETCH_SETTINGS';
export const fetchSettingsAction = (res) => ({
  type: FETCH_SETTINGS,
  data: {
    res
  }  
});

export const UPDATE_TIME = 'UPDATE_TIME';
export const timeChangedAction = (time) => ({
  type: UPDATE_TIME,
  data: {
    time
  }
});

export const UPDATE_STATE = 'UPDATE_STATE';
export const updateTimeInStateAction = (res) => ({
  type: UPDATE_STATE,
  settings: {...res},
  time: res.time
});


export const CHECK_SWITCHES = 'CHECK_SWITCHES';
export const checkSwitchesAction = (res) => ({
  type: CHECK_SWITCHES,
  data: {
    res
  }  
});

export const SWITCH_PINGER = 'SWITCH_PINGER';

export const CLEAR_CACHE = 'CLEAR_CACHE';
export const clearUnSavedChangesAction = (fieldKey, value, fieldName) => ({
  type: CLEAR_CACHE,
  data: {
    fieldKey,
    value,
    fieldName
   }
});

export const TOGGLE_REBOOT = 'TOGGLE_REBOOT';
export const toggleRebootAction = (data) => ({
  type: TOGGLE_REBOOT,
  data: {
    data
   }
});

// configuration screen 

export const FETCH_CONFIG = 'FETCH_CONFIG';
export const fetchConfigSettingsAction = (res) => ({
  type: FETCH_CONFIG,
  data: {
    res
  }  
});

export const UPDATE_CONFIG = 'UPDATE_CONFIG';
export const configSettingsChangedAction = (fieldKey, value, fieldName) => ({
    type: UPDATE_CONFIG,
    data: {
      fieldKey,
      value,
      fieldName
     }
  });

//save btn 
export const SAVE_SETTINGS = 'SAVE_SETTINGS';
export const savePasscodeModelAction = (res) => ({
  type: SAVE_SETTINGS,
  data: {
    res
  }  
});

export const UPDATE_CALIBRATION = 'UPDATE_CALIBRATION';
export const calibrationSettingsChangedAction = (fieldKey, value, fieldName) => ({
    type: UPDATE_CALIBRATION,
    data: {
      fieldKey,
      value,
      fieldName
     }
  });
