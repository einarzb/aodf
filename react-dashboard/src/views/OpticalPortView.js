import React, { Component } from 'react';
import { connect } from 'react-redux';

import styled from 'styled-components';
import { SaveButton, SelectBox } from '../components/Common';
import Select from 'react-select';

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
            {label: 'Postion of Plate:', value:'1'},
            {label: 'Plate Height:', value:'2341701'},
            {label: 'Plate Type', value:'Regular'}
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
      let { customStyles, selectedPlateToEditOption, PlatesToEdit, plateDataByPlateNum }  = this.state;
        return (
       
          <OpticalPortContainer>
            <p>plates</p>
            <PlateEditContainer>
              Select plate to edit
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
              <plateDataBlock plateData={plateDataByPlateNum}>
              </plateDataBlock>  
            </PlateEditContainer>
            <ReelEditContainer>
            <p>reels</p>
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
    align-items: center;
    padding-top:10px;
    justify-content:center;
    margin-left: 12.5%;
    width: 77%;
`;

const PlateEditContainer = styled.div`
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-right: 4rem;
    & p {
      width: 94%;
      text-align:left;
    } 
`;

const ReelEditContainer = styled.div`
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-right: 4rem;
    & p {
      width: 94%;
      text-align:left;
    } 
`;