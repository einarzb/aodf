import React, { Component } from 'react';
import {connect } from 'react-redux';

import styled from 'styled-components';
import SettingsRow, {ConfigurationRow} from './SettingsRow';
import {ButtonsRow, BigButt} from './styled';

// ACTIONS
import { MicroApi } from '../micro-api';

import { fetchConfigSettingsAction, settingsChangedAction } from '../redux/actions/settings-actions';

class ConfigurationsView extends React.Component {
    constructor(props){
      super(props);

    }
    componentDidMount(){
      this.refreshData();
    }

    refreshData = () => {
       let { sendConfigSettingToRedux } = this.props;
    
        MicroApi.getConfigSettings().then((res) => {
          sendConfigSettingToRedux(res.config_settings);
        });
     }

    render(){
        let { onSettingChanged, unSavedChanges, settings, tryToSave} = this.props
        let currentSettings = settings;
        let {mac_address, part_and_serial_numbers, optic_cable_list, temp, hostname} = currentSettings;

        return (

              <ConfigurationContainer tryToSave={this.tryToSave}>

                  <ConfigurationRow label={'MAC Address'} model={mac_address} />
              
    
                   <ConfigurationRow label={'Robotic Part number'} model={part_and_serial_numbers.robot.part} onChange={part_and_serial_numbers =>{onSettingChanged('part_and_serial_numbers.robot.part',part_and_serial_numbers,'part_and_serial_numbers.robot.part')}}/>
                 
                     <ConfigurationRow label={'Robotic Serial number'} model={part_and_serial_numbers.robot.serial} onChange={part_and_serial_numbers =>{onSettingChanged('part_and_serial_numbers.robot.serial',part_and_serial_numbers,'part_and_serial_numbers.robot.serial')}}/>
                 

                   <ConfigurationRow label={'Optical Part number'} model={part_and_serial_numbers.aodf.part} onChange={part_and_serial_numbers =>{onSettingChanged('part_and_serial_numbers.aodf.part',part_and_serial_numbers,'part_and_serial_numbers.aodf.part')}}/>

                  <ConfigurationRow label={'Optical Serial number'} model={part_and_serial_numbers.aodf.serial} onChange={part_and_serial_numbers =>{onSettingChanged('part_and_serial_numbers.aodf.serial',part_and_serial_numbers,'part_and_serial_numbers.aodf.serial')}}/>
                 
                  <ConfigurationRow label={'Plate Fiber Optic Cable'} model={optic_cable_list.plates_fiber_optic_cable.model} onChange={optic_cable_list =>{onSettingChanged('optic_cable_list.plates_fiber_optic_cable.model',optic_cable_list,'optic_cable_list.plates_fiber_optic_cable.model')}} />

                  <ConfigurationRow label={'Reels Fiber Optic Cable'} model={optic_cable_list.reels_fiber_optic_cable.model} onChange={optic_cable_list =>{onSettingChanged('optic_cable_list.reels_fiber_optic_cable.model',optic_cable_list,'optic_cable_list.reels_fiber_optic_cable.model')}}/>

                  <ConfigurationRow label={'Temperature Range'} />
                  <ConfigurationRow label={'High'} model={temp.aodf.high} onChange={temp =>{onSettingChanged('temp.aodf.high',temp,'temp.aodf.high')}}/>
                  <ConfigurationRow label={'Low'} model={temp.aodf.low} onChange={temp =>{onSettingChanged('temp.aodf.low',temp,'temp.aodf.low')}} />
                  <ConfigurationRow label={'Module ID Number'} />
                    
                  <ButtonsRow>
                        {
                          (unSavedChanges.length > 0) &&
                          <BigButt onClick={tryToSave} label={'SAVE'}></BigButt>
                        }
                  </ButtonsRow>
           </ConfigurationContainer>
          )
    }
}


const mapStateToProps = (state) => {
  let props = {
    settings:state.configSettingsReducer,
    unSavedChanges:state.saveChangesReducer
  }
    console.log(props);
    return props;
};


const mapDispatchToProps = (dispatch) =>({
    sendConfigSettingToRedux:(res) => dispatch(fetchConfigSettingsAction(res)),
    onSettingChanged:(fieldKey, value, fieldName) => dispatch(settingsChangedAction(fieldKey, value, fieldName))
});

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

