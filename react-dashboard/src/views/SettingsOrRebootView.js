import React, { Component } from 'react';
import { connect } from 'react-redux';

import styled from 'styled-components';

//data
import { MicroApi } from '../micro-api';
import { fetchSettingsAction } from '../redux/actions/settings-actions';

//views
import SettingsView from './SettingsView';
import RebootView from './RebootView';


class SettingsOrRebootView extends Component {
    
  constructor(props){
    super(props);
    //local state
    this.logRef = React.createRef();
    this.state = {
    settings:{...this.props.settings},
    showPasscodeModal:false,
    verifyPIN:"111111"
    };  
    console.log('om state');
    console.log(this.state);
    
  }
  refreshData = () => {        
    console.log('refresh data');
        
    let { sendResToRedux } = this.props;
    MicroApi.getSettings().then((res) => {
      console.log(res);
      
      sendResToRedux(res);
      
      if (res.need_reboot){
        this.startPinger();
      }
    });

    MicroApi.getPin().then((data)=>{        
      this.setState({verifyPIN:data.code})
    })
}  
    dumpLogAndGetFile = ()=>{
      console.log('im log file in setting or reboot? ');
      
      MicroApi.dumpLog().then(()=>{
        // after refreshing log on machine, programatically press link
        this.logRef.current.click();
      })
    }

      render(){
        let { rebootOngoing, showPasscodeModal } = this.state;
        return (
          <sorContainer>
              {
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
                  showPasscodeModal={showPasscodeModal} 
                />
              }
         </sorContainer>  
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
  }  
  console.log('duck it');
  console.log(props);
  
  return props;
};

const mapDispatchToProps = (dispatch) => ({ 
sendResToRedux:(res) => dispatch(fetchSettingsAction(res))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (SettingsOrRebootView)


//inline style
export const sorContainer = styled.div`
  display: flex;
  flex-direction:column;
  border-top: 1px gray solid;
  margin:1rem auto;
  width:75vw;
`;

