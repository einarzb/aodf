import React, { Component } from 'react';
import { connect } from 'react-redux';

import {Button} from 'grommet/components/Button'
import styled from 'styled-components';

import { MicroApi } from '../micro-api';
import RebootView from './RebootView';
import { toggleRebootAction } from '../redux/actions/settings-actions';

class quickCommandsView extends Component{
    constructor(){
        super()
        this.state = {
        }
    }

    toggleReboot = () => {           
      console.log('im toggle reboot ');
       let { toggleRebootRedux } = this.props; 
       let rebootOngoing = !this.props.rebootOngoing; 
      // console.log(rebootOngoing);//true
       toggleRebootRedux(rebootOngoing);
     }
     

    plateRotIn = () => {    
    console.log('im plateRotIn');   
     MicroApi.plateRotIn().then(res => {
       console.log(res);
     });
    }

    plateRotOut = () => {       
      console.log('im plateRotOut');
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
      let {rebootOngoing} = this.props;
        return (
          <div>
         {
          rebootOngoing 
          ?
          <RebootView reboot={this.toggleReboot} /> 
          : 
          <QuickCommandsContainer>

                  <MiniWrapper>
                      <ButtonsFlexer> 
                        <QCButton label={'Elev Up'} onClick={this.elevUp} ></QCButton>
                        <QCButton label={'Elev Down'} onClick={this.elevDown} ></QCButton>
                        <QCButton label={'Elev Stop'} onClick={this.elevStop} ></QCButton>
                     </ButtonsFlexer>
                  </MiniWrapper>

                  <MiniWrapper>
                      <ButtonsFlexer> 
                        <QCButton label={'Plate Rot In'} onClick={this.plateRotIn} ></QCButton>
                        <QCButton label={'Plate Rot Out'} onClick={this.plateRotOut} ></QCButton>
                     </ButtonsFlexer>

                     <ButtonsFlexer> 
                        <QCButton label={'Gripper In'} onClick={this.gripperIn} ></QCButton>
                        <QCButton label={'Gripper Out'} onClick={this.gripperOut} ></QCButton>
                     </ButtonsFlexer>
                     <ButtonsFlexer> 
                       <QCButton label={'Gripper Open'} onClick={this.gripperOpen} ></QCButton>
                        <QCButton label={'Gripper Close'} onClick={this.gripperClose} ></QCButton>
                     </ButtonsFlexer>

                  </MiniWrapper>
                  <MiniWrapper>
                    <ButtonsFlexer> 
                          <QCButton label={'Queue Reset'} onClick={this.queueReset} ></QCButton>
                          <QCButton label={'Save Picture'} onClick={this.savePicture} ></QCButton>
                      </ButtonsFlexer>
                      <ButtonsFlexer> 
                          <QCButton label={'Reboot'} onClick={this.toggleReboot} ></QCButton>
                          <QCButton label={'Power Off'} onClick={this.powerOff} ></QCButton>
                      </ButtonsFlexer>
                  </MiniWrapper>
          </QuickCommandsContainer>
         }
         </div>
        );
    }
}
const mapStateToProps = (state) => {
  let props = {
    rebootOngoing:state.rebootReducer.rebootOngoing
    }
    console.log(props);
    return props;
  }

  const mapDispatchToProps = (dispatch) => ({  
    toggleRebootRedux: (rebootOngoing) => dispatch(toggleRebootAction(rebootOngoing))
  });

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (quickCommandsView)

const QuickCommandsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top:50px;
`;


const MiniWrapper = styled.div`
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    border:1px solid grey;
    border-radius: 2rem;
    margin: 15px 0px;
`;

const ButtonsFlexer = styled.div`
    display: flex;
    flex-direction: column;
    width: auto;
    margin: 15px 0px;
    justify-content:space-between;
`;

const QCButton = styled(Button)`
    color: #00000 ;
    margin: 6px;
    padding: 15px 10px;
`;

