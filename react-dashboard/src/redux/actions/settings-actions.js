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