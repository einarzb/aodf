import React, { Component } from 'react';
import styled from 'styled-components';
import SettingsRow, {ConfigurationRow} from '../SettingsRow';
import {connect } from 'react-redux';

class ConfigurationsView extends React.Component{
    
    render(){
        let {onTimeChanged, onSettingChanged, unSavedChanges, settings, tryToSave} = this.props
        let currentSettings = settings;
        let {mac_address, part_and_serial_numbers} = currentSettings;

        return (<ConfigurationContainer>
                <ConfigurationRow label={'MAC Address'} model={mac_address} />
                <ConfigurationRow label={'Robotic Part Number'} model={part_and_serial_numbers.robot.part} />
                <ConfigurationRow label={'Robotic Serial Number'} model={part_and_serial_numbers.robot.serial} onChange={part_and_serial_numbers =>{onSettingChanged('part_and_serial_numbers.robot.serial',part_and_serial_numbers.robot.serial,'Robotic Serial Number')}}/>

              </ConfigurationContainer>
          )
    }
}

const mapStateToProps = (state) => {
  return {
    settings:{...state.machine}
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    changeDataToEinar:()=>dispatch({type:'name', 'data':'Einar'})
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(ConfigurationsView)


const ConfigurationContainer = styled.div`
  display: flex;
  flex-direction:column;
  border-top: 1px gray solid;
  margin:1rem auto;
  width:75vw;
`;

