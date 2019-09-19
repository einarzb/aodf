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
            rebootStartTime:false
        }   
    }

    confirm = () => {        
        this.powerOff();
        let d = new Date();
        this.setState({poweroffInProgress:true, rebootStartTime:d.toDateString()})
    }

    togglePowerOff = () => {           
       let { togglePoweroffRedux } = this.props; 
       let poweroffOngoing = !this.props.poweroffOngoing; 
       togglePoweroffRedux(poweroffOngoing);
     }
     
    powerOff = () => {
      MicroApi.powerOff();
    }

    render(){
        let { poweroffInProgress, rebootStartTime } = this.state;             
        return (
        <RebootDiv>
            { 
            !poweroffInProgress && <Heading textAlign={'center'}>
                Are you sure? 
                <br/>
                <br/>
                
            </Heading>
            }
            {
                !poweroffInProgress && <ButtonsFlexer>
                <OButton label={'CONFIRM POWEROFF'} onClick={this.confirm} ></OButton>
                <OButton label={'CANCEL'} onClick={this.togglePowerOff} ></OButton>
                </ButtonsFlexer>
            }
            {
            poweroffInProgress&&<Heading textAlign={'center'}>
                Poweroff command sent to machine at {rebootStartTime} 
                <br/>
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