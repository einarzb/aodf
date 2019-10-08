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
let log;

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
          params:null,  
          paramValue:null,
          allHeights:null,
          plateNums:null,
          reelNums:null,
          height1:null,
          height2:null,
          height3:null,
          height4:null,
          report:null,
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
              labelplateHeight:'show plate height' ,
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
            }
          ],
          updatePlateHeight: [
            {
              headline: 'Update Plate Height',
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
    // fetch init data from DB
    componentDidMount(){
      this.getPlateNumbers();
      this.getReelNumbers();
      this.getParams();
      this.getInstructions();
    }

    /* ============== handle changes ================== */
    paramHandleChange = (selectedParamsOption) => {
      this.setState({ selectedParamsOption });
      this.setState({paramValue: selectedParamsOption.value})


    }
    motorNumChange = (selectedMotorNumOption) => {
      this.setState({ selectedMotorNumOption });
    };
  
    reelNumHandleChange = (selectedReelNumberOption) => {
      this.setState({ selectedReelNumberOption });
    };

    plateAreaHandleChange = (selectedPlateAreaOption) => {
      console.log(selectedPlateAreaOption)
      this.setState({ selectedPlateAreaOption });
    };

    plateNumHandleChange = (selectedPlateNumberOption) => {
      this.setState({ selectedPlateNumberOption });
     
      MicroApi.fetchPlateHeights(selectedPlateNumberOption.value).then(res => {    
        keys = Object.keys(res);  

        this.setState({height1: res.height1})
        this.setState({height2: res.height2})
        this.setState({height3: res.height3})
        this.setState({height4: res.height4})

        let allHeightsArr = [res.height1,res.height2,res.height3,res.height4];
        this.setState({allHeights: this.makeSelect(allHeightsArr)})
        })   
    };

    instructionsFunctionChange = (selectedInstructionsOption) => {
      this.setState({ selectedInstructionsOption });
    };

    setMotorNumValue = (e) => {
      this.setState({selectedMotorNumValue:e});
    }

    setPlateHeightValue = (e) => {
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

    getInstructions = () => {
      MicroApi.fetchInstructions().then(res => {
        console.log(res.instructions);
        console.log(res.instValues);

        keys = Object.keys(res.instructions);  
        let values = Object.values(res.instValues);

        let instructionsArr = [];
        for (let i=0; i<keys.length; i++) {
          instructionsArr.push({value:keys[i], label:values[i]});
        }
        this.setState({instructions: instructionsArr})


        //this.setState({instructions: this.makeSelect(res.reels)})
        })   
      
    }
    getReelNumbers = () => {
      MicroApi.fetchReels().then(res => {
        this.setState({reelNums: this.makeSelect(res.reels)})
        })   
      
      }
  
    getPlateNumbers = () => {
      MicroApi.fetchPlates().then(res => {
        this.setState({plateNums: this.makeSelect(res.plates)})
        })      
    }




    
    executeInstructions = (val1, val2, val3) => {
      log = 'test routine>> ' + val1 + ' ' + val2 + ' value: ' + val3;
      this.updateLogger(log);
    }

    plateCalibration = (val1, val2) => {   
      let val1labeled = "plate #" + "" + val1;
      let val2labeled =  "plate area" + "" + "(" + val2 + ")";    
      let log = " plate calibration>> " + val1labeled + ' ' + val2labeled;
      this.updateLogger(log);
      
      let data = [val1, val2];
      MicroApi.plateRestart(data).then(res =>{
        console.log(res)
      });
    }

    reelCalibration = () => {
      log = 'reel calibration process'
      this.updateLogger(log);
   
      MicroApi.reelCalibration().then(res=> {
        console.log(res);
        let report = <a href="tmp/Reel_position_on_parking.csv" download> download report </a>
        this.setState({
          report: report
        });
      })
    }
    
    setReelToParking = (reelNum) => {
      log = this.state.setReelToParkingPlate[0].headline + " >> " + reelNum;
      this.updateLogger(log);
      MicroApi.setReelToParking(reelNum).then(res => {     
        console.log(res);
      })
    }
    
    getParams = () => {
      MicroApi.getParams().then((res) => {
        keys = Object.keys(res.params);  
        let values = Object.values(res.params);

        let paramArr = [];
        for (let i=0; i<keys.length; i++) {
          paramArr.push({value:values[i], label:keys[i]});
        }
        this.setState({params: paramArr})

        return paramArr;

      })
    }

    updatePlateHeight = (val1,val2,val3) => {
      log = 'update plate height>> ' + this.state.updatePlateHeight[0].labelPlateNum + '' + val1 + " " + this.state.updatePlateHeight[0].labelPlateArea + "(" + val2.value + ")" + ' value: ' + val3;
      this.updateLogger(log);
      
      console.log(val1);
      console.log(val2);
console.log(val3);

      let allData = [val1,val2.label,val3];
      console.log(allData)
      MicroApi.updatePlateHeight(allData).then(res => {     
        console.log(res);
      })

      return;
    }
    modifyRobotParams = (val1,val2) => {
      log = 'modify robot params>> ' + 'parameter:' + ' ' + val1.label + " value: "  + value;
      this.updateLogger(log);
      let label = val1.label;
      let value = Number(val2);
      let paramLabel = label.toUpperCase();
      let all = [paramLabel,value]
      MicroApi.updateRobotParam(all).then(res => {     
        console.log(res);
      })
      return;
    }

    //general utils
    updateLogger = (log) => {
        let i;
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

    makeSelect = (res) => {
      let i;
      let newArr = [];
      for (i = 0; i < res.length; i++) {
        newArr.push({value:res[i], label:res[i]})
      }
      return newArr;
    }

    clear = () => {
      this.setState({
        outputData: []
      });
    } 

    render(){
      let {selectedInstructionsOption, selectedReelNumberOption, selectedPlateNumberOption, selectedPlateAreaOption, plateCalibrationGroups, reelCalibrationGroups, setReelToParkingPlate, updatePlateHeight, modifyRobotParameters, routineTableLabels, routineFunctionsList, selectedInsttypeOption, motorNumList, selectedMotorNumOption, resultTable, customStyles, selectedParamsOption, instTypeOptions, selectedMotorNumValue, outputData, selectedPlateHeight, robotParamValue, plateNums, reelNums, height1, height2, height3, height4 , allHeights, report, params, paramValue, instructions} = this.state;
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
                          options={instructions}
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
                     {/**{height1} */} 
                    </DisplayResult>
                    <DisplayResult>
    {/**{height1} */}                     </DisplayResult>
                    <DisplayResult>
    {/**{height1} */}                     </DisplayResult>
                    <DisplayResult>
    {/**{height1} */}                     </DisplayResult>
                 
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
                                options={plateNums}
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
                              options={allHeights}
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
                    {report}
          
                </CalibrationGroup>
                <CalibrationGroup calibRow={setReelToParkingPlate}>
                  <SelectBox>
                        <Select
                            styles={customStyles} 
                            autoFocus
                            placeholder='reel #'
                            value={selectedReelNumberOption}
                            onChange={this.reelNumHandleChange}
                            options={reelNums}
                            name="select-reel-number"
                          />
                      </SelectBox>
                      <SaveButton onClick={() => this.setReelToParking(selectedReelNumberOption.value)}>
                        run
                      </SaveButton>
                </CalibrationGroup>
                <MiniWrap>
                  <CalibrationGroup calibRow={updatePlateHeight}>
                    <SelectBox>
                            <Select
                                styles={customStyles} 
                                autoFocus
                                placeholder='plate #'
                                value={selectedPlateNumberOption}
                                onChange={this.plateNumHandleChange}
                                options={plateNums}
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
                              options={allHeights}
                              name="select-plate-area-number"
                            />
                        </SelectBox>
             
                      
                        <SelectBox>
                          <TextInput
                            style={{fontWeight:'300'}}
                            placeholder="insert height"
                            value={selectedPlateHeight}
                            onChange={ event => this.setPlateHeightValue(event.target.value) }
                          />
                        </SelectBox>
                        <SaveButton onClick={() =>this.updatePlateHeight(selectedPlateNumberOption.value,selectedPlateAreaOption,selectedPlateHeight)}>
                          save
                        </SaveButton>
                     </CalibrationGroup>
                    <PlateDetails>
                      <DisplayData style={{width:'auto'}}>
                          height1:{height1}
                      </DisplayData>
                      <DisplayData style={{width:'auto'}}>
                          height2:{height2}
                      </DisplayData>
                      <DisplayData style={{width:'auto'}}>
                          height3:{height3}
                      </DisplayData>
                      <DisplayData style={{width:'auto'}}>
                          height4:{height4}
                      </DisplayData>
                  </PlateDetails>  
                </MiniWrap>

                <CalibrationGroup calibRow={modifyRobotParameters}>
                  <SelectBox style={{width:'200px'}}>
                    <Select
                        styles={customStyles} 
                        autoFocus
                        placeholder='Parameter'
                        value={selectedParamsOption}
                        onChange={this.paramHandleChange}
                        options={params}
                        name="select-parameter"
                      />
                  </SelectBox>
                  <DisplayData style={{width:'auto'}}>
                      {paramValue}
                      </DisplayData>
                  <SelectBox>
                    <TextInput
                      style={{fontWeight:'300', width:'100px'}}
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
    border:1px solid grey;
`;

const PlateDetails = styled.div`
    display:inline-flex;
    flex-direction:row;
    margin-top: -1rem;
`;

const MiniWrap = styled.div`
  display:inline-flex;
  flex-direction:column;
  width: 90%;
`;