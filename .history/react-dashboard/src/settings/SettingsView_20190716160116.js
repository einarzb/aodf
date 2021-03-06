import React, { Component } from 'react';
import styled from 'styled-components';
import SettingsRow, {SettingsIDRow, SettingsNTPSyncRow, SettingsDownloadRow, HalfRow} from './SettingsRow';
import SettingsDateRow from './SettingsDateRow';
import {OButton, FormRow} from './styled';

const COLOR_PRIMARY = '#fd7c20';


export default class SettingsView extends React.Component{
    
    render(){
        let {dumpLogAndGetFile, onTimeChanged, onSettingChanged, unSavedChanges, settings, tryToSave, needReebot, rebootSafe, reboot} = this.props
        let currentSettings = settings;
        let {ntp_sync, ip, netmask , mac_address, gateway, time, 
            hostname, repo_ip, ntp_server, part_and_serial_numbers, 
            EMS_MAJOR_ID, EMS_MINOR_ID, CUSTOMER_MAJOR_ID, CUSTOMER_MINOR_ID } = currentSettings;
    
        return (<FormContainer>
          
            <ButtonsRow>
              {
                (unSavedChanges.length > 0) &&
                <BigButt onClick={tryToSave} label={'SAVE'}></BigButt>
              }
              <Spacer></Spacer>
              {
                (needReebot && rebootSafe ) && 
                <AlertButton onClick={reboot} label={'REBOOT'}></AlertButton>}
                 {
                (needReebot &&  !rebootSafe) && 
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
              onChange={time =>{onTimeChanged(time)}} />

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
            <SettingsDownloadRow label={'System Log'} model={false} refresher={dumpLogAndGetFile} />          
            <HalfRow labelLeft={'AODF Part number'} modelLeft={part_and_serial_numbers.aodf.part}
              labelRight={'AODF Serial number'} modelRight={part_and_serial_numbers.aodf.serial}></HalfRow>
              <HalfRow labelLeft={'Robot Part number'} modelLeft={part_and_serial_numbers.robot.part}
              labelRight={'Robot Serial number'} modelRight={part_and_serial_numbers.robot.serial}></HalfRow>

          </FormContainer>
          )
    }
}
const BigButt = styled(OButton)`    
    margin: 10px;
`;
const AlertButton = styled(BigButt)`
    color:red ;
    border-color:red ;
    font-weight:bold;
    border-width:3px;
  & svg{
  stroke:${COLOR_PRIMARY} !important;

  }
`;

const ButtonsRow = styled(FormRow)`
  justify-content: space-between;
  border-left: 1px gray solid;
  
`;

const Spacer = styled.div`
  flex:4;
`;


const FormContainer = styled.div`
  display: flex;
  flex-direction:column;
  border-top: 1px gray solid;
  margin:20px;
  width:75vw;
`;
