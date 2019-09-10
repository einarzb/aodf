import React, { Component } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

//views
import ConfigurationsView from './ConfigurationsView';
import QuickCommandsView from './quickCommandsView';
import SettingsView from './SettingsView';
import CalibrationView from './CalibrationView';

export default class TabsView extends React.Component{
    
    render(){    
        return (
            <Router>
                <div>
                  <TabMenu>
                        <Tab>
                          <Link to="/settings">Settings</Link>
                        </Tab>
                        <Tab>
                          <Link to="/configuration">Configuration</Link>
                        </Tab>
                        <Tab>
                          <Link to="/opticalport">Optical Port</Link>
                        </Tab>
                        <Tab>
                          <Link to="/calibration">Calibration</Link>
                        </Tab>
                        <Tab>
                          <Link to="/quickcommands">Quick Commands</Link>
                        </Tab>
                        <Tab></Tab>
                  </TabMenu>


                  <Route exact path="/settings" component={SettingsView} /> 
                  <Route path="/configuration" component={ConfigurationsView} />
                  <Route path="/calibration" component={CalibrationView} />
                  <Route path="/quickcommands" component={QuickCommandsView} />

                  </div>
            </Router>
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
  & a {
    text-decoration:none;
    color: #000000;
    display:block;
    width:100%;
    height:100%;
    &:hover {
      text-decoration:none;
      color: #000000;
    }
  }
  &:last-child {
      width:10%;
    }
`;
