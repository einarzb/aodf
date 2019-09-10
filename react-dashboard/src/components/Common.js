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
    padding:10px;
`;

export const QCButton = styled(Button)`
    color: #00000 ;
    width: 30%;
    padding: 15px 10px;
    margin: 10px;
`;
