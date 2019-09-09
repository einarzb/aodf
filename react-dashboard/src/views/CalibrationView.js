import React, { Component } from 'react';
import { connect } from 'react-redux';

// STYLING
import styled from 'styled-components';
import {OButton} from './styled';
import {Heading} from 'grommet/components/Heading';
import SettingsRow from './SettingsRow';


// DATA
import { MicroApi } from '../micro-api';
import { calibrationSettingsChangedAction } from '../redux/actions/settings-actions';

export class CalibrationView extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          plateCalibration:this.plateCalibration,
          reelCalibration:this.reelCalibration
        }   
    }

    plateCalibration = () => {
        MicroApi.plateRestart().then((res)=>{
          this.setState({plateCalibration:res});
        });        
    }

    reelCalibration = () => {
        MicroApi.reelCalibration().then((res)=>{
          this.setState({reelCalibration:res});
        })
    }

    render(){
      let { onSettingChanged, sample, plate } = this.props
      let { plateCalibration, reelCalibration } = this.state;             
      return (
        <CalibrationDiv>
           <h1>Test Routines</h1>
            <br/>
            <p> Plate Calibration</p>
            {
                <ButtonsFlexer>
                     
                      <SettingsRow 
                          label={'plate number'}
                          model={plate} 
                          onChange={plate =>{onSettingChanged('plate_number',plate,'plate')}}
                      />

                       <SettingsRow
                          label={'sample number'}
                          model={sample} 
                          onChange={sample =>{onSettingChanged('sample',sample,'sample')}}
                      />
                  
                  <OButton label={'run'} onClick={this.plateCalibration} ></OButton>
              </ButtonsFlexer>
         }
             <p> Reel Calibration</p>
             {
                 <ButtonsFlexer>
                     <OButton label={'run reel calibration'} onClick={this.reelCalibration} ></OButton>
                </ButtonsFlexer>
             }
          <div>
            Output: <br/>
              <OutputBox>
            
              </OutputBox>
          </div>
        </CalibrationDiv>
        );
    }
}

const mapStateToProps = (state) => {
  let props = {
    unSavedCalibration:state.calibrationReducer,
  }
  console.log(props);
  console.log('=-----=');
  
  return props;
}


const mapDispatchToProps = (dispatch) => ({ 
  onSettingChanged:(fieldKey, value, fieldName) => dispatch(calibrationSettingsChangedAction(fieldKey, value, fieldName))
 })

  export default connect(
    mapStateToProps,
    mapDispatchToProps)
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