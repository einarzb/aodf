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
     console.log('yo');
     console.log(this.props);
     

    }
      render(){
        let { showPasscodeModal, rebootOngoing } = this.props;
        return (
          <div>    
              { // if true than it presented 
                rebootOngoing 
                ?  
                <RebootView 
                  reboot={this.reboot} 
                  toggle={this.toggleReboot} 
                />         
                :
                <SettingsView 
                  tryToSave={this.tryToSave} 
                  dumpLogAndGetFile={this.dumpLogAndGetFile}
                  reboot={this.toggleReboot} onTimeChanged={this.onTimeChanged}
                  showPasscodeModal={showPasscodeModal} 
                />
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


