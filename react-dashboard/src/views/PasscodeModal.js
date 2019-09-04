import React, { Component } from 'react';
import { connect } from 'react-redux';

//styling
import styled from 'styled-components';
import {Heading} from 'grommet/components/Heading';
import { Close } from 'grommet-icons/icons/Close'
import {NicePopup, OButton, SaveModal, ModalActions, MTextInput, MOButton, ChangeList} from './styled';

//data
import { MicroApi } from '../micro-api';
import { savePasscodeModelAction, clearUnSavedChangesAction, checkSwitchesAction, fetchSettingsAction, fetchConfigSettingsAction } from '../redux/actions/settings-actions';
let switchesPinger;

class PasscodeModal extends React.Component{
//TODO: 4. check that clearUnSavedChanges happens after reboot
  constructor(props){
    super(props);
    this.state = {
      verifyPIN:"111111",
      combined:{...this.mergeArrays()}
    };        
    console.log('im state');
    console.log(this.state);
    console.log('------  state -----');
  }


  componentDidMount(){
    this.refreshData();  
  }

  refreshData = () => {            
    let { sendResToRedux, sendConfigSettingToRedux } = this.props;

    //get settings
    MicroApi.getSettings().then((res) => {
      sendResToRedux(res);
      if (res.need_reboot){
        this.startPinger();
      }
    });
/*
    //get configs
    MicroApi.getConfigSettings().then((res) => { 
      console.log('refreshed res');
      console.log('-----');
      console.log(res);
      
      sendConfigSettingToRedux(res);
    });

    */
    MicroApi.getPin().then((data)=>{        
      this.setState({verifyPIN:data.code})
    })
}  
  
  closeModal = ( )=> {
    let {sendPCMToRedux} = this.props;
    let showPasscodeModal = !this.props.showPasscodeModal; 
    sendPCMToRedux(showPasscodeModal);
  }
  
  mergeArrays = () => {
    let { unSavedChanges , unSavedConfigChanges } = this.props;
      let a = unSavedChanges;
      let b = unSavedConfigChanges;

      let combinedDataToSave = [...a, ...b];
       console.log('im combined obj after filled ')
       console.log(combinedDataToSave);
       //a = [];
       //b = []; 
       console.log(a);
       console.log(b);
       
      return {combinedDataToSave}
    
      
      //return {combinedDataToSave};
      // TODO: CLEAR THIS ARRAY
  }

  onPasscodeEntered = (ep) => {    
    //init 
    const requiringReboot = ['ip', 'hostname', 'ntp_server', 'netmask', 'gateway'];
    let rebootNeeded = false;
    let { clearUnSavedChanges, sendPCMToRedux, showPasscodeModal, unSavedChanges, unSavedConfigChanges } = this.props;
    
    if ( ep == this.state.verifyPIN) {
      
      let settingsMap = {};
      /* old way      
      this.props.unSavedChanges.forEach(change => {
        settingsMap[change.fieldKey] = change.value;
        
        if (requiringReboot.indexOf(change.fieldKey)!= -1){          
          rebootNeeded = true;
        }
      }); */

      //settings view
      this.state.combined.combinedDataToSave.forEach(change => {
        settingsMap[change.fieldKey] = change.value;
        
        if (requiringReboot.indexOf(change.fieldKey)!= -1){          
          rebootNeeded = true;
        }
      }); 

      console.log(settingsMap)
       
      showPasscodeModal = !this.props.showPasscodeModal; //false local for view
      //ui - close modal 
      sendPCMToRedux(showPasscodeModal); 

      //clear changes array
      clearUnSavedChanges(); 
      console.log('clearing state too');
      this.combinedDataToSave = [];

      console.log(this.combinedDataToSave);
      //settings
      MicroApi.changeSettings(settingsMap).then((res)=>{     
        console.log(res);
        if (rebootNeeded){          
          this.startPinger();
        }
        this.refreshData()
      });

      //configs view
      MicroApi.changeConfigs(settingsMap).then((res)=>{    console.log(settingsMap);
        console.log('== im new configs ==');
        console.log(res);
        console.log('=======');
        this.refreshData()
      });


    }
  }
  startPinger = () => {    
    let {sendSwitchesToRedux} = this.props;
    if (!switchesPinger && !this.props.checkingSwitches){
      
      switchesPinger = setInterval(() => {
        this.checkingSwitchesUpdate(); //this.setState({checkingSwitches:true})  

        MicroApi.checkSwitches().then((res)=>{
        //  console.log(res); //empty
         // console.log('im res of checkSwitches - should be empty');
          
          sendSwitchesToRedux(res);
        });        
      },5*1000);
    }
  }

  checkingSwitchesUpdate = () => {
      this.props.checkingSwitches = true;
    //  console.log('checkingSwitchesUpdate');
     // console.log(this.props.checkingSwitches); //true

      return this.props.checkingSwitches;
    }

    render(){
       // let { unSavedChanges, unSavedConfigChanges } = this.props;
       // let { combined } = this.state.combined.combinedDataToSave;
        return (
        
        <SaveModal>
          <MOButton icon={<Close/>} onClick={this.closeModal}/>
          <div>
            <br/>
            <Heading level={4}>       
            {`Are you sure you want to make ${this.state.combined.combinedDataToSave.length} change${this.state.combined.combinedDataToSave.length > 1 ? 's':''}?`}
              <br/>
              <ChangeList>
                {
                  this.state.combined.combinedDataToSave.map((change, ii) => {
                    if (typeof change.value === 'object') {
                      // if the value is an object then you need to loof inside of it.
                          return(
                            <li key={`change${ii}`}>
                              <span>'{change.fieldName}' : <br/>
                                <ul>
                                  { 
                                    Object.keys(change.value).map(
                                      (changeKey,cindex) => { 
                                        return (
                                            <li key={`sub_change${cindex}`}>
                                              <span>'{changeKey}' to {change.value[changeKey]}</span>
                                            </li>
                                        )
                                      }
                                    )
                                  }
                                </ul>
                              </span>
                            </li>)
                    } else {
                        // if the value isnt an object 
                          return (
                            <li key={`change${ii}`}>
                              <span>'{change.fieldName}' to {change.value}</span>
                            </li>
                          )
                        }
                }) //end of unSavedChanges.map
              }
            </ChangeList>
         
              <br/>
              Enter passcode to verify change
            </Heading>

            <MTextInput size="small" placeholder={'######'} onChange={(e)=>{this.onPasscodeEntered(e.target.value)}}></MTextInput>
            <br/>
        </div>
       </SaveModal>
      )}
};

const mapStateToProps = (state) => {  
  let props =  {
      unSavedChanges:state.saveChangesReducer,
      showPasscodeModal:state.rebootReducer.showPasscodeModal,
      checkingSwitches:state.rebootReducer.checkingSwitches, 
      unSavedConfigChanges:state.saveConfigsReducer
    }
    console.log('----props of passcodemodal-----');
    console.log(props);
    console.log('---end props of passcodemodal------');

  return props;  
};


const mapDispatchToProps = (dispatch) => ({  
  sendPCMToRedux:(showPasscodeModal) => dispatch(savePasscodeModelAction(showPasscodeModal)),
 // sendConfigSettingToRedux:(res) => dispatch(fetchConfigSettingsAction(res)),
  clearUnSavedChanges: () => dispatch(clearUnSavedChangesAction()),
  sendSwitchesToRedux:(res) => dispatch(checkSwitchesAction(res)),
  sendResToRedux:(res) => dispatch(fetchSettingsAction(res)),

});

//connecting this view to the store
export default connect(
  mapStateToProps, 
  mapDispatchToProps)
  (PasscodeModal)



