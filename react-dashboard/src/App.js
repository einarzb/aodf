import React, { Component } from 'react';
import { connect } from 'react-redux';

// views
import PasscodeModal from './views/PasscodeModal';
import SettingsView from './views/SettingsView';
import TabsView from './views/TabsView';
import RebootView from './views/RebootView';
import {p} from './views/p'
 
// styling dependencies
import './App.css';
import styled from 'styled-components';
import {Grommet} from 'grommet/components/Grommet';
import { ModalBG, myTheme } from './views/styled';

// data 
import { MicroApi } from './micro-api';
// ACTIONS
import { fetchSettingsAction, checkSwitchesAction, updateTimeInStateAction, clearUnSavedChangesAction, toggleRebootAction, savePasscodeModelAction  } from './redux/actions/settings-actions';

let switchesPinger;

class App extends Component {
  constructor(props){
    super(props);
    this.logRef = React.createRef();

    //local state holds local ui functions 
    this.state = {
      settings:{...this.props.settings},
     // showPasscodeModal:false,
      verifyPIN:"111111"
    };        
  }
  
  componentDidMount(){
    this.refreshData();    

    setInterval(() => {
      let { updateTimeInState } = this.props;
     
      MicroApi.getDate().then(res => {             
        let updatedState = {...this.props.settings, time:res.date};        
        updateTimeInState(updatedState);             
      })

    }, 10*1000);
  }

  refreshData = () => {            
      let { sendResToRedux } = this.props;
      
     
      //get settings
      MicroApi.getSettings().then((res) => {
        sendResToRedux(res);
        
        if (res.need_reboot){
          this.startPinger();
        }
      });

      MicroApi.getPin().then((data)=>{        
        this.setState({verifyPIN:data.code})
      })
  }  
  updateTimeInState = (res) => {
    return res;
  }  
  sendResToRedux = (res) => {            
    return res;  
  }

  sendSwitchesToRedux = (res) => {    
    return res;
  }


//local
  tryToSave = () => {  
    console.log('trying to save');
    
    let {sendPCMToRedux} = this.props;
    let showPasscodeModal = !this.props.showPasscodeModal; //true local for view
    sendPCMToRedux(showPasscodeModal)
  }
 
  closeModal = ( )=> {
    let {sendPCMToRedux} = this.props;
    let showPasscodeModal = !this.props.showPasscodeModal; //turn false local for view
    sendPCMToRedux(showPasscodeModal)
  }

  onPasscodeEntered = (ep) => {    
    
    //init 
    const requiringReboot = ['ip', 'hostname', 'ntp_server', 'netmask', 'gateway'];
    let rebootNeeded = false;
    let { clearUnSavedChanges, sendPCMToRedux, showPasscodeModal } = this.props;

    
    if ( ep == this.state.verifyPIN) {
      let settingsMap = {};

      this.props.unSavedChanges.forEach(change => {
        settingsMap[change.fieldKey] = change.value;
        
        if (requiringReboot.indexOf(change.fieldKey)!= -1){          
          rebootNeeded = true;
        }
      }); 
      
      console.log(settingsMap)
    
      showPasscodeModal = !this.props.showPasscodeModal; //false local for view
      sendPCMToRedux(showPasscodeModal); //false
      clearUnSavedChanges(); //clear changes array

      MicroApi.changeSettings(settingsMap).then((res)=>{     
        console.log(res);
                   
        if (rebootNeeded){          
          this.startPinger();
        }
        this.refreshData()
      })
    }
  }

  //move this to an action
  onTimeChanged = (time)=>{
    console.log(time)    
    MicroApi.setDate(time).then(()=>{
      this.refreshData();
    }).catch(()=>{
      this.refreshData();
    });
  }
  startPinger = () => {    
    let {sendSwitchesToRedux} = this.props;
    if (!switchesPinger && !this.props.checkingSwitches){
      
      switchesPinger = setInterval(() => {
        this.checkingSwitchesUpdate(); //this.setState({checkingSwitches:true})  

        MicroApi.checkSwitches().then((res)=>{
          sendSwitchesToRedux(res);
        });        
      },5*1000);
    }
  }

  checkingSwitchesUpdate = () => {
    this.props.checkingSwitches = true;
    return this.props.checkingSwitches;
  }

  stopPinger = ()=>{
    clearInterval(switchesPinger);
    switchesPinger = false;
  }


/*=================
    REBOOT PART -- move to setting or reboot view
 ================= */

  toggleReboot = () => {       
    let { toggleRebootRedux } = this.props; 
    let rebootOngoing = !this.props.rebootOngoing; //local for view   
    toggleRebootRedux(rebootOngoing);
  }

  toggleRebootRedux = (rebootOngoing) => {
    return rebootOngoing;
  }

  reboot = () => {
    // TODO check that we don't have any scheduled switching
    MicroApi.reboot().then(r => {
      alert("SYSTEM REBOOTED, TRY REFRESHING THIS PAGE IN A MINUTE")
    })
  }




  dumpLogAndGetFile = ()=>{
    MicroApi.dumpLog().then(()=>{
      // after refreshing log on machine, programatically press link
      this.logRef.current.click();
    })
  }

  render() {
    let {rebootOngoing, showPasscodeModal} = this.props;
    
    return (

      <Grommet theme={myTheme} className="App">
      <TabsView/> 
       
      {/**this should be duplicated when you wherever u have save btn  */}
     
      {
          showPasscodeModal
           ? 
          <PasscodeModal 
            onPasscodeEntered={this.onPasscodeEntered} 
            close={()=>{
              this.closeModal();
            }}/>
          :
            <span></span> 
      }

        <ModalBG visible={showPasscodeModal}/>
        
        {/*
        TODO:// move to another view that TABS view would direct him as SETTINGS VIEW      */}
       
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
                    />
                  }
            </div>
        

       
        <a href="/logread.txt" hidden={true} ref={this.logRef} download></a>
       
      </Grommet>
    );
  }
}
 

const mapStateToProps = (state) => {
  const props = {
    settings:state.settingsReducer,
    unSavedChanges:state.saveChangesReducer,
    needReboot:state.rebootReducer.needReboot,
    rebootSafe:state.rebootReducer.rebootSafe,
    checkingSwitches:state.rebootReducer.checkingSwitches,
    rebootOngoing:state.rebootReducer.rebootOngoing,
    showPasscodeModal:state.rebootReducer.showPasscodeModal
  }    
  return props;
};


const mapDispatchToProps = (dispatch) => ({  
    sendResToRedux:(res) => dispatch(fetchSettingsAction(res)),
    sendSwitchesToRedux:(res) => dispatch(checkSwitchesAction(res)),
    updateTimeInState: (res) => dispatch(updateTimeInStateAction(res)),
    clearUnSavedChanges: () => dispatch(clearUnSavedChangesAction()),
    toggleRebootRedux: (rebootOngoing) => dispatch(toggleRebootAction(rebootOngoing)),
    sendPCMToRedux:(showPasscodeModal) => dispatch(savePasscodeModelAction(showPasscodeModal))
    
    //sendTimeToRedux:(time) => dispatch(timeChangedAction(time))    
  });

export default connect(
  mapStateToProps, 
  mapDispatchToProps)
  (App)


