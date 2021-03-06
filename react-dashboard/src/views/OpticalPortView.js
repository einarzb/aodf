import React, { Component } from 'react';
import { connect } from 'react-redux';

import styled from 'styled-components';
import { SaveButton, SelectBox } from '../components/Common';
import Select from 'react-select';
import { TextInput } from 'grommet/components/TextInput';

import DataBlock from '../components/DataBlock';
import RoutinesTable from '../components/RoutinesTable';
import {DataRow} from '../components/RoutinesTable';
import { MicroApi } from '../micro-api';


class opticalPortView extends Component{
    constructor(){
        super()
        this.state = {
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
            })
          },
          reelNums:null,
          plateNums:null,
          selectedReelData:null,
          selectedReelToEditOption:null,
          selectedPhysicalStatusOption:null,
          selectedOperatorOption:null,
          selectedPlateToEditOption:null,
          postionOfPlate:null,
          plateHeight:null,
          plateType:null,
          reelAngle:null,
          parkingPlate:null,
          plateDataByPlateNum : [
            {label: 'Postion of Plate', value:'3'},
            {label: 'Plate Height', value:'2341701'},
            {label: 'Plate Type', value:'Regular'}
          ],
          reelDataByReelNum : [
            {label: 'Reel Angle', value:'456'},
            {label: 'Parking Plate Number', value:'1'}
          ],
          plateTableLabels: [
            {label: 'Port'},
            {label: 'Reel'},
            {label: 'Operator'},
            {label: 'Operator Comment'},
            {label: 'Admin Comment'},
            {label: 'Physical Status'},
            {label: 'Counter'},
          ],

          reelTableLabels: [
            {label: 'Plate #'},
            {label: 'Plate Port #'},
            {label: 'Operator Comment'},
            {label: 'Admin Comment'},
            {label: 'Physical Status'},
            {label: 'Counter'},
          ],

          plateTableInput: [
           
          ],

          operatorsList: [
            {value: 1, label:'Not Assigned'},
            {value: 2, label: 'Stokab'},
             {value: 3, label: 'France Telecom'},
          ],
          physicalStatusList: [
            {value: 1, label:'Available'},
            {value: 2, label: 'Not Available'},
             {value: 3, label: 'Not Visible'},
          ],
          updateCounter:this.updateChangesCounter()
        }
    } 
      // fetch init data from DB
      componentDidMount(){
        this.getPlateNumbers();
        this.getReelNumbers();
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
    
    getDataOfPlate = (currentPlateNum) => {
     
      MicroApi.fetchPlatePosition(currentPlateNum.value).then(res => {
        console.log(res);
          this.setState({postionOfPlate:Number(res)})
        })
      MicroApi.fetchHeight(currentPlateNum.value).then(res => {
          console.log(res);
          this.setState({plateHeight:Number(res)})
      })
      MicroApi.fetchPlateType(currentPlateNum.value).then(res => {
        console.log(res);
        this.setState({plateType:res})  
      })
      MicroApi.fetchPlatePorts(currentPlateNum.value).then(res => {
        // console.log(res);
        let {rows} = res;
        this.setState({plateTableInput: rows});  
      })
    }

    getDataOfReel = (currentReel) => {
      MicroApi.fetchReelAngle(currentReel.value).then(res => {
        console.log(res);
        this.setState({reelAngle:Number(res)})  
      })
      MicroApi.fetchParkingPlateNum(currentReel.value).then(res => {
        console.log(res);
        this.setState({parkingPlate:Number(res)})  
      });
      MicroApi.fetchReelData(currentReel.value).then(res => {
        console.log(res);
        this.setState({selectedReelData: res })  
      });
    }

    makeSelect = (res) => {
      let i;
      let newArr = [];
      for (i = 0; i < res.length; i++) {
        newArr.push({value:res[i], label:res[i]})
      }
      return newArr;
    }


    updateChangesCounter = () => {
      let counter = 0;
      counter++;
      return counter;
    }
  
    
    reelToEditHandleChange = (selectedReelToEditOption) => {
      this.setState({ selectedReelToEditOption });
      console.log(`Option selected:`, selectedReelToEditOption);
      this.getDataOfReel(selectedReelToEditOption);

    }
    reelAdminCommentChanged = (newComment) =>{
      let {selectedReelData} = this.state;
      selectedReelData.administrator_comment = newComment;
      this.setState({ selectedReelData });
    };
    reelOperatorCommentChanged = (newComment) =>{
      let {selectedReelData} = this.state;
      selectedReelData.operator_comment = newComment;
      this.setState({ selectedReelData });
    };
    
    
    reelPhysicalStatusHandleChange = (selectedPhysicalStatusOption) => {
      let {selectedReelData} = this.state
      selectedReelData.wheelstatus = selectedPhysicalStatusOption.label
      this.setState({ selectedReelData });
      console.log(`Option selected:`, selectedPhysicalStatusOption);
    }
    plateReelPhysicalStatusHandleChange = (rowIndex, selectedPhysicalStatusOption) => {
      let {plateTableInput} = this.state
      plateTableInput[rowIndex].status = selectedPhysicalStatusOption.label
      this.setState({ plateTableInput });
      console.log(`Option selected:`, selectedPhysicalStatusOption);
    }
    plateToEditHandleChange = (selectedPlateToEditOption) => {
      this.setState({ selectedPlateToEditOption });
      //console.log(`Option selected:`, selectedPlateToEditOption);
      this.getDataOfPlate(selectedPlateToEditOption);
    }
    operatorsHandleChange = (selectedOperatorOption) => {
      this.setState({ selectedOperatorOption });
      console.log(`Option selected:`, selectedOperatorOption);
    };
    wheelOpCommentChanged = (rowIndex, newComment) =>{
      let {plateTableInput} = this.state;
      plateTableInput[rowIndex].opcomment = newComment;
      this.setState({ plateTableInput });
    };
    wheelAdminCommentChanged = (rowIndex, newComment) =>{
      let {plateTableInput} = this.state;
      plateTableInput[rowIndex].adcomment = newComment;
      this.setState({ plateTableInput });
    };
  wheelOperatorsHandleChange = (rowIndex, selectedOperatorOption) => {
    let {plateTableInput} = this.state;
    plateTableInput[rowIndex].operator = selectedOperatorOption.label;
    this.setState({ plateTableInput });
    console.log(`Option selected:`, selectedOperatorOption);
  };

    onSaveWheel = () => {
      // serialize to fit old API
      let serializedDataArr = [];
      let {plateTableInput, plateType, postionOfPlate} = this.state;
      plateTableInput.forEach((row, rowIndex)=>{
        let serializedRow = `plateinfo_adcmt${rowIndex}=${row.adcomment}&plateinfo_status${rowIndex}=${row.status}`;
        if ( plateType == 'Regular') {
          serializedRow = `plateinfo_operator${rowIndex}=${row.operator}&plateinfo_opcmt${rowIndex}=${row.opcomment}&${serializedRow}`
        }
        serializedDataArr.push(serializedRow)
      });
      let serializedString = serializedDataArr.join('&');
      let dataToSend = `plateinfo_platenum=${postionOfPlate}&${serializedString}`;
      MicroApi.savePlateData(dataToSend);
    };
    onSaveSelectedReel = () =>{
      MicroApi.saveReelData(this.state.selectedReelData)
    }
    render(){
      let {} = this.props;
      let { customStyles, selectedPlateToEditOption, plateDataByPlateNum, plateTableLabels, plateTableInput, selectedOperatorOption, operatorsList, selectedPhysicalStatusOption, physicalStatusList, updateCounter, selectedReelToEditOption, selectedReelData, reelTableLabels, reelNums, plateNums, postionOfPlate, plateHeight, plateType, reelAngle, parkingPlate  }  = this.state;
        return (
       
          <OpticalPortContainer>
            <h4>Set plates status after production </h4>
            <PlateEditContainer>
              <span>

              <strong>Select plate to edit &nbsp;</strong>
              <SelectBox>
                  <Select
                      styles={customStyles} 
                      autoFocus
                      placeholder='plate #'
                      value={selectedPlateToEditOption}
                      onChange={this.plateToEditHandleChange}
                      options={plateNums}
                      name="select-plate-number-to-edit"
                    />
              </SelectBox>
              </span>

              <MiniWrap>
                  <Data>
                    <strong>Postion of Plate : </strong>{postionOfPlate} 
                  </Data>
                  <Data>
                  <strong>Plate Height : </strong>{plateHeight}
                  </Data>
                  <Data>
                  <strong>Plate Type : </strong>{plateType}
                </Data>
              </MiniWrap>
              <RoutinesTable tableCols={plateTableLabels}>
                
                {plateTableInput.map((row, rowIndex) => {
                  return <DataRow >
                  <DisplayData>
                    {row.index}
                   </DisplayData>
                   <DisplayData>
                    {row.wheelid}
                   </DisplayData>
                   <TestButton>
                      <Select
                          styles={customStyles} 
                          autoFocus
                          placeholder=''
                          value={operatorsList.find(e => e.label == row.operator)}
                          onChange={(option)=>{this.wheelOperatorsHandleChange(rowIndex, option)}}
                          options={operatorsList}
                          name="operations-list-select"
                        />
                    </TestButton>
                    <TestButton>
                        <TextInput
                            style={{fontWeight:'300', width:'110px'}}
                              placeholder="op comment"
                             value={row.opcomment}
                             onChange={(e)=>{this.wheelOpCommentChanged(rowIndex, e.target.value)}}
                          />
                    </TestButton>
                    <TestButton>
                        <TextInput
                            style={{fontWeight:'300', width:'110px'}}
                              placeholder="adm. comment"
                             value={row.adcomment}
                             onChange={(e)=>{this.wheelAdminCommentChanged(rowIndex, e.target.value)}}
                          />
                    </TestButton>
                    <TestButton>
                      <Select
                          styles={customStyles} 
                          autoFocus
                          placeholder=''
                          value={physicalStatusList.find(e => e.label == row.status)}
                          onChange={(o)=>{this.plateReelPhysicalStatusHandleChange(rowIndex, o)}}
                          options={physicalStatusList}
                          name="operations-list-select"
                        />
                    </TestButton>
                    <DisplayData>
                    {updateCounter}
                   </DisplayData>
                </DataRow>
                })
                
                }    

                </RoutinesTable>
                <SaveButton style={{width:'20%', fontSize:'16px'}} onClick={this.onSaveWheel}>
                      save
                    </SaveButton>
            </PlateEditContainer>

            <ReelEditContainer>
            <h4>Set reels status after production </h4>
            <span>
                <strong>Select reel to edit &nbsp;</strong>
                <SelectBox>
                    <Select
                        styles={customStyles} 
                        autoFocus
                        placeholder='reel #'
                        value={selectedReelToEditOption}
                        onChange={this.reelToEditHandleChange}
                        options={reelNums}
                        name="select-reel-number-to-edit"
                      />
                </SelectBox>
            </span>
               {
               selectedReelData &&<MiniWrap>
                  <Data>
                    <strong>Reel Angle: </strong>{reelAngle} 
                  </Data>
                  <Data>
                    <strong>Parking Plate Number: </strong>{parkingPlate}
                  </Data>
                  <Data>
                    <strong>Counter: </strong>{selectedReelData.connections_counter}
                  </Data>
                  <span>
                    <strong>Administrator Comment: </strong>
                    <TextInput
                            style={{fontWeight:'300', width:'110px'}}
                              placeholder="add a comment"
                             value={selectedReelData.administrator_comment}
                             onChange={(e)=>{this.reelAdminCommentChanged(e.target.value)}}
                          />
                  </span>
                  <span>
                    <strong>Operator Comment: </strong>
                    <TextInput
                            style={{fontWeight:'300', width:'110px'}}
                              placeholder="add a comment"
                             value={selectedReelData.operator_comment}
                             onChange={(e)=>{this.reelOperatorCommentChanged(e.target.value)}}
                          />
                  </span>
                 
                  <span>
                    <strong>Physical status: </strong>
                    <SelectBox>
                      <Select
                          styles={customStyles} 
                          autoFocus
                          placeholder=''
                          value={physicalStatusList.find(o=>o.label == selectedReelData.wheelstatus)}
                          onChange={this.reelPhysicalStatusHandleChange}
                          options={physicalStatusList}
                          name="operations-list-select"
                        />
                        </SelectBox>
                    </span>
                    
              </MiniWrap>
              }
            {/* 
          <RoutinesTable tableCols={reelTableLabels}>
            <DataRow>
                  <DisplayData>
                  {"--"}
                  </DisplayData>
                  <DisplayData>
                  {"==="}
                  </DisplayData>
                  {
                //  <TestButton>
                //     <Select
                //         styles={customStyles} 
                //         autoFocus
                //         placeholder=''
                //         value={selectedOperatorOption}
                //         onChange={this.operatorsHandleChange}
                //         options={operatorsList}
                //         name="operations-list-select"
                //       />
                //   </TestButton>
                }
                  <TestButton>
                      <TextInput
                          style={{fontWeight:'300', width:'110px'}}
                            placeholder="value"
                          //  value={item.plateHeight}
                        />
                  </TestButton>
                  <TestButton>
                      <TextInput
                          style={{fontWeight:'300', width:'110px'}}
                            placeholder="value"
                          //  value={item.plateHeight}
                        />
                  </TestButton>
                  
                  <DisplayData>
                  {updateCounter}
                  </DisplayData>
                  </DataRow>
              </RoutinesTable> */
}
                <SaveButton onClick={this.onSaveSelectedReel} style={{width:'20%', fontSize:'16px'}}>
                      save
                    </SaveButton>
            </ReelEditContainer>
          </OpticalPortContainer>
    
        );
    }
}


export default connect(
  null,
  null)
  (opticalPortView)

const OpticalPortContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    padding-top:10px;
    justify-content:center;
    margin-left: 12.5%;
    width: 77%;
    font-family:'Arial';
    font-size: 16px;
`;

const PlateEditContainer = styled.div`
    display: inline-flex;
    flex-direction: column;
    align-items: start;
    width: 100%;
    margin-bottom: 1rem;
    margin-right: 4rem;
    & span {
      display:inline-flex;
      align-items:center;
      flex-direction:row;
    }
    & h4 {
      width: 94%;
      text-align:left;
    } 

`;

const ReelEditContainer = styled.div`
    border-top:1px solid grey;
    display: inline-flex;
    flex-direction: column;
    align-items: start;
    width: 100%;
    margin-right: 4rem;
    & span {
      display:inline-flex;
      align-items:center;
      flex-direction:row;
    }
    & h4 {
      width: 94%;
      text-align:left;
    } 
`;



const TestButton = styled.div`
    width:10%;
    font-size: 13px;
    font-weight:300;
    margin:0px 4px;
    color:#000000;
    & input {
      border:1px solid grey;
      padding: 10px;
      width: 15%;
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

const MiniWrap = styled.div`
  display:inline-flex;
  flex-direction:column;
  width: 39%;
  align-items: flex-start;
`;

const Data = styled.div`
    display:block;
`;

