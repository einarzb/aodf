import React, { Component } from 'react';
import styled from 'styled-components';
import {Button} from 'grommet/components/Button'
import {Text} from 'grommet/components/Text'
import {TextInput} from 'grommet/components/TextInput';

export const COLOR_PRIMARY = '#fd7c20'; 

export const myTheme = {
  global: {
    colors:{
      brand: COLOR_PRIMARY
    },
    select:{
      options:{
      container:{
       zIndex:9999
      }
    }
  }
  }
};
export const FormRow =  styled.div`
  
  height:50px !important;
  display: flex;
  flex-direction:row;  
  /* margin:20px; */
  /* padding:0 10px; */
  /* width:100%; */

  /* border-left: 1px gray solid; */
  border-bottom: 1px gray solid;
  border-right : 1px gray solid;

`;


export const RowChild = styled.div`
  display: flex;
  align-items:center;
  justify-content:center;
  text-align:center;
  flex:2;
`;

export const RowTitle = styled(RowChild)`
  flex:2;  
  width:150px;
  font-weight:bold;
  color: ${COLOR_PRIMARY};
  border-right: 1px gray solid;
  border-left: 1px gray solid;
`;
export const DataText = styled(RowChild)`
  justify-content:start;
  padding-left:30px;
  font-size:1em;
  font-style:italic;
  flex:4;
`;
export const RowData = styled(RowChild)`
  font-weight:normal;
  flex:3;
  
`;

export const InputContainer = styled(RowChild)`
  flex:1;
  flex-direction:row;
  padding:0 15px;
`;

export const InputCalibContainer = styled(InputContainer)`
  border:1px solid red;
`

export const CalibRowChild = styled(RowChild)`
  font-weight:normal;
  flex:4;
  
`;

export const OButton = styled(Button)`
    color:${COLOR_PRIMARY} ;
    border-color:${COLOR_PRIMARY} ;
  & svg{
  stroke:${COLOR_PRIMARY} !important;

  }
`;



export const BigButt = styled(OButton)`    
    margin: 10px;
`;
export const AlertButton = styled(BigButt)`
    color:red ;
    border-color:red ;
    font-weight:bold;
    height: 40px;
    margin: 5px auto;
    border-width:3px;
  & svg{
  stroke:${COLOR_PRIMARY} !important;

  }
`;

export const ButtonsRow = styled(FormRow)`
  justify-content: space-between;
  border-left: 1px gray solid;
  
`;

export const Spacer = styled.div`
  flex:4;
`;


export const FormContainer = styled.div`
  display: flex;
  flex-direction:column;
  border-top: 1px gray solid;
  margin:1rem auto;
  width:75vw;
`;

export const ModalBG = styled.div`
  position:fixed;
  background-color:${COLOR_PRIMARY};
  opacity:0.8;
  width:${p => p.visible ? '100%': '0'};
  height:100%;
  top:0;
  left:0;
  z-index:999;
  border:2px solid
  
`;

export const NicePopup = styled.div`
    position:fixed;
    left:0;
    top:0;
    z-index:1000;
    padding:20px;
    box-shadow:rgba(0, 0, 0, 0.75) 10px 10px 28px 0px;
    background-color:whitesmoke;

`;


export const SaveModal = styled(NicePopup)`
    color: red;
    font-size:1.3em;
    margin:10% 30%;
    width:40%;
    
    & > div {
      display:flex;
      flex-direction:column;
      align-items:center;
      text-align:center;
      width:100%;
      position:relative;
      &  button{
        width:200px;
        
      }
    }
    & > button{
      position:absolute;
      right:20px;
      top:20px;
      z-index:1001;
    }
    
`;
export const ModalActions = styled.div`
  display: flex;
  flex-direction:row;
  align-items:center;
  justify-content:space-between;
  width:100%;
  &  button{
    /* color:black!important; */
    /* margin-left:15px; */
  }
  
`;

export const MTextInput = styled(TextInput)`
    width:160px;

`;

export const MOButton = styled(OButton)`
  z-index:1001;
`;

export const ChangeList = styled.ul`
  text-align:left;
`;