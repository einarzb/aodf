import { combineReducers } from "../../../node_modules/redux";

import settingsReducer from "./settingsReducer";
import saveChangesReducer from "./saveChangesReducer";
import rebootReducer from "./rebootReducer";
import configSettingsReducer from "./configSettingsReducer";
import saveConfigsReducer from "./saveConfigsReducer";

export default combineReducers({ 
  settingsReducer,
  saveChangesReducer,
  rebootReducer,
  configSettingsReducer,
  saveConfigsReducer
});
