import React, { Component } from 'react';
import { connect } from 'react-redux';

import styled from 'styled-components';
import { SaveButton, SelectBox } from '../components/Common';
import Select from 'react-select';
import { TextInput } from 'grommet/components/TextInput';

import DataBlock from '../components/DataBlock';
import RoutinesTable from '../components/RoutinesTable';

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
          selectedReelToEditOption:null,
          selectedPhysicalStatusOption:null,
          selectedOperatorOption:null,
          selectedPlateToEditOption:null,
          PlatesToEdit: this.getPlatesToEdit(),
          ReelsToEdit:this.getReelsToEdit(),
          plateDataByPlateNum : [
            {label: 'Postion of Plate', value:'1'},
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
            {value: 1},
            {value: 5},
            {value: 1}
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
    updateChangesCounter = () => {
      let counter = 0;
      counter++;
      return counter;
    }
    getPlatesToEdit = () => {
        let platesToEdit = [
          {value: 1, label:1},
          {value: 2, label:2},
          {value: 3, label:3},
          {value: 4, label:4},
          {value: 5, label:5},
          {value: 6, label:6},
          {value: 7, label:7},
          {value: 8, label:8},
          {value: 9, label:9},
          {value: 10, label:10},
          {value: 11, label:11},
          {value: 12, label:12}
        ];
        return platesToEdit
    }
    getReelsToEdit = () => {
      let reelsToEdit = [
        {value: 1, label:1},
        {value: 2, label:2},
        {value: 3, label:3},
        {value: 4, label:4},
        {value: 5, label:5},
        {value: 6, label:6},
        {value: 7, label:7},
        {value: 8, label:8},
        {value: 9, label:9},
        {value: 10, label:10},
        {value: 11, label:11},
        {value: 12, label:12}
      ];
      return reelsToEdit
  }
    
    reelToEditHandleChange = (selectedReelToEditOption) => {
      this.setState({ selectedReelToEditOption });
      console.log(`Option selected:`, selectedReelToEditOption);
    }
    PhysicalStatusHandleChange = (selectedPhysicalStatusOption) => {
      this.setState({ selectedPhysicalStatusOption });
      console.log(`Option selected:`, selectedPhysicalStatusOption);
    }
    plateToEditHandleChange = (selectedPlateToEditOption) => {
      this.setState({ selectedPlateToEditOption });
      console.log(`Option selected:`, selectedPlateToEditOption);
    }
    operatorsHandleChange = (selectedOperatorOption) => {
      this.setState({ selectedOperatorOption });
      console.log(`Option selected:`, selectedOperatorOption);
    };


    render(){
      let {} = this.props;
      let { customStyles, selectedPlateToEditOption, PlatesToEdit, plateDataByPlateNum, plateTableLabels, plateTableInput, selectedOperatorOption, operatorsList, selectedPhysicalStatusOption, physicalStatusList, updateCounter, selectedReelToEditOption, ReelsToEdit, reelDataByReelNum, reelTableLabels  }  = this.state;
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
                      options={PlatesToEdit}
                      name="select-plate-number-to-edit"
                    />
              </SelectBox>
              </span>

              <DataBlock dataBatch={plateDataByPlateNum}>
              </DataBlock>  
              <RoutinesTable tableCols={plateTableLabels}>
                    <DisplayData>
                    {plateTableInput[0].value}
                   </DisplayData>
                   <DisplayData>
                    {plateTableInput[0].value}
                   </DisplayData>
                   <TestButton>
                      <Select
                          styles={customStyles} 
                          autoFocus
                          placeholder=''
                          value={selectedOperatorOption}
                          onChange={this.operatorsHandleChange}
                          options={operatorsList}
                          name="operations-list-select"
                        />
                    </TestButton>
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
                    <TestButton>
                      <Select
                          styles={customStyles} 
                          autoFocus
                          placeholder=''
                          value={selectedPhysicalStatusOption}
                          onChange={this.PhysicalStatusHandleChange}
                          options={physicalStatusList}
                          name="operations-list-select"
                        />
                    </TestButton>
                    <DisplayData>
                    {updateCounter}
                   </DisplayData>
                </RoutinesTable>
                <SaveButton style={{width:'20%', fontSize:'16px'}}>
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
                        options={ReelsToEdit}
                        name="select-reel-number-to-edit"
                      />
                </SelectBox>
            </span>

            <DataBlock dataBatch={reelDataByReelNum}></DataBlock>  
            <RoutinesTable tableCols={reelTableLabels}>
                    <DisplayData>
                    {plateTableInput[0].value}
                   </DisplayData>
                   <DisplayData>
                    {plateTableInput[0].value}
                   </DisplayData>
                   <TestButton>
                      <Select
                          styles={customStyles} 
                          autoFocus
                          placeholder=''
                          value={selectedOperatorOption}
                          onChange={this.operatorsHandleChange}
                          options={operatorsList}
                          name="operations-list-select"
                        />
                    </TestButton>
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
                    <TestButton>
                      <Select
                          styles={customStyles} 
                          autoFocus
                          placeholder=''
                          value={selectedPhysicalStatusOption}
                          onChange={this.PhysicalStatusHandleChange}
                          options={physicalStatusList}
                          name="operations-list-select"
                        />
                    </TestButton>
                    <DisplayData>
                    {updateCounter}
                   </DisplayData>
                </RoutinesTable>
                <SaveButton style={{width:'20%', fontSize:'16px'}}>
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