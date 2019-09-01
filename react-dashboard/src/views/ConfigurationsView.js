import React, { Component } from 'react';
import {connect } from 'react-redux';

import styled from 'styled-components';
import SettingsRow, {ConfigurationRow} from './SettingsRow';
import {ButtonsRow, BigButt} from './styled';
import PasscodeModal from './PasscodeModal';
import { ModalBG, myTheme } from './styled';

// ACTIONS
import { MicroApi } from '../micro-api';
import {  configSettingsChangedAction, updateTimeInStateAction, fetchConfigSettingsAction, savePasscodeModelAction } from '../redux/actions/settings-actions';

//const Greeting = () => <h1>Hello World today!</h1>;

class ConfigurationsView extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        configs:{...this.props.configs}
      }

    }
      //local
  tryToSave = () => {  
    console.log('trying to save in config');
    
    let {sendPCMToRedux} = this.props;
    let showPasscodeModal = !this.props.showPasscodeModal; //true local for view
    console.log(showPasscodeModal);
    
    sendPCMToRedux(showPasscodeModal)
  }

    componentDidMount(){
      this.refreshData();
     
      setInterval(() => {
        let { updateTimeInState } = this.props;
       
        MicroApi.getDate().then(res => {     
          let updatedState = {...this.props.configs, time:res.date};                            
          updateTimeInState(updatedState);             
        })
  
      }, 10*1000);
    }

    refreshData = () => {
       let { sendConfigSettingToRedux } = this.props;
    
        MicroApi.getConfigSettings().then((res) => {
          //console.log(res);
          
        //concating data
        let mac_address = res.config_settings.mac_address;
        let plates_fiber_optic_cable_model = res.config_settings.optic_cable_list.plates_fiber_optic_cable.model;
        let reels_fiber_optic_cable_model = res.config_settings.optic_cable_list.reels_fiber_optic_cable.model;
        let part_and_serial_numbers_aodf_part = res.config_settings.part_and_serial_numbers.aodf.part;
        let part_and_serial_numbers_aodf_serial = res.config_settings.part_and_serial_numbers.aodf.serial;
        let part_and_serial_numbers_robot_part = res.config_settings.part_and_serial_numbers.robot.part;
        let part_and_serial_numbers_robot_serial = res.config_settings.part_and_serial_numbers.robot.serial;
        let temp_aodf_high = res.config_settings.temp.aodf.high;
        let temp_aodf_low = res.config_settings.temp.aodf.low;

 
        //runover
        res.config_settings = {
          mac_address:mac_address,
          plates_fiber_optic_cable_model:plates_fiber_optic_cable_model,
          reels_fiber_optic_cable_model:reels_fiber_optic_cable_model,
          part_and_serial_numbers_aodf_part:part_and_serial_numbers_aodf_part,
          part_and_serial_numbers_aodf_serial:part_and_serial_numbers_aodf_serial,
          part_and_serial_numbers_robot_part:part_and_serial_numbers_robot_part,
          part_and_serial_numbers_robot_serial:part_and_serial_numbers_robot_serial,
          temp_aodf_high:temp_aodf_high,
          temp_aodf_low:temp_aodf_low
        }              
          sendConfigSettingToRedux(res.config_settings);
        });
     }

    render(){
        let { onSettingChanged, unSavedChanges, configs} = this.props
        let currentConfigs = configs;
        let {mac_address, plates_fiber_optic_cable_model, reels_fiber_optic_cable_model, part_and_serial_numbers_aodf_part, part_and_serial_numbers_aodf_serial, part_and_serial_numbers_robot_part, part_and_serial_numbers_robot_serial, temp_aodf_high, temp_aodf_low} = currentConfigs;


        return (

              <ConfigurationContainer
              >
               {/**  <Greeting />*/}
                  <ConfigurationRow label={'MAC Address'} model={mac_address} />
        
                   <ConfigurationRow 
                        label={'Robotic Part number'} 
                        model={part_and_serial_numbers_robot_part} 
                        onChange={val =>{
                          onSettingChanged(
                            'part_and_serial_numbers_robot_part',
                            val,
                            'Robotic Part number')}}
                        />
                 
                    <ConfigurationRow 
                    label={'Robotic Serial number'} 
                    model={part_and_serial_numbers_robot_serial} 
                    onChange={val => { 
                      onSettingChanged('part_and_serial_numbers_robot_serial',val,'Robotic Serial number')}}/>
                

                    <ConfigurationRow label={'Optical Part number'} model={part_and_serial_numbers_aodf_part} onChange={val =>{onSettingChanged('part_and_serial_numbers_aodf_part',val,'Optical Part number')}}/>

                    <ConfigurationRow label={'Optical Serial number'} model={part_and_serial_numbers_aodf_serial} onChange={val =>{onSettingChanged('part_and_serial_numbers_aodf_serial',val,'Optical Serial number')}}/>
                  
                    <ConfigurationRow label={'Plate Fiber Optic Cable'} model={plates_fiber_optic_cable_model} onChange={v=>{onSettingChanged('plates_fiber_optic_cable_model',v,'Plate Fiber Optic Cable')}} />

                    <ConfigurationRow 
                    label={'Reels Fiber Optic Cable'} 
                    model={reels_fiber_optic_cable_model}  
                    onChange = {
                      optic_cable_list => { 
                        onSettingChanged(
                          'reels_fiber_optic_cable_model',
                          optic_cable_list,
                          'Reels Fiber Optic Cable'
                          )}}
                    />

                    <ConfigurationRow label={'Temperature Range'} />

                    <ConfigurationRow 
                    label={'High'} isIp={false}
                    model={temp_aodf_high} 
                    onChange={temp =>{onSettingChanged('temp_aodf_high',temp,'Temperature Range High')}
                  }
                    /> 

                    <ConfigurationRow label={'Low'} model={temp_aodf_low} onChange={temp =>{onSettingChanged('temp_aodf_low',temp,'Temperature Range Low')}} />
                   
                    <ConfigurationRow label={'Module ID Number'} />
                    
                    <ButtonsRow>
                          {
                            (unSavedChanges.length > 0) &&
                            <BigButt onClick={this.tryToSave} label={'SAVE'}></BigButt>
                          }
                    </ButtonsRow>
           </ConfigurationContainer>
          )
    }
}


const mapStateToProps = (state) => {
  let props = {
    configs:state.configSettingsReducer,
    unSavedChanges:state.saveConfigsReducer,
    showPasscodeModal:state.rebootReducer.showPasscodeModal
  }
  
  console.log('-----im props of config view:-----');
  console.log(props);
  console.log('--------------');
    return props;
};


const mapDispatchToProps = (dispatch) =>({
    sendConfigSettingToRedux:(res) => dispatch(fetchConfigSettingsAction(res)),
    onSettingChanged:(fieldKey, value, fieldName) => dispatch(configSettingsChangedAction(fieldKey, value, fieldName)),
    updateTimeInState: (res) => dispatch(updateTimeInStateAction(res)),
    sendPCMToRedux:(showPasscodeModal) => dispatch(savePasscodeModelAction(showPasscodeModal))
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

