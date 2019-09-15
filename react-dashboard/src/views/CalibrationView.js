import React, { Component } from 'react';
import { connect } from 'react-redux';

// STYLING
import styled from 'styled-components';
import { TextInput } from 'grommet/components/TextInput';
import { SaveButton } from '../components/Common';
import Select from 'react-select';

//COMPONENTS
import CalibrationGroup from '../components/CalibrationGroup';

// DATA
import { MicroApi } from '../micro-api';
import { calibrationSettingsChangedAction } from '../redux/actions/settings-actions';



export class CalibrationView extends React.Component{
    constructor(props){
        super(props)
    
        this.state = {
          selectedPlateNumberOption:null,
          selectedPlateAreaOption:null,
          selectedReelNumberOption:null,
          reelCalibration:this.reelCalibration,
          plateCalibrationGroups: [
            {
              headline: 'Plate Calibration', 
              plateNumbers: this.getPlateNumbers(),
              plateAreas:this.getPlateAreas(), 
              plateHeight:'10',
              labelplateHeight:'show plate height' ,
              labelPlateNum:'plate #',
              labelPlateArea:'plate area',
              labelPlateHeight:'plate height'
           }
          ],
          reelCalibrationGroups: [
            {
              headline: 'Reel Calibration'
            }
          ],
          setReelToParkingPlate: [
            {
              headline: 'Set Reel to Parking Plate',
              reelNumbers:this.getReelNumbers()
            }
          ],
          updatePlateHeight: [
            {
              headline: 'Update Plate Height',
              plateNumbers: this.getPlateNumbers(),
              plateAreas:this.getPlateAreas(), 
              plateHeight:'10',
              labelplateHeight:'show plate height' ,
              labelPlateNum:'plate #',
              labelPlateArea:'plate area',
              labelPlateHeight:'plate height'
            }
          ],
          modifyRobotParameters: [
            {
              headline:'Modify Robot Parameters'
            }
          ]
        } 
      
    
    }

    reelNumHandleChange = (selectedReelNumberOption) => {
      this.setState({ selectedReelNumberOption });
      console.log(`Option selected:`, selectedReelNumberOption);
    };

    plateAreaHandleChange = (selectedPlateAreaOption) => {
      this.setState({ selectedPlateAreaOption });
      console.log(`Option selected:`, selectedPlateAreaOption);
    };

    plateNumHandleChange = (selectedPlateNumberOption) => {
      this.setState({ selectedPlateNumberOption });
      console.log(`Option selected:`, selectedPlateNumberOption);
    };

    getReelNumbers = () => {
     // data should come from res
      let reelNumbers = [
        {value: 1, label:1},
        {value: 2, label: 2},
        {value: 3, label: 3},
        {value: 4, label: 4},
        {value: 5, label: 5},
        {value: 6, label: 6},
        {value: 7, labebl: 7}    
      ];
      return reelNumbers;
    }

    getPlateNumbers = () => {
      // data should come from res
      let plateNumbers = [
        {value: 1, label:1},
        {value: 2, label: 2},
        {value: 3, label: 3},
        {value: 4, label: 4},
        {value: 5, label: 5},
        {value: 6, label: 6},
        {value: 7, labebl: 7}      
      ];
      return plateNumbers;
    }
    getPlateAreas = () => {
      // data should come from res
      let plateAreas =  [ 
      {value: 1, label:1},
      {value: 2, label: 2},
      {value: 3, label: 3},
      {value: 4, label: 4},
      {value: 5, label: 5},
      {value: 6, label: 6},
      {value: 7, labebl: 7}     
      ] 
      return plateAreas;
    }
   
    setReelToParking = () => {
      console.log('im set reel to park');
      MicroApi.setReelToParking().then(res => {     
        console.log(res);
      })
    }
    plateCalibration = () => {
     console.log('im plateCalibration')
        MicroApi.plateRestart().then((res)=>{
          console.log('plateRestart');
        });        
    }

    reelCalibration = () => {
      console.log('run reel calibration');
        MicroApi.reelCalibration().then((res)=>{
          this.setState({reelCalibration:res});
        })
    }

    updatePlateHeight = () => {
      console.log('im update plate height ')
      return;
    }
    modifyRobotParams = () => {
      console.log('im modify Robot Params ')
      return;
    }
    render(){
      let {selectedReelNumberOption, selectedPlateNumberOption, selectedPlateAreaOption, plateCalibrationGroups, reelCalibrationGroups, setReelToParkingPlate, updatePlateHeight, modifyRobotParameters} = this.state

      return (
        <div>
        <CalibrationContainer>
           <h1>Test Routines</h1>

           <CalibrationGroup calibRow={plateCalibrationGroups}>
              <SelectBox>
                      <Select
                          autoFocus
                          placeholder='plate #'
                          value={selectedPlateNumberOption}
                          onChange={this.plateNumHandleChange}
                          options={plateCalibrationGroups[0].plateNumbers}
                          name="select-plate-number"
                        />
                  </SelectBox>

              <SelectBox>
                    <Select
                        autoFocus
                        placeholder='plate area'
                        value={selectedPlateAreaOption}
                        onChange={this.plateAreaHandleChange}
                        options={plateCalibrationGroups[0].plateAreas}
                        name="select-plate-area-number"
                      />
                  </SelectBox>
              <SaveButton onClick={this.plateCalibration}>
                Run
              </SaveButton>
           </CalibrationGroup>
           <CalibrationGroup calibRow={reelCalibrationGroups}>
               <SaveButton onClick={this.reelCalibration}>
                 Run Reel Calibration
              </SaveButton>
           </CalibrationGroup>
           <CalibrationGroup calibRow={setReelToParkingPlate}>
           <SelectBox>
                <Select
                    autoFocus
                    placeholder='reel #'
                    value={selectedReelNumberOption}
                    onChange={this.reelNumHandleChange}
                    options={setReelToParkingPlate[0].reelNumbers}
                    name="select-reel-number"
                  />
              </SelectBox>
              <SaveButton onClick={this.setReelToParking}>
                Run
              </SaveButton>
           </CalibrationGroup>
           <CalibrationGroup calibRow={updatePlateHeight}>
           <SelectBox>
                  <Select
                      autoFocus
                      placeholder='plate #'
                      value={selectedPlateNumberOption}
                      onChange={this.plateNumHandleChange}
                      options={plateCalibrationGroups[0].plateNumbers}
                      name="select-plate-number"
                    />
              </SelectBox>

              <SelectBox>
                <Select
                    autoFocus
                    placeholder='plate area'
                    value={selectedPlateAreaOption}
                    onChange={this.plateAreaHandleChange}
                    options={plateCalibrationGroups[0].plateAreas}
                    name="select-plate-area-number"
                  />
              </SelectBox>
                    
              <DisplayData>
                {plateCalibrationGroups[0].plateHeight}
              </DisplayData>
              <SelectBox>
                <TextInput
                style={{fontWeight:'300'}}
                  placeholder="insert height"
                //  value={item.plateHeight}
                />
              </SelectBox>
              <SaveButton onClick={this.updatePlateHeight}>
                Save
              </SaveButton>
          </CalibrationGroup>
          <CalibrationGroup calibRow={modifyRobotParameters}>

              <SelectBox>
                <Select
                    autoFocus
                    placeholder='Parameter'
                    value={selectedPlateAreaOption}
                    onChange={this.plateAreaHandleChange}
                    options={plateCalibrationGroups[0].plateAreas}
                    name="select-parameter-selector"
                  />
              </SelectBox>
              <DisplayData>
                {plateCalibrationGroups[0].plateHeight}
              </DisplayData>
              <SelectBox>
                <TextInput
                style={{fontWeight:'300'}}
                  placeholder="insert value"
                //  value={item.plateHeight}
                />
              </SelectBox>
              <SaveButton onClick={this.modifyRobotParams}>
                Save
              </SaveButton>
           </CalibrationGroup>
          
   {/**
onClick={this.setReelToParking}
   
       {/**
           <CalibrationRow label={'plate number'} model={plate} 
            onChange={plate =>{onSettingChanged('plate_number',plate,'plate')}} />
            <CalibrationRow
              label={'sample number'}
              model={sample} 
              onChange={sample =>{onSettingChanged('sample',sample,'sample')}}/>
            <ButtonsFlexer>
              <OButton label={'run'} onClick={this.plateCalibration(plate, sample)} ></OButton>
            </ButtonsFlexer>


             <p> Reel Calibration</p>
              <ButtonsFlexer>
                  <OButton label={'run reel calibration'} onClick={this.reelCalibration} ></OButton>
            </ButtonsFlexer>

            <p>set Reel To Parking plate</p> 
            <ButtonsFlexer>
                  <OButton label={'Run'} onClick={this.setReelToParking} ></OButton>
            </ButtonsFlexer>

            Output: <br/>
              <OutputBox>
            
              </OutputBox>

      */}
        </CalibrationContainer>
        </div>

        );
    }
}

const mapStateToProps = (state) => {
  let props = {
    unSavedCalibration:state.calibrationReducer.unSavedCalibrationChanges,
  }  
  return props;
}

  export default connect(
    mapStateToProps,
    null)
    (CalibrationView)
  
  
const CalibrationContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top:0px auto;
`;


const OutputBox = styled.div`
    border:1px solid grey;
    height:300px;
    width: 500px;
`;

export const MainRow = styled.div`
  display:inline-flex;
  flex-direction:row;
  width:100%;
  justify-content:start;
  align-items:center;
  padding: 7px 0px;
`;

const SelectBox = styled.div`
    width:140px;
    font-size: 13px;
    font-weight:300;
    margin:0px 4px;
    & input {
      border:1px solid rgba(0,0,0,0.15);
      padding: 10px;
    }
`;

const DisplayData = styled.div`
    box-sizing: border-box;
    font-size: 13px;
    border: none;
    -webkit-appearance: none;
    padding: 6px;
    outline: none;
    background: transparent;
    color: inherit;
    margin: 0;
    border: 1px solid rgba(0,0,0,0.15);
    border-radius: 4px;
    width: 140px;
    text-align:center;
`;