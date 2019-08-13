import { combineReducers } from "redux";

import settingsReducer from "./settingsReducer";
import saveChangesReducer from "./saveChangesReducer";
import rebootReducer from "./rebootReducer";

export default combineReducers({ 
  settingsReducer,
  saveChangesReducer,
  rebootReducer
});
