import React, { Component } from 'react';
import { connect } from 'react-redux';

import styled from 'styled-components';

class calibrationView extends Component{
    constructor(){
        super()
        this.state = {
          quickFlag:false
        }
        let data = 'yo yo oy';
    
    }

    render(){
        let { quickFlag } = this.state;
        return (
          <CalibrationContainer>
                <div>
                  <p>Quick commands are set of commonly used commands that the technician used, it should replace the usage of “Set Function” screen. https://82.81.211.231:10561/index.php?param=Functions 
                  this is what exsisting - /Users/EinarBarzilay/teliswitch_aodf/functions_display.php
                  /Users/EinarBarzilay/teliswitch_aodf/aodf.js
                  </p>
                  <p>
                  You can run plate calibration (5.2 /scripts/plate_restart) and reel calibration (5.3 /scripts/restart_home_port_pos)
                  </p>
                </div>
              
        

          </CalibrationContainer>
        );
    }
}
export default connect(
  null,
  null)
  (calibrationView)

const CalibrationContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top:250px;
`;

