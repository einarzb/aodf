import React, { Component } from 'react';
import { connect } from 'react-redux';

import {Button} from 'grommet/components/Button'
import styled from 'styled-components';
import { MicroApi } from '../micro-api';

class quickCommandsView extends Component{
    constructor(){
        super()
        this.state = {
        }
    }

    plateRotIn = () => {       
     MicroApi.plateRotIn().then(res => {
       console.log(res);
     });
    }

    plateRotOut = () => {       
      MicroApi.plateRotOut().then(res =>{
        console.log(res);
      });
     }
 
    

    gripperIn = () => {       
      console.log('im gripper in');
      MicroApi.gripperIn().then(res =>{
        console.log(res);
      });
      
    }

    gripperOut = () => {       
      console.log('im gripper out');
      MicroApi.gripperOut().then(res =>{
        console.log(res);
      });
     }

     gripperClose = () => {       
      console.log('im gripper close');
      MicroApi.gripperClose().then(res =>{
        console.log(res);
      });
     }

     gripperOpen = () => {       
      console.log('im gripper open');
      MicroApi.gripperOpen().then(res =>{
        console.log(res);
      });
     }


    render(){
        return (
          <QuickCommandsContainer>
                <div>
                  <MiniWrapper>
                      <ButtonsFlexer> 
                        <QCButton label={'Plate Rot In'} onClick={this.plateRotIn} ></QCButton>
                        <QCButton label={'Gripper In'} onClick={this.gripperIn} ></QCButton>
                        <QCButton label={'Gripper Out'} onClick={this.gripperOut} ></QCButton>
                     </ButtonsFlexer>

                     <ButtonsFlexer> 
                        <QCButton label={'Plate Rot Out'} onClick={this.plateRotOut} ></QCButton>
                        <QCButton label={'Gripper Close'} onClick={this.gripperClose} ></QCButton>
                        <QCButton label={'Gripper Open'} onClick={this.gripperOpen}></QCButton>
                      
                     </ButtonsFlexer>
                  </MiniWrapper>
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


const MiniWrapper = styled.div`
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    border:1px solid grey;
`;

const ButtonsFlexer = styled.div`
    display: flex;
    flex-direction: row;
    width: 400px;
    margin: 15px 0px;
    justify-content:space-between;
`;

const QCButton = styled(Button)`
    color: #00000 ;
    margin: 0 5px;
    padding: 15px 10px;
    background-color:cfd5ea;
    border-color: blue ;
  & svg{
  stroke: blue !important;
  }
`;