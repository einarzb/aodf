import React, { Component } from 'react';
import {connect } from 'react-redux';

import styled from 'styled-components';
import SettingsRow, {ConfigurationRow} from './SettingsRow';

// ACTIONS
import { settingsChangedAction } from '../redux/actions/settings-actions';

class ConfigurationsView extends React.Component{
    
    render(){
        let {onTimeChanged, onSettingChanged, unSavedChanges, settings, tryToSave} = this.props
        let currentSettings = settings;
        let {mac_address, part_and_serial_numbers} = currentSettings;

        return (
            <ConfigurationContainer tryToSave={this.tryToSave} 
            onTimeChanged={this.onTimeChanged}>
                <ConfigurationRow label={'MAC Address'} model={mac_address} />
                <ConfigurationRow label={'Robotic Part Number'} model={part_and_serial_numbers.robot.part} />
                <ConfigurationRow label={'Robotic Serial Number'} model={part_and_serial_numbers.robot.serial} onChange={part_and_serial_numbers =>{onSettingChanged('part_and_serial_numbers.robot.serial',part_and_serial_numbers.robot.serial,'Robotic Serial Number')}}/>

              </ConfigurationContainer>
          )
    }
}

//
const mapStateToProps = (state) => ({  
  settings:state.settingsReducer,
  unSavedChanges:state.saveChangesReducer
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

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (ConfigurationsView)


//inline style
const ConfigurationContainer = styled.div`
  display: flex;
  flex-direction:column;
  border-top: 1px gray solid;
  margin:1rem auto;
  width:75vw;
`;

