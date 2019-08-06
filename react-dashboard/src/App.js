import React, { Component } from 'react';
import { connect } from 'react-redux';

// import views
import PasscodeModal from './views/PasscodeModal';
import SettingsView from './views/SettingsView';
import ConfigurationsView from './views/configuration/ConfigurationsView';
import TabsView from './views/tabs/TabsView';
import RebootView from './RebootView';
import {p} from './views/p'
 
// styling dependencies
import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';
import {Grommet} from 'grommet/components/Grommet';
import {Heading} from 'grommet/components/Heading';
import { ModalBG, myTheme } from '../src/views/styled';

// data 
import { MicroApi } from './micro-api';

let switchesPinger;

class App extends Component {
  constructor(props){
    super(props);

    this.logRef = React.createRef();
    this.state = {
      settings:{...this.props.settings},
      showPasscodeModal:false,
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
        let settings  = {...this.props.settings, time:res.date};        
        this.setState({settings});
      })
    }, 10*1000);
  }


  refreshData = ( ) => {
    
    MicroApi.getSettings().then((res)=>{
      // let set
      console.log(res);
      if (res.need_reboot){
        this.startPinger();
      }
      this.setState({settings:{...this.props.settings}, needReebot:res.need_reboot});

    });
    MicroApi.getPin().then((data)=>{
      this.setState({verifyPIN:data.code})
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

      this.props.unSavedChanges.forEach(change => {
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
    let {rebootOngoing, showPasscodeModal, needReebot, rebootSafe, checkingSwitches} = this.state

    return (
      <Grommet theme={myTheme} className="App">
        <TabsView/>
      {
          showPasscodeModal ? 
            <PasscodeModal onPasscodeEntered={this.onPasscodeEntered} close={()=>{this.setState({showPasscodeModal:false})}}/>
          :
            <span></span> 
          }
        <ModalBG visible={showPasscodeModal}/>
        {
          rebootOngoing ?  
          <RebootView reboot={this.reboot} toggle={this.toggleReboot} />         
          :
          <SettingsView tryToSave={this.tryToSave} dumpLogAndGetFile={this.dumpLogAndGetFile}
          onTimeChanged={this.onTimeChanged} reboot={this.toggleReboot}
          showPasscodeModal={showPasscodeModal} 
          needReebot={needReebot} 
          rebootSafe={rebootSafe} checkingSwitches={checkingSwitches} />

        }
        <a href="/logread.txt" hidden={true} ref={this.logRef} download></a>
       
      </Grommet>
    );
  }
}

const mapStateToProps = (state) => ({  
  settings:state.settingsReducer,
  unSavedChanges:state.saveChangesReducer
});

export default connect(
  mapStateToProps)
  (App)


