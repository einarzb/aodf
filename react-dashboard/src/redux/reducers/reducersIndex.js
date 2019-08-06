import { combineReducers } from "redux";
import settingsReducer from "./settingsReducer";
import saveChangesReducer from "./saveChangesReducer";

export default combineReducers({ 
  settingsReducer,
  saveChangesReducer
});
