import React, { Component } from 'react';
import styled from 'styled-components';
import {Button} from 'grommet/components/Button'

//button flexer 
export const ButtonsFlexer = styled.div`
    display: flex;
    flex-wrap: wrap;
    display: -webkit-flex; 
    -webkit-flex-wrap: wrap; 
    flex-direction: row;
    width: auto;
    margin: 15px 0px;
    justify-content:start;
    border:1px solid grey;
    border-radius: 1rem;
    padding:10px 2px;
`;

export const LedsFlexer = styled(ButtonsFlexer)`
  flex-direction: column;
  width: auto;
`;

export const QCButton = styled(Button)`
    color: #00000 ;
    width: 29%;
    padding: 15px 10px;
    margin: 10px;
`;


export const SwitchsWrapper = styled.div`
    width: 95%;
    display:inline-flex;
    align-items:center;
    flex-direction:row;
    height: auto;
    border-radius: 1rem;
    padding: 0;
    margin: 5px;
    line-height: 1rem;
    font-size: 12px;
`;


