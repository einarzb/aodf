import React, { Component } from 'react';
import { connect } from 'react-redux';

// STYLING
import styled from 'styled-components';
import {OButton} from './styled';
import {Heading} from 'grommet/components/Heading';

// DATA
import { MicroApi } from '../micro-api';
import {togglePoweroffAction} from '../redux/actions/settings-actions';


export class PoweroffView extends React.Component{
    constructor(props){
        super(props)
        //init
        this.state = {
            poweroffInProgress:false,
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
        let d = new Date();
        this.setState({poweroffInProgress:true, rebootStartTime:d.toDateString()})
    }

    togglePowerOff = () => {           
      console.log('im toggling poweroff ');
       let { togglePoweroffRedux } = this.props; 
       let poweroffOngoing = !this.props.poweroffOngoing; 
       togglePoweroffRedux(poweroffOngoing);
     }
     
     powerOff = () => {
      console.log('power off - im gonna invoke toggle poweroff ');
      MicroApi.powerOff().then(res =>{
        console.log(res);
      });
    }

    render(){
        let { poweroffInProgress, rebootStartTime, minutes, seconds } = this.state;             
        return (
        <RebootDiv>
            { 
            !poweroffInProgress &&<Heading textAlign={'center'}>
                Are you sure? 
                <br/>
                <br/>
                
            </Heading>
            }
            {
                !poweroffInProgress && <ButtonsFlexer>
                <OButton label={'CONFIRM POWEROFF'} onClick={this.powerOff} ></OButton>
                <OButton label={'CANCEL'} onClick={this.togglePowerOff} ></OButton>
                </ButtonsFlexer>
            }
            {
            poweroffInProgress&&<Heading textAlign={'center'}>
                Poweroff command sent to machine at {rebootStartTime} 
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
    poweroffOngoing:state.rebootReducer.poweroffOngoing
  }      
  return props;
};

const mapDispatchToProps = (dispatch) => ({ 
  togglePoweroffRedux: (poweroffOngoing) => dispatch(togglePoweroffAction(poweroffOngoing))
})

  export default connect(
    mapStateToProps,
    mapDispatchToProps)
    (PoweroffView)
  
  
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