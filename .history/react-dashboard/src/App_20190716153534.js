import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';
import {Grommet} from 'grommet/components/Grommet';
import {Heading} from 'grommet/components/Heading';
import PasscodeModal from './settings/PasscodeModal';
import SettingsView from './settings/SettingsView'
// import SettingsRow, {SettingsIDRow} from './settings/SettingsRow';
// import SettingsDateRow from './settings/SettingsDateRow';
import RebootView from './RebootView';
import {p} from './settings/p'
import { MicroApi } from './micro-api';
// import PasscodeModal from './settings/PasscodeModal';
const MOCK_DATA = {
  "ntp_sync":"0","mac_address":"00:00:00:00:00:00","ip":"000.000.000.000",
  "netmask":"000.000.000.000","gateway":"000.000.000.000","hostname":"...",
  "time":new Date(Date.now()).toUTCString(),"repo_ip":"000.000.000.000","ntp_server":"...",
  "CUSTOMER_MAJOR_ID":"1","CUSTOMER_MINOR_ID":"0.1","EMS_MAJOR_ID":"EMS1","EMS_MINOR_ID":"33",
  "part_and_serial_numbers":{"aodf":{"serial":"02005","part":"AOD10005"},"robot":{"serial":"02005","part":"AOD10005"}}};
const COLOR_PRIMARY = '#fd7c20';
const myTheme = {
  global: {
    colors:{
      brand: COLOR_PRIMARY
    },
    select:{
      options:{
      container:{
       zIndex:9999
      }
    }
  }
    // font: {
    //   family: 'Roboto',
    // },
  },
};
let switchesPinger;

class App extends Component {

  
  constructor(){
    super();
    this.logRef = React.createRef();
    this.state = {
      settings:{...MOCK_DATA},
      newSettings:{...MOCK_DATA},
      showPasscodeModal:false,
      unSavedChanges:[],
      needReebot:false,
      rebootSafe:false,
      checkingSwitches:false,
      rebootOngoing:false,
      verifyPIN:"111111"
    };
    
  }
  componentDidMount(){
    this.refreshData();
    
    setInterval(() => {
      MicroApi.getDate().then(res=>{
        let settings  = {...this.state.settings, time:res.date};
        this.setState({settings});
      })
    }, 10*1000);
    // this.setState({settings:{...MOCK_DATA}, newSettings:{...MOCK_DATA}})
  }


  refreshData = ( ) => {
    
    MicroApi.getSettings().then((res)=>{
      // let set
      console.log(res);
      if (res.need_reboot){
        this.startPinger();
      }
      this.setState({settings:{...res.settings}, newSettings:{...res.settings}, needReebot:res.need_reboot});
    });
    MicroApi.getPin().then((data)=>{
      this.setState({verifyPIN:data.code})
    })
    
  }
  // tryToSave = (fieldName, value, method)=>{
  //   this.setState({showPasscodeModal:true, tryingToSave:{fieldName,value,method}})
  // }
  onSettingChanged = (fieldKey,value ,fieldName) =>{
      
    if (! value || value == ''){
      return;
    }  
    let { unSavedChanges, settings } = this.state;

    let alreadyChangedIndex = unSavedChanges.findIndex((e) => {return e.fieldKey === fieldKey})
    if (alreadyChangedIndex == -1) {
      unSavedChanges.push({
          fieldName,
          fieldKey,
          value
        } )
    }else{
      unSavedChanges[alreadyChangedIndex] = {
          fieldName,
          fieldKey,
          value
        }
    }
    settings[fieldKey] = value
    this.setState({settings:{...settings}}, ()=>{
      console.log(this.state);
      
    })
    
  }
  tryToSave = ()=>{
    this.setState({showPasscodeModal:true})
  }
  closeModal = ( )=> {
    this.setState({showPasscodeModal:false});
  }
  onTimeChanged = (time)=>{
    console.log(time)
  
    MicroApi.setDate(time).then(()=>{
      this.refreshData();
    }).catch(()=>{
      this.refreshData();
    });
  }
  onPasscodeEntered = (ep) => {
    const requiringReboot = ['ip', 'hostname', 'ntp_server', 'netmask', 'gateway'];
    let rebootNeeded = false;

    if ( ep == this.state.verifyPIN){

      let settingsMap = {};
      this.state.unSavedChanges.forEach(change => {
        settingsMap[change.fieldKey] = change.value;
        if (requiringReboot.indexOf(change.fieldKey)!= -1){
          rebootNeeded = true;
        }
      }); 
      console.log(settingsMap)
      this.setState({showPasscodeModal:false, unSavedChanges:[]})
      MicroApi.changeSettings(settingsMap).then((r)=>{
        // alert(r)
        if (rebootNeeded){
          this.startPinger();
        }
        this.refreshData()
      })
    }
  }
  startPinger = ( )=>{
    if (!switchesPinger && !this.state.checkingSwitches){
      switchesPinger = setInterval(()=>{
        this.setState({checkingSwitches:true})
        MicroApi.checkSwitches().then((res)=>{
          if (res.indexOf('switch') !== -1){

            this.setState({rebootSafe:false})
          }else{
            this.setState({rebootSafe:true, checkingSwitches:false});
            
              // this.stopPinger();
          }
        });        
      },5*1000);
    }
  }
  stopPinger = ()=>{
    clearInterval(switchesPinger);
    switchesPinger =false;
  }
  toggleReboot = () => {
    let rebootOngoing = !this.state.rebootOngoing;
    this.setState({rebootOngoing});
  }

  reboot=()=> {
    // TODO check that we don't have any scheduled switching
    MicroApi.reboot().then(r=>{alert("SYSTEM REBOOTED, TRY REFRESHING THIS PAGE IN A MINUTE")})
  }

  dumpLogAndGetFile = ()=>{
    MicroApi.dumpLog().then(()=>{
      // after refreshing log on machine, programatically press link
      this.logRef.current.click();
    })
  }

  render() {
    let {rebootOngoing, showPasscodeModal, unSavedChanges, settings, needReebot, rebootSafe, checkingSwitches} = this.state
    // let currentSettings = settings
    // let {ntp_usage,ip, netmask , mac_address, gateway, time, hostname, repo_ip, ntp_server, ems_and_customer_ids, part_and_serial_numbers}=currentSettings;
    // let { aodf } = part_and_serial_numbers;
    // let {part, serial} = aodf; 
    return (
      <Grommet theme={myTheme} className="App">
      {
          showPasscodeModal ? 
            <PasscodeModal unSavedChanges={unSavedChanges} onPasscodeEntered={this.onPasscodeEntered} close={()=>{this.setState({showPasscodeModal:false})}}/>
          :
            <span></span> 
          }
        <ModalBG visible={showPasscodeModal}/>
        {
          rebootOngoing ?  
          <RebootView reboot={this.reboot} toggle={this.toggleReboot} />         
          :
          <SettingsView 
          onSettingChanged={this.onSettingChanged} tryToSave={this.tryToSave} dumpLogAndGetFile={this.dumpLogAndGetFile}
          onTimeChanged={this.onTimeChanged} reboot={this.toggleReboot}
          showPasscodeModal={showPasscodeModal} settings={settings} 
          unSavedChanges={unSavedChanges} needReebot={needReebot} 
          rebootSafe={rebootSafe} checkingSwitches={checkingSwitches}/>
        }
        <a href="/logread.txt" hidden={true} ref={this.logRef} download></a>
      </Grommet>
    );
  }
}

export default App;

const ModalBG = styled.div`
  position:absolute;
  background-color:${COLOR_PRIMARY};
  opacity:0.8;
  width:${p => p.visible ? '100%': '0'};
  height:100%;
  top:0;
  left:0;
  z-index:999;
  
`;
