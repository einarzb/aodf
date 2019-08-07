export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';

export const settingsChangedAction = (fieldKey, value, fieldName) => ({
    type: UPDATE_SETTINGS,
    data: {
      fieldKey,
      value,
      fieldName
     }
  })

export const FETCH_SETTINGS = 'FETCH_SETTINGS';

export const fetchSettingsAction = (res) => ({
  type:FETCH_SETTINGS,
  data: res
})

