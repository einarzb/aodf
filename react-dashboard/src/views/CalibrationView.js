import React, { Component } from 'react';
import { connect } from 'react-redux';

// STYLING
import styled from 'styled-components';
import { TextInput } from 'grommet/components/TextInput';
import { SaveButton } from '../components/Common';
import Select from 'react-select';

//COMPONENTS
import CalibrationGroup from '../components/CalibrationGroup';
import RoutinesTable from '../components/RoutinesTable';
// DATA
import { MicroApi } from '../micro-api';




export class CalibrationView extends React.Component{
    constructor(props){
        super(props)
    
        this.state = {
          //style for select 
          customStyles: {
            control: (base, state) => ({
              ...base,
              background: "#FFFFFF",
              fontSize:"13px",
              fontColor:"grey",
              lineHeight:1,
              borderColor: state.isFocused ? "grey" : "grey",
              boxShadow: state.isFocused ? null : null,
              "&:hover": {
                borderColor: "#fd7c20"
              }
            })},
          selectedPlateNumberOption:null,
          selectedPlateAreaOption:null,
          selectedReelNumberOption:null,
          selectedInstructionsOption:null,
          selectedMotorNumOption:null,
          selectedInsttypeOption:'dont care',
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
          ],
          routineTableLabels: [
            {label: 'Instructions'},
            {label: 'Inst Type'},
            {label: 'Motor Num'},
            {label: 'Value'},
          ],
          routineFunctionsList: [
            {
              functionsList: this.getFunctions()
            }
          ],
          motorNumList: [
            {
              motorNums: this.getMotorNum()
            }
          ],
          resultTable: [
            {label:'Host'},
            {label:'Target'},
            {label:'Status:'},
            {label:'Instr'},
            {label:'Value'},
            {label:'Diagram:'}
          ]

          
        } 
      
    
    }
    
    motorNumChange = (selectedMotorNumOption) => {
      this.setState({ selectedMotorNumOption });
      console.log(`Option selected:`, selectedMotorNumOption);
    };

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
    instructionsFunctionChange = (selectedInstructionsOption) => {
      this.setState({ selectedInstructionsOption });
      console.log(`Option selected:`, selectedInstructionsOption);
    };
    getFunctions = () => {
      let functionsList = [
        {value: 1, label:'ROR rotate right'},
        {value: 2, label: 'ROL rotate left'},
        {value: 3, label: 'MST motor stop'},
        {value: 4, label: 'MVP move to position'},
        {value: 5, label: 'SAP set axis parameter'},
        {value:6, label: 'GAP get axis parameter'},
        {value: 7, labebl: 'STAP store axis parameter'}    ,
        {value: 8, labebl: 'RSAP restore axis parameter'}    ,
        {value: 9, labebl: 'SGP  set global parameter'}    ,
        {value: 10, labebl: 'GGP  get global parameter'}    ,
        {value: 14, labebl: 'SIO set output'},
        {value: 15, labebl: 'GIO get inputoutput'},    
        {value: 23, labebl: 'STOP stop TMCL program execution'}           
      ];
      return functionsList;
    }
    getMotorNum = () => {
      let motorNums = [
        {value: 1, label:'Elevator'},
        {value: 2, label: 'Stage'},
        {value: 3, label: 'Plate Rotate'},
        {value: 4, label: 'Plate In/Out'},
        {value: 5, label: 'Gripper Open/Close'},
        {value:6, label: 'Gripper In/Out'}     
      ];
      return motorNums;
    }
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
    executeInstructions = () => {
      console.log('execute! ')
    }

    render(){
      let {selectedInstructionsOption, selectedReelNumberOption, selectedPlateNumberOption, selectedPlateAreaOption, plateCalibrationGroups, reelCalibrationGroups, setReelToParkingPlate, updatePlateHeight, modifyRobotParameters, routineTableLabels, routineFunctionsList, selectedInsttypeOption, motorNumList, selectedMotorNumOption, resultTable, customStyles} = this.state

      return (
        <div>
        <CalibrationContainer>
         
           <CalibrationTestRoutines>
                <p>Test Routines</p>
                <RoutinesTable tableCols={routineTableLabels}>
                    <TestButton>
                      <Select
                          styles={customStyles} 
                          autoFocus
                          placeholder='RoR'
                          value={selectedInstructionsOption}
                          onChange={this.instructionsFunctionChange}
                          options={routineFunctionsList[0].functionsList}
                          name="functions-list-select"
                        />
                    </TestButton>
                    <TestButton>
                      <Select
                          styles={customStyles} 
                          autoFocus
                          placeholder='dont care'
                          value={selectedInsttypeOption}
                          onChange={this.instructionsFunctionChange}
                          options={selectedInsttypeOption}
                          name="inst-type-select"
                        />
                    </TestButton>
                    <TestButton>
                      <Select
                          styles={customStyles} 
                          autoFocus
                          value={selectedMotorNumOption}
                          onChange={this.motorNumChange}
                          options={motorNumList[0].motorNums}
                          name="motornum-list-select"
                        />
                    </TestButton>
                    <TestButton>
                        <TextInput
                            style={{fontWeight:'300', width:'90px'}}
                              placeholder="value"
                            //  value={item.plateHeight}
                          />
                    </TestButton>
                    <SaveButton onClick={this.executeInstructions} style={{width:'20%', fontSize:'16px'}}>
                      execute
                    </SaveButton>
                </RoutinesTable>   
                <p>Result</p>
                <RoutinesTable tableCols={resultTable}>
                    <span>
                      localhost
                    </span>
                    <DisplayResult>
                      {plateCalibrationGroups[0].plateHeight}
                    </DisplayResult>
                    <DisplayResult>
                      {plateCalibrationGroups[0].plateHeight}
                    </DisplayResult>
                    <DisplayResult>
                      {plateCalibrationGroups[0].plateHeight}
                    </DisplayResult>
                    <DisplayResult>
                      {plateCalibrationGroups[0].plateHeight}
                    </DisplayResult>
                 
                </RoutinesTable>
                <p>Output Box</p>
                <OutputBox></OutputBox>
           </CalibrationTestRoutines>

           <CalibrationControlButtons>
                <CalibrationGroup calibRow={plateCalibrationGroups}>
                    <SelectBox>
                            <Select
                                styles={customStyles} 
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
                              styles={customStyles} 
                              autoFocus
                              placeholder='plate area'
                              value={selectedPlateAreaOption}
                              onChange={this.plateAreaHandleChange}
                              options={plateCalibrationGroups[0].plateAreas}
                              name="select-plate-area-number"
                            />
                        </SelectBox>
                    <SaveButton onClick={this.plateCalibration}>
                      run
                    </SaveButton>
                </CalibrationGroup>
                <CalibrationGroup calibRow={reelCalibrationGroups}>
                    <SaveButton onClick={this.reelCalibration} style={{width:"200px"}}>
                      Run Reel Calibration
                    </SaveButton>
                </CalibrationGroup>
                <CalibrationGroup calibRow={setReelToParkingPlate}>
                  <SelectBox>
                        <Select
                            styles={customStyles} 
                            autoFocus
                            placeholder='reel #'
                            value={selectedReelNumberOption}
                            onChange={this.reelNumHandleChange}
                            options={setReelToParkingPlate[0].reelNumbers}
                            name="select-reel-number"
                          />
                      </SelectBox>
                      <SaveButton onClick={this.setReelToParking}>
                        run
                      </SaveButton>
                </CalibrationGroup>
                <CalibrationGroup calibRow={updatePlateHeight}>
                    <SelectBox>
                            <Select
                                styles={customStyles} 
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
                              styles={customStyles} 
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
                          save
                        </SaveButton>
                </CalibrationGroup>
                <CalibrationGroup calibRow={modifyRobotParameters}>
                  <SelectBox>
                    <Select
                        styles={customStyles} 
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
                save
              </SaveButton>
           </CalibrationGroup>
           </CalibrationControlButtons> 

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
    flex-direction: row;
    align-items: initial;
    padding-top:0px auto;
    width: 77%;
    margin-left: 12.5%;
    margin-top: 2rem;
`;

const CalibrationControlButtons = styled.div`
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    margin-right: 0rem;
`;

const CalibrationTestRoutines = styled.div`
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    padding: 10px 2px;
    text-align:left;
    & p {
      width:100%;
      margin:0 0 10px 0;
    }
`;
const OutputBox = styled.div`
    border:1px solid grey;
    height:200px;
    width: 500px;
    margin-top: 0px;
    margin-right: 45px;

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
    color:#000000;

    & input {
      border:1px solid grey;
      padding: 10px;
    }
`;

const TestButton = styled.div`
    width:25%;
    font-size: 13px;
    font-weight:300;
    margin:0px 4px;
    color:#000000;
    & input {
      border:1px solid grey;
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
    border: none;
    border-radius: 4px;
    width: 50px;
    text-align:center;
`;

const DisplayResult = styled(DisplayData)`
    width:70px;
    margin: 0 5px;
`;