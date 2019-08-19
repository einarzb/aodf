import React, { Component } from 'react';
import { connect } from 'react-redux';

import styled from 'styled-components';

class quickCommandsView extends Component{
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
          <QuickCommandsContainer>
                <div>
                  <p>Quick commands are set of commonly used commands that the technician used, it should replace the usage of “Set Function” screen. https://82.81.211.231:10561/index.php?param=Functions 
                  this is what exsisting - /Users/EinarBarzilay/teliswitch_aodf/functions_display.php
                  /Users/EinarBarzilay/teliswitch_aodf/aodf.js
                  </p>
                </div>


          </QuickCommandsContainer>
        );
    }
}
export default connect(
  null,
  null)
  (quickCommandsView)

const QuickCommandsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top:250px;
`;
