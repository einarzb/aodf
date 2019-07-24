import React, { Component } from 'react';
import styled from 'styled-components';


export default class TabsView extends React.Component{
    
    render(){    
        return (
            <TabMenu>
              <Tab>Settings</Tab>
              <Tab>Configuration</Tab>  
              <Tab>Optical Port</Tab>
              <Tab>Calibration</Tab>
              <Tab>Quick Commands</Tab>
              <Tab></Tab>
            </TabMenu>
          )
    }
}


export const TabMenu = styled.ul`
  display: inline-flex;
  align-items:center;
  justify-content:space-evenly;
  text-align:center;
  list-style-type:none;
  height: 50px;
  border:1px solid grey;
  width:75%;
  padding: 0px;
`;

export const Tab = styled.li`
  border:1px solid grey;
  width:  20%;
  flex-direction:row;
  height:30px;
  text-align:center;
  padding: 10px 4px;
  text-align:center;
  &:last-child {
      width:10%;
    }
`;