export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';

export const settingsChangedAction = (fieldKey, value, fieldName) => ({
    type: UPDATE_SETTINGS,
    data: {
      fieldKey,
      value,
      fieldName
     }
  })

