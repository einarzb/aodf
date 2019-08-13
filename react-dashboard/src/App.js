import React, { Component } from 'react';
import { connect } from 'react-redux';

// import views
import PasscodeModal from './views/PasscodeModal';
import SettingsView from './views/SettingsView';
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
// ACTIONS
import { fetchSettingsAction, checkSwitchesAction } from './redux/actions/settings-actions';

let switchesPinger;

class App extends Component {
  constructor(props){
    super(props);
    this.logRef = React.createRef();
    //local state holds local ui functions 
    this.state = {
      settings:{...this.props.settings},
      showPasscodeModal:false,
      verifyPIN:"111111"
    };        
  }
  
  componentDidMount(){
    this.refreshData();    

    setInterval(() => {
      MicroApi.getDate().then(res => {     
        console.log('im interval');
           
        let settings  = {...this.props.settings, time:res.date};  
        this.state.settings = settings;
       // this.setState({settings});
      })
    }, 10*1000);
  }


  refreshData = () => {            
      let { sendResToRedux } = this.props;
      MicroApi.getSettings().then((res) => {
      sendResToRedux(res);
      
      if (res.need_reboot){
        this.startPinger();
      }

      /* this.setState({settings:{...this.props.settings}, needReboot:res.need_reboot});*/
      this.state.settings = this.props.settings;
      this.state.needReboot = this.props.needReboot;    
    });

      MicroApi.getPin().then((data)=>{
        this.setState({verifyPIN:data.code})
      })
  }  
  
  sendResToRedux = (res) => {        
    return res;  
  }

  sendSwitchesToRedux = (res) => {
    return res;
  }
  //move this to an action
  tryToSave = ()=>{    
    this.setState({showPasscodeModal:true})
  }
  closeModal = ( )=> {
    this.setState({showPasscodeModal:false});
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
  
// invoked when reboot btn pressed 
  toggleReboot = () => {
    let rebootOngoing = !this.props.rebootOngoing; 
    this.state.rebootOngoing = rebootOngoing;
    console.log(rebootOngoing);
    console.log( this.state.rebootOngoing);
    
   // this.setState({rebootOngoing});    
  }

  //move this to an action
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
    let { showPasscodeModal } = this.state

    return (

      <Grommet theme={myTheme} className="App">
       {/** <TabsView/> */} 
       
      {
          showPasscodeModal ? 
            <PasscodeModal onPasscodeEntered={this.onPasscodeEntered} close={()=>{this.setState({showPasscodeModal:false})}}/>
          :
            <span></span> 
          }
        <ModalBG visible={showPasscodeModal}/>
        {/*
        TODO:// move to another view that TABS view would direct him as SETTINGS VIEW  */}
            
        <div>    
              {
                this.props.rebootOngoing ?  
                <RebootView reboot={this.reboot} toggle={this.toggleReboot} />         
                :
                <SettingsView tryToSave={this.tryToSave} dumpLogAndGetFile={this.dumpLogAndGetFile}
                onTimeChanged={this.onTimeChanged} reboot={this.toggleReboot}
                showPasscodeModal={showPasscodeModal} />

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
    rebootOngoing:state.rebootReducer.rebootOngoing
  }
  console.log(props);
  return props;
};


const mapDispatchToProps = (dispatch) => ({  
    sendResToRedux:(res) => dispatch(fetchSettingsAction(res)),
    sendSwitchesToRedux:(res) => dispatch(checkSwitchesAction(res))
    });

export default connect(
  mapStateToProps, 
  mapDispatchToProps)
  (App)


