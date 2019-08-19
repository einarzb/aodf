import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

//views
import SettingsView from './SettingsView';
import RebootView from './RebootView';

 class SettingsOrRebootView extends React.Component {
    constructor(props){
    super(props);
    //local state
    this.state = {
    settings:{...this.props.settings},
    showPasscodeModal:false,
    verifyPIN:"111111"
  };  
    }
      render(){
        let { showPasscodeModal } = this.state;
        return (
            <div>    
                {
                  this.props.rebootOngoing ?  
                  <RebootView reboot={this.reboot} toggle={this.toggleReboot} />         
                  :
                  <SettingsView tryToSave={this.tryToSave} dumpLogAndGetFile={this.dumpLogAndGetFile}
                  onTimeChanged={this.onTimeChanged} reboot={this.toggleReboot}
                  showPasscodeModal={showPasscodeModal} />

                }
          </div>
        )
    }
}

/*
const mapStateToProps = (state) => ({  
  settings:state.settingsReducer,
  unSavedChanges:state.saveChangesReducer,
  needReboot:state.rebootReducer.needReboot,
  rebootSafe:state.rebootReducer.rebootSafe
});


const mapDispatchToProps = (dispatch) => {
return {  
  onSettingChanged:(fieldKey, value, fieldName) => {
    dispatch(
      settingsChangedAction(fieldKey, value, fieldName)
    )
  }
}
};
*/
export default connect(
null,
null)
(SettingsOrRebootView)


