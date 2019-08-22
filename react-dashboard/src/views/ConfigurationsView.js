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
        let {mac_address, part_and_serial_numbers, optic_cable_list, temp} = currentSettings;

        return (

              <ConfigurationContainer tryToSave={this.tryToSave}>
                  <ConfigurationRow label={'MAC Address'} model={mac_address} />
                  <ConfigurationRow label={'Robotic Part Number'} model={part_and_serial_numbers.robot.part} />
                  <ConfigurationRow label={'Robotic Serial Number'} model={part_and_serial_numbers.robot.serial} />
                  <ConfigurationRow label={'Optical Part number'} model={part_and_serial_numbers.aodf.part} />
                  <ConfigurationRow label={'Optical Serial number'} model={part_and_serial_numbers.aodf.serial} />
                  <ConfigurationRow label={'Plate Fiber Optic Cable'} model={optic_cable_list.plates_fiber_optic_cable.model} />
                  <ConfigurationRow label={'Reels Fiber Optic Cable'} model={optic_cable_list.reels_fiber_optic_cable.model} />
                  <ConfigurationRow label={'High temp Range'} model={temp.aodf.high} /> 
                  <ConfigurationRow label={'low temp Range'} model={temp.aodf.low} />
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


const mapStateToProps = (state) => ({
    settings:state.configSettingsReducer,
    unSavedChanges:state.saveChangesReducer
});


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

