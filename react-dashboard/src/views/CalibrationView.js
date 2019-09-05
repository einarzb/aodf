import React, { Component } from 'react';
import { connect } from 'react-redux';

// STYLING
import styled from 'styled-components';
import {OButton} from './styled';
import {Heading} from 'grommet/components/Heading';

// DATA
import { MicroApi } from '../micro-api';

export class CalibrationView extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          plate:this.plateCalibration,
          reel:this.reelCalibration
        }   
    }

    plateCalibration = () => {
        MicroApi.plateRestart().then((res)=>{
          console.log(res);
          
          this.setState({plate:res});
        });        
    }

    reelCalibration = () => {
        MicroApi.reelCalibration().then((res)=>{
          this.setState({reel:res});
        })
    }

    render(){
       let { plate, reel } = this.state;             
        return (
        <CalibrationDiv>
           <h1>Test Routines</h1>
            {
                <ButtonsFlexer>

                  <OButton label={'plate calibration'} onClick={this.plateCalibration} ></OButton>
                  <OButton label={'reel calibration'} onClick={this.reelCalibration} ></OButton>
                </ButtonsFlexer>
            }
          <div>
            Output: <br/>
              <OutputBox>
                calibrate plate : { plate } <br/>
                calibrate reel : { reel }
              </OutputBox>
          </div>
        </CalibrationDiv>
        );
    }
}
/*
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
 })
*/
  export default connect(
    null,
    null)
    (CalibrationView)
  
  
const CalibrationDiv = styled.div`
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

const OutputBox = styled.div`
    border:1px solid grey;
    height:300px;
    width: 500px;
`;