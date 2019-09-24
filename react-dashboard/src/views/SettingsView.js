import React, { Component } from 'react';
import { connect } from 'react-redux';

import styled from 'styled-components';
import SettingsRow, {SettingsIDRow, SettingsNTPSyncRow, SettingsDownloadRow, HalfRow} from './SettingsRow';
import SettingsDateRow from './SettingsDateRow';
import { FormContainer, ButtonsRow, BigButt, Spacer, AlertButton } from './styled';
import RebootView from './RebootView';

// ACTIONS
import { MicroApi } from '../micro-api';
import { settingsChangedAction, savePasscodeModelAction, toggleRebootAction, fetchSettingsAction, updateTimeInStateAction } from '../redux/actions/settings-actions';

class SettingsView extends React.Component {
  constructor(props){
    super(props);
    this.logRef = React.createRef();
    this.state = {
      settings:{...this.props.settings}
    };        
  }

  componentDidMount(){
    this.refreshData();  
   
    setInterval(() => {
      let { updateTimeInState } = this.props;
     
      MicroApi.getDate().then(res => {             

        let updatedState = {...this.props.settings, time:res.date};      
        /*
        console.log('---------');  
        console.log(updatedState);
        console.log('im updated state');
        console.log('---------');
*/
        updateTimeInState(updatedState);             
      })

    }, 10*1000);
   }

  refreshData = () => {            
    let { sendResToRedux } = this.props;
    
    //get settings
    MicroApi.getSettings().then((res) => {
      sendResToRedux(res);
    });
}  
  
  dumpLogAndGetFile = ()=>{
    MicroApi.dumpLog().then(()=>{
      // after refreshing log on machine, programatically press link
      this.logRef.current.click();
    })
  }

  tryToSave = () => {  
    let {sendPCMToRedux} = this.props;
    let showPasscodeModal = !this.props.showPasscodeModal; //true local for view
    sendPCMToRedux(showPasscodeModal)
  }

  toggleReboot = () => {           
    let { toggleRebootRedux } = this.props; 
    let rebootOngoing = !this.props.rebootOngoing; 
    toggleRebootRedux(rebootOngoing);
  }
  
  onTimeChanged = (time)=>{    
    console.log(time)    
    MicroApi.setDate(time).then(()=>{
      this.refreshData();
    }).catch(()=>{
      this.refreshData();
    });
  }

    render(){
        let { onSettingChanged, unSavedChanges, settings, tryToSave, needReboot, rebootSafe, rebootOngoing } = this.props
        let currentSettings = settings;
        let {ntp_sync, ip, netmask , mac_address, gateway, time, 
            hostname, repo_ip, ntp_server, part_and_serial_numbers, 
            EMS_MAJOR_ID, EMS_MINOR_ID, CUSTOMER_MAJOR_ID, CUSTOMER_MINOR_ID } = currentSettings;
    
        return (
          <div>
          { 
            rebootOngoing 
            ?
            <RebootView reboot={this.toggleReboot} /> 
            : 
             <FormContainer>  
                <ButtonsRow>
                  {
                    (unSavedChanges.length > 0) &&
                    <BigButt onClick={this.tryToSave} label={'SAVE'}></BigButt>
                  }
                  <Spacer></Spacer>
                  {
                    (needReboot && rebootSafe ) && 
                    <AlertButton onClick={this.toggleReboot} label={'REBOOT'}></AlertButton>}
                    {
                    (needReboot &&  !rebootSafe) && 
                    <BigButt disabled={true} label={'REBOOT NEEDED BUT SWITCHES ARE IN PROGRESS'}></BigButt>}
                  
                </ButtonsRow>
                <SettingsRow label={'MAC Address'} model={mac_address} />
                <SettingsRow isIp={true} label={'IP Address'} model={ip}  
                  onChange={ip =>{onSettingChanged('ip',ip,'IP Address')}} />
                <SettingsRow isIp={true} label={'NETMASK'} model={netmask} onSave={v=>{tryToSave('NETMASK',netmask,'set_mask')}} 
                  onChange={netmask =>{onSettingChanged('netmask',netmask,'NETMASK')}}  />
                <SettingsRow isIp={true} label={'GATEWAY'} model={gateway} onSave={v=>{tryToSave('GATEWAY',gateway,'set_gateway')}} 
                  onChange={gateway =>{onSettingChanged('gateway',gateway,'GATEWAY')}} />
                
                <SettingsDateRow 
                  label={'Time & Date'} 
                  time={time} 
                  onChange={time =>{this.onTimeChanged(time)}} />

                <SettingsRow isIp={false} label={'AODF Name'} model={hostname} 
                  onChange={hostname =>{onSettingChanged('hostname',hostname,'AODF Name')}} />
                  
                <SettingsRow isIp={true} label={'Repository IP'} model={repo_ip} 
                  onChange={repo_ip =>{onSettingChanged('repo_ip',repo_ip,'Repository IP')}} />
                <SettingsRow isIp={false} label={'NTP address'} model={ntp_server} 
                  onChange={ntp_server =>{onSettingChanged('ntp_server',ntp_server,'NTP address')}} />
                <SettingsIDRow label={'EMS Major ID'} dataKey={'EMS_MAJOR_ID'} model={EMS_MAJOR_ID} 
                  onChange={majorID =>{onSettingChanged('EMS_MAJOR_ID',majorID,'EMS Major ID')}} />
                <SettingsIDRow label={'EMS Minor ID'} dataKey={'EMS_MINOR_ID'} model={EMS_MINOR_ID}
                  onChange={id =>{onSettingChanged('EMS_MINOR_ID',id,'EMS Minor ID')}} />
                <SettingsIDRow label={'Customer Major ID'}dataKey={'CUSTOMER'}  
                  model={CUSTOMER_MAJOR_ID} onChange={id =>{onSettingChanged('CUSTOMER_MAJOR_ID',id,'Customer Major ID')}} />               
                <SettingsIDRow label={'Customer Minor ID'}dataKey={'CUSTOMER'}  
                  model={CUSTOMER_MINOR_ID} onChange={id =>{onSettingChanged('CUSTOMER_MINOR_ID',id,'Customer Minor ID')}} /> 
                <SettingsNTPSyncRow label={'NTP Usage'} model={ntp_sync} onChange={ntp_sync =>{onSettingChanged('ntp_sync',ntp_sync,'NTP SYNC ENABLED')}} />
                <SettingsDownloadRow label={'AODF Log'} model={'/aodf.log'} refresher={false}  />
                <SettingsDownloadRow label={'System Log'} model={false} refresher={this.dumpLogAndGetFile} />   

                <HalfRow labelLeft={'AODF Part number'} modelLeft={part_and_serial_numbers.aodf.part}
                  labelRight={'AODF Serial number'} modelRight={part_and_serial_numbers.aodf.serial}></HalfRow>
                  <HalfRow labelLeft={'Robot Part number'} modelLeft={part_and_serial_numbers.robot.part}
                  labelRight={'Robot Serial number'} modelRight={part_and_serial_numbers.robot.serial}></HalfRow>
                  <a href="/logread.txt" hidden={true} ref={this.logRef} download></a>
             </FormContainer> }
          </div>

         )
    }
}

const mapStateToProps = (state) => {
  let props = {
    settings:state.settingsReducer,
    unSavedChanges:state.saveChangesReducer,
    needReboot:state.rebootReducer.needReboot,
    rebootSafe:state.rebootReducer.rebootSafe,
    showPasscodeModal:state.rebootReducer.showPasscodeModal,
    rebootOngoing:state.rebootReducer.rebootOngoing
    }
    
    console.log('----im props of setting view:----');
    console.log(props);
    console.log('--------------');
    
  return props;
};


const mapDispatchToProps = (dispatch) => ({  
    sendResToRedux:(res) => dispatch(fetchSettingsAction(res)),
    onSettingChanged:(fieldKey, value, fieldName) => dispatch(settingsChangedAction(fieldKey, value, fieldName)),
    sendPCMToRedux:(showPasscodeModal) => dispatch(savePasscodeModelAction(showPasscodeModal)),
    toggleRebootRedux: (rebootOngoing) => dispatch(toggleRebootAction(rebootOngoing)),
    updateTimeInState: (res) => dispatch(updateTimeInStateAction(res))
  });

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (SettingsView)


