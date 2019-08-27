import React, { Component } from 'react';
import { connect } from 'react-redux';

// STYLING
import styled from 'styled-components';
import {OButton} from './styled';
import {Heading} from 'grommet/components/Heading';

// DATA
import { MicroApi } from '../micro-api';
import {toggleRebootAction} from '../redux/actions/settings-actions';
import SettingsView from './SettingsView';


class RebootView extends Component{
    constructor(){
        super()
        //init
        this.state = {
            rebootInProgress:false,
            rebootStartTime:false,
            minutes: 1,
            seconds: 0
        }   
    }

    confirm = () => {        
      this.myInterval = setInterval(() => {
          
        let { seconds, minutes } = this.state
     
        if (seconds > 0) {
          this.setState(({ seconds }) => ({
            seconds: seconds - 1
          }))
        }

        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(this.myInterval);
            window.location.reload();
          } else {
            this.setState(({ minutes }) => ({
              minutes: minutes - 1,
              seconds: 59
            }))
          }
        }
      }, 1000);
        this.reboot();        
        let d = new Date();
        this.setState({rebootInProgress:true, rebootStartTime:d.toDateString()})
        this.reboot(); // why twice? 
    }

    reboot = () => {
      // TODO check that we don't have any scheduled switching
      MicroApi.reboot().then(r => {
        alert("SYSTEM REBOOTED, TRY REFRESHING THIS PAGE IN A MINUTE")
      })
    }

    toggleReboot = () => {       
      let { toggleRebootRedux } = this.props; 
      let rebootOngoing = !this.props.rebootOngoing; //local for view   
      toggleRebootRedux(rebootOngoing);
    }

    render(){
        let { rebootInProgress, rebootStartTime, minutes, seconds } = this.state;             
        return (
        <RebootDiv>
           {/**  { rebootOngoing ? <RebootView/> : <SettingsView/> }   */}
            { 
            !rebootInProgress &&<Heading textAlign={'center'}>
                Are you sure? 
                <br/>
                <br/>
                
            </Heading>
            }
            {
                !rebootInProgress && <ButtonsFlexer>
                <OButton label={'CONFIRM REBOOT'} onClick={this.confirm} ></OButton>
                <OButton label={'CANCEL'} onClick={this.toggleReboot} ></OButton>
                </ButtonsFlexer>
            }
            {
            rebootInProgress&&<Heading textAlign={'center'}>
                Reboot command sent to machine at {rebootStartTime} 
                <br/>
                <br/>
               Page will refresh in { minutes }:{ seconds < 10 ? `0${ seconds }` : seconds } seconds
                <br/>
                </Heading>
            }

        </RebootDiv>
        );
    }
}

const mapStateToProps = (state) => {
  const props = {
    needReboot:state.rebootReducer.needReboot,
    rebootSafe:state.rebootReducer.rebootSafe,
    checkingSwitches:state.rebootReducer.checkingSwitches,
    rebootOngoing:state.rebootReducer.rebootOngoing,
  }    
  console.log(props);
  
  return props;
};

const mapDispatchToProps = (dispatch) => ({ 
  toggleRebootRedux: (rebootOngoing) => dispatch(toggleRebootAction(rebootOngoing))
 })

export default connect (
  mapStateToProps,
  mapDispatchToProps)
  (RebootView);

const RebootDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top:0px auto;
`;

const ButtonsFlexer = styled.div`
    display: flex;
    flex-direction: row;
    width: 500px;
    justify-content:space-evenly;
`;