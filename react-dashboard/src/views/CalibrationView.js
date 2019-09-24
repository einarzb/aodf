import React, { Component } from 'react';
import { connect } from 'react-redux';

// STYLING
import styled from 'styled-components';
import { TextInput } from 'grommet/components/TextInput';
import { SaveButton, SelectBox } from '../components/Common';
import Select from 'react-select';

//COMPONENTS
import CalibrationGroup from '../components/CalibrationGroup';
import RoutinesTable from '../components/RoutinesTable';
// DATA
import { MicroApi } from '../micro-api';


let keys;
let plateNum = 2;
let sampleNum = 7;

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
          selectedParamsOption:null,
          selectedPlateNumberOption:null,
          selectedPlateAreaOption:null,
          selectedReelNumberOption:null,
          selectedInstructionsOption:null,
          selectedMotorNumOption:null,
          outputData:[],
          robotParamValue:"",
          selectedMotorNumValue:"",
          selectedPlateHeight:"",
          selectedInsttypeOption:'dont care',
          instTypeOptions:['dont care'],
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
              plateHeights:[
                {label: 'height1', value:10},
                {label: 'height2', value:2},
                {label: 'height3', value:10},
                {label: 'height4', value:10},
              ],
              labelplateHeight:'show plate height' ,
              labelPlateNum:'plate #',
              labelPlateArea:'plate area',
              labelPlateHeight:'plate height'
            }
          ],
          modifyRobotParameters: [
            {
              headline:'Modify Robot Parameters',
              params:this.getParams()
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
    
    /* ============== handle changes ================== */
    paramHandleChange = (selectedParamsOption) => {
      this.setState({ selectedParamsOption });
    }
    motorNumChange = (selectedMotorNumOption) => {
      this.setState({ selectedMotorNumOption });
    };
  
    reelNumHandleChange = (selectedReelNumberOption) => {
      this.setState({ selectedReelNumberOption });
    };

    plateAreaHandleChange = (selectedPlateAreaOption) => {
      this.setState({ selectedPlateAreaOption });
    };

    plateNumHandleChange = (selectedPlateNumberOption) => {
      this.setState({ selectedPlateNumberOption });
    };
    instructionsFunctionChange = (selectedInstructionsOption) => {
      this.setState({ selectedInstructionsOption });
    };

    setMotorNumValue = (e) => {
      this.setState({selectedMotorNumValue:e});
    }

    setPlaheHeightValue = (e) => {
      this.setState({selectedPlateHeight:e});
    }
    setRobotParamValue = (e) => {
      this.setState({robotParamValue:e});
    }

    

    /* ============== END handle changes ================== */


    getFunctions = () => {
      let functionsList = [
        {value: 1, label:'ROR rotate right'},
        {value: 2, label: 'ROL rotate left'},
        {value: 3, label: 'MST motor stop'},
        {value: 4, label: 'MVP move to position'},
        {value: 5, label: 'SAP set axis parameter'},
        {value:6, label: 'GAP get axis parameter'},
        {value: 7, label: 'STAP store axis parameter'},
        {value: 8, label: 'RSAP restore axis parameter'},
        {value: 9, label: 'SGP  set global parameter'},
        {value: 10, label: 'GGP  get global parameter'},
        {value: 14, label: 'SIO set output'},
        {value: 15, label: 'GIO get inputoutput'},    
        {value: 23, label: 'STOP stop TMCL program execution'}           
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
      {value: 4, label: 4} 
      ] 
      return plateAreas;
    }
    setReelToParking = (reelNum) => {
      console.log('im set reel to park');
      let log = this.state.setReelToParkingPlate[0].headline + " >> " + reelNum;
      this.updateLogger(log);
      MicroApi.setReelToParking(reelNum).then(res => {     
        console.log(res);
      })
    }
    
    executeInstructions = (val1, val2, val3) => {
      let log = 'test routine>> ' + val1 + ' ' + val2 + ' value: ' + val3;
      this.updateLogger(log);
    }

    plateCalibration = (val1, val2) => {   
      //update log in ui 
      let val1labeled = this.state.plateCalibrationGroups[0].labelPlateNum + "" + val1;
      let val2labeled = this.state.plateCalibrationGroups[0].labelPlateArea +  "(" + val2 + ")";    
      let log = " plate calibration>> " + val1labeled + ' ' + val2labeled;
      this.updateLogger(log);
      
      // update res
        MicroApi.plateRestart(plateNum).then(res =>{
          console.log(res)
          });
    }

    updateLogger = (log) => {
        let i;
        console.log(log)
        this.setState({
          outputData: [...this.state.outputData, <code key={i}>{log}</code>]
        });
  
        //clear input fields
        this.setState({
          selectedInstructionsOption:null,
          selectedMotorNumOption:null,
          selectedMotorNumValue:"",

        })
    }  

    clear = () => {
      this.setState({
        outputData: []
      });
    } 

    reelCalibration = () => {
      console.log('run reel calibration');
      //ui 
      let log = 'reel calibration process'
      this.updateLogger(log);
      //rest
      MicroApi.reelCalibration().then(res=>{
        console.log(res);
      })
    }
    
    getReport = () => {
        console.log('get report');
        MicroApi.getReport().then(res => {
          console.log(res);
        })
    }
    
    getParams = () => {
      MicroApi.getParams().then((res) => {
        keys = Object.keys(res.params);  
        console.log(keys);
        console.log(res.params);     
      })

      let myArr = [
        {value:1, label:'parking_target_x_pos'},
        {value:2, label:['regular_plate_target_x_pos']},
        {value:3, label:'parking_target_y_pos'},
        {value:4, label:'regular_plate_target_y_pos'},
        {value:5, label:'parking_plate_insert_parameter'}, 
        {value:6, label:'parking_plate_pull_parameter'}, 
        {value:7, label:'regular_plate_insert_parameter'}, 
        {value:8, label:'regular_plate_pull_parameter'}
       ] 
       return myArr;
    }

    updatePlateHeight = (val1,val2,val3) => {
      console.log('im update plate height ')
      let log = 'update plate height>> ' + this.state.updatePlateHeight[0].labelPlateNum + '' + val1 + " " + this.state.updatePlateHeight[0].labelPlateArea + "(" + val2 + ")" + ' value: ' + val3;
      this.updateLogger(log);
      return;
    }
    modifyRobotParams = (val1,val2) => {
      console.log('im modify Robot Params ')
      let log = 'modify robot params>> ' + 'parameter:' + ' ' + val1.label + " value: "  + val2;
      this.updateLogger(log);
      return;
    }


    render(){
      let {selectedInstructionsOption, selectedReelNumberOption, selectedPlateNumberOption, selectedPlateAreaOption, plateCalibrationGroups, reelCalibrationGroups, setReelToParkingPlate, updatePlateHeight, modifyRobotParameters, routineTableLabels, routineFunctionsList, selectedInsttypeOption, motorNumList, selectedMotorNumOption, resultTable, customStyles, selectedParamsOption, instTypeOptions, selectedMotorNumValue, outputData, selectedPlateHeight, robotParamValue} = this.state;
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
                          options={instTypeOptions}
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
                            value={selectedMotorNumValue}
                            onChange={ event => this.setMotorNumValue(event.target.value) }
                        />
                    </TestButton>
                    <SaveButton onClick={() => this.executeInstructions(selectedInstructionsOption.label, selectedMotorNumOption.label, selectedMotorNumValue)} style={{width:'20%', fontSize:'16px'}}>
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
                <OutputBox>
                    {outputData} 
                </OutputBox>
                <SaveButton onClick={this.clear} style={{width:"180px"}}>
                    clear 
                </SaveButton>
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
                    <SaveButton onClick={() => this.plateCalibration(selectedPlateNumberOption.value, selectedPlateAreaOption.value)}>
                      run
                    </SaveButton>
                </CalibrationGroup>
                <CalibrationGroup calibRow={reelCalibrationGroups}>
                    <SaveButton onClick={this.reelCalibration} style={{width:"200px"}}>
                      Run Reel Calibration
                    </SaveButton>
                    <SaveButton onClick={this.getReport} style={{width:"200px"}}>
                        Get Report
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
                      <SaveButton onClick={() => this.setReelToParking(selectedReelNumberOption.value)}>
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
                        <PlateDetails>
                              <DisplayData style={{width:'102px'}}>
                              {updatePlateHeight[0].plateHeights[0].label} : {updatePlateHeight[0].plateHeights[0].value}
                              </DisplayData>
                              <DisplayData style={{width:'102px'}}>
                              {updatePlateHeight[0].plateHeights[1].label}
  : {updatePlateHeight[0].plateHeights[1].value}
                              </DisplayData>
                              <DisplayData style={{width:'102px'}}>
                              {updatePlateHeight[0].plateHeights[2].label}
  : {updatePlateHeight[0].plateHeights[2].value}
                              </DisplayData>
                              <DisplayData style={{width:'102px'}}>
                              {updatePlateHeight[0].plateHeights[3].label}
   :  {updatePlateHeight[0].plateHeights[3].value}
                              </DisplayData>
                          </PlateDetails>      
                      
                        <SelectBox>
                          <TextInput
                            style={{fontWeight:'300'}}
                            placeholder="insert height"
                            value={selectedPlateHeight}
                            onChange={ event => this.setPlaheHeightValue(event.target.value) }
                          />
                        </SelectBox>
                        <SaveButton onClick={() =>this.updatePlateHeight(selectedPlateNumberOption.value,selectedPlateAreaOption.value,selectedPlateHeight)}>
                          save
                        </SaveButton>
                </CalibrationGroup>


                <CalibrationGroup calibRow={modifyRobotParameters}>
                  <SelectBox style={{width:'200px'}}>
                    <Select
                        styles={customStyles} 
                        autoFocus
                        placeholder='Parameter'
                        value={selectedParamsOption}
                        onChange={this.paramHandleChange}
                        options={modifyRobotParameters[0].params}
                        name="select-parameter"
                      />
                  </SelectBox>
                  <SelectBox>
                    <TextInput
                      style={{fontWeight:'300'}}
                      placeholder="insert value"
                      value={robotParamValue}
                      onChange={ event => this.setRobotParamValue(event.target.value) }
                    />
                  </SelectBox>
                  <SaveButton onClick={()=>this.modifyRobotParams(selectedParamsOption, robotParamValue)}>
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
    margin-top: 1rem;
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
    font-size: 12px;
    padding: 0.2rem 0.5rem;
    display:inline-flex;
    flex-direction:column;
    padding: 0.2rem 0.5rem; 
    & children {
      display:block;
      border:1px solid red;
    }
`;

export const MainRow = styled.div`
  display:inline-flex;
  flex-direction:row;
  width:100%;
  justify-content:start;
  align-items:center;
  padding: 7px 0px;
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

const PlateDetails = styled.div`
    display:inline-flex;
    flex-direction:column;
`;