import React, { Component } from 'react';
import { connect } from 'react-redux';

import styled from 'styled-components';
import { SaveButton, SelectBox } from '../components/Common';
import Select from 'react-select';
import PlateDataBlock from '../components/PlateDataBlock';
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
          selectedPlateToEditOption:null,
          PlatesToEdit: this.getPlatesToEdit(),

          plateDataByPlateNum : [
            {label: 'Postion of Plate', value:'1'},
            {label: 'Plate Height', value:'2341701'},
            {label: 'Plate Type', value:'Regular'}
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

          plateTableInput: [
            {value: 1},
            {value: 5},
            {value: 1}
          ]
          
        }
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

    plateToEditHandleChange = (selectedPlateToEditOption) => {
      this.setState({ selectedPlateToEditOption });
      console.log(`Option selected:`, selectedPlateToEditOption);
    }
    render(){
      let {} = this.props;
      let { customStyles, selectedPlateToEditOption, PlatesToEdit, plateDataByPlateNum, plateTableLabels, plateTableInput }  = this.state;
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

              <PlateDataBlock plateData={plateDataByPlateNum}>
              </PlateDataBlock>  
              <RoutinesTable tableCols={plateTableLabels}>
                    <TestButton>
                      <Select
                          styles={customStyles} 
                          autoFocus
                          placeholder='RoR'
                          value={'einar'}
                         // onChange={}
                          //options={}
                          name="functions-list-select"
                        />
                    </TestButton>
                    <DisplayData>
                    {plateTableInput[0].value}
                   </DisplayData>
                  
                </RoutinesTable>
                <SaveButton style={{width:'20%', fontSize:'16px'}}>
                      save
                    </SaveButton>
            </PlateEditContainer>
         
            <ReelEditContainer>
            <h4>Set reels status after production </h4>
            {/**   <ButtonsGroup btnsArr={plateGripperButtons}></ButtonsGroup>*/}
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
    display: inline-flex;
    flex-direction: column;
    align-items: start;
    width: 100%;
    margin-right: 4rem;
    & p {
      width: 94%;
      text-align:left;
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