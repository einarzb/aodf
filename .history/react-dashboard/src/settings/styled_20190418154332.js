import React, { Component } from 'react';
import styled from 'styled-components';
import {Button} from 'grommet/components/Button'
import {Text} from 'grommet/components/Text'

const COLOR_PRIMARY = '#fd7c20';

export const FormRow =  styled.div`
  
  height:65px;
  display: flex;
  flex-direction:row;  
  /* margin:20px; */
  /* padding:0 10px; */
  /* width:100%; */
  flex:1;
  border-left: 1px gray solid;
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

export const OButton = styled(Button)`
    color:${COLOR_PRIMARY} !important;
    border-color:${COLOR_PRIMARY} !important;
  & svg{
  stroke:${COLOR_PRIMARY} !important;

  }
`;

export const NicePopup = styled.div`

    position:absolute;
    z-index:1000;
    padding:20px;
    box-shadow:rgba(0, 0, 0, 0.75) 10px 10px 28px 0px;
    background-color:whitesmoke;

`;
