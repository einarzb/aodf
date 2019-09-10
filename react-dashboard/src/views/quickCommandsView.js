import React, { Component } from 'react';
import { connect } from 'react-redux';

import {ButtonsFlexer, QCButton} from '../components/Common';
import styled from 'styled-components';

import { MicroApi } from '../micro-api';
import RebootView from './RebootView';
import ButtonsGroup from '../components/ButtonsGroup';
import { toggleRebootAction } from '../redux/actions/settings-actions';

let elevButtons = [
  {label: 'Elev Up',onClick:'{this.elevUp}'},
  {label: 'Elev Down',onClick:'{this.elevDown}'},
  {label: 'Elev Stop',onClick:'{this.elevStop}'}
] 

let plateGripperButtons = [
  {label: 'Plate Rot In',onClick:'{this.plateRotIn}'},
  {label: 'Gripper In',onClick:'{this.gripperIn}'},
  {label: 'Gripper Close' ,onClick:'{this.gripperClose}'},
  {label: 'Plate Rot Out' ,onClick:'{this.plateRotOut}'},
  {label: 'Gripper Out' ,onClick:'{this.gripperOut}'}


] 

let generalButtons = [
  {label: 'Queue Reset',onClick:'{this.queueReset}'},
  {label: 'Save Picture' ,onClick:'{this.savePicture}'},
  {label: 'Reboot' ,onClick:'{this.toggleReboot}'},
  {label: 'Power Off' ,onClick:'{this.powerOff}'}
]


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
              <ButtonsGroup btnsArr={elevButtons}></ButtonsGroup>
              <ButtonsGroup btnsArr={plateGripperButtons}></ButtonsGroup>
              <ButtonsGroup btnsArr={generalButtons} ></ButtonsGroup>
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
    border-radius: 1rem;
    margin: 15px 0px;
`;

