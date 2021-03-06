import React, { Component } from 'react';
import { connect } from 'react-redux';

import styled from 'styled-components';

import { MicroApi } from '../micro-api';
import RebootView from './RebootView';
import PoweroffView from './PoweroffView';

import ButtonsGroup from '../components/ButtonsGroup';
import LedsGroup from '../components/LedGroup';

//import { instructions_manager } from '../../../aodf';

import { toggleRebootAction, togglePoweroffAction } from '../redux/actions/settings-actions';

// 0 - green
// 1 - red
// 2 - default grey

let defaultLimitSwitchButton = '#D3D3D3';
let limitSwitchButtonIsOn = '#7CFC00';

class quickCommandsView extends Component{
    constructor(){
        super()
        this.state = {
          limitSwitchTestButtons:[
            {label: 'Limit Switch Test', onClick:this.startLimitSwitchTest, width:'100%', bgColor:defaultLimitSwitchButton}
          ],
          leftSwitchesArr: [
            {ledNum: 'Elevator', limitSwitchStatus:'2'},
            {ledNum: 'Stage', limitSwitchStatus:'2'},
            {ledNum: 'Plate rotator', limitSwitchStatus:'2'},
            {ledNum: 'Plate rot I/O', limitSwitchStatus:'2'},
            {ledNum: 'Gripper I/O', limitSwitchStatus:'2'},
            {ledNum: 'Gripper O/C', limitSwitchStatus:'2'}
          ],
          rightSwitchesArr: [
            {ledNum: 'Elevator', limitSwitchStatus:'2'},
            {ledNum: 'Stage', limitSwitchStatus:'2'},
            {ledNum: 'Plate rotator', limitSwitchStatus:'2'},
            {ledNum: 'Plate rot I/O', limitSwitchStatus:'2'},
            {ledNum: 'Gripper I/O', limitSwitchStatus:'2'},
            {ledNum: 'Gripper O/C', limitSwitchStatus:'2'}
          ],
          generalButtons: [
            {label: 'Queue Reset', onClick:this.queueReset},
            {label: 'Download Picture', onClick:this.downloadPics},
            {label: 'Reboot', onClick:this.toggleReboot},
            {label: 'Power Off', onClick:this.togglePowerOff}
          ],
          downloadButtonsHolder: null,
          stopConnetion: null,
          startConnetion: null,
          elevButtons : [
            {label: 'Elev Up', onClick:this.elevatorUp},
            {label: 'Elev Down', onClick:this.elevatorDown},
            {label: 'Elev Stop', onClick:this.elevatorStop}
          ], 
          
          plateGripperButtons : [
            {label: 'Plate Rot In', onClick:this.plateRotIn},
            {label: 'Gripper In', onClick:this.gripperIn},
            {label: 'Gripper Open', onClick:this.gripperOpen},

            {label: 'Plate Rot Out', onClick:this.plateRotOut},
            {label: 'Gripper Out', onClick:this.gripperOut},
            {label: 'Gripper Close', onClick:this.gripperClose}

          ] 
        }
    } 
      // fetch init data from DB
      componentDidMount(){
        this.fetchConnections();
      }
    
      fetchConnections = () => {
        console.log('fetch connections');
        MicroApi.queueReset().then(res =>{
          this.setState({
              stopConnetion:Number(res.connections[0]),
              startConnetion:Number(res.connections[1])
          }); 
        });
      }


    startLimitSwitchTest = () => {
      console.log('lunched test routine');
      //ui - color of test buttons is changed
      let switchButtons = {...this.state.limitSwitchTestButtons};
      switchButtons[0].bgColor = limitSwitchButtonIsOn;
      this.setState({switchButtons});
      
      let leftSwitchesLeds = [...this.state.leftSwitchesArr];
      let rightSwitchesLeds = [...this.state.rightSwitchesArr];

      // here should be a promise that will fetch the led switches status 
      console.log('here should be a microapi function that return a promise from the server - so for now its hard coded fake res leds');
      let fakeRes = ["1","1","0","1","0"];
      this.updateLimitSwitchStatus(fakeRes, rightSwitchesLeds, leftSwitchesLeds) ;
      
      //AFTER 30 Seconds - Test routine is over and everything is reverted.
      setTimeout(() => {
          //revert button to be gray
          switchButtons[0].bgColor = defaultLimitSwitchButton;
          this.setState({switchButtons});
          //revert leds to be all gray for loop
          var i;
          var j;
          for (i = 0; i < leftSwitchesLeds.length; i++) {
                  leftSwitchesLeds[i].limitSwitchStatus = "2";
                  this.setState({leftSwitchesLeds});
               for(j = 0; j< rightSwitchesLeds.length; j++){
                  rightSwitchesLeds[i].limitSwitchStatus = "2";
                  this.setState({rightSwitchesLeds});
               }
          }
          console.log('lunch test routin ended after 30 seconds ');
        }, 5000);
    }


    updateLimitSwitchStatus = (fakeRes, rightSwitchesLeds, leftSwitchesLeds) => {
      rightSwitchesLeds[1].limitSwitchStatus = fakeRes[2];
      leftSwitchesLeds[3].limitSwitchStatus = fakeRes[3];
      this.setState({leftSwitchesLeds}); 
      this.setState({rightSwitchesLeds});
    }

   


    queueReset = () => {
      if (this.state.startConnection != this.state.stopConnection) {
          console.log('queue connections');        
          this.state.stopConnection = this.state.startConnection + 1; 
          //change back also microAPi
         let stop = this.state.stopConnection;
          MicroApi.updateConnection(stop).then(res =>{
          });
       } else {
        console.log('there are no queing connections');
        this.state.startConnection = this.state.stopConnection;
       }
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

     elevatorUp = () => {
       console.log('im elevator up ror-elvator-1000')
       MicroApi.elevatorUp().then(res =>{
        console.log(res);
      });
     }
     elevatorDown = () => {
      console.log('im elevator down rol-elvator-1000')
      MicroApi.elevatorDown().then(res =>{
        console.log(res);
      });
    }

    elevatorStop = () => {
      console.log('im elevator stop mst-elvator-nil')
      MicroApi.elevatorStop().then(res =>{
        console.log(res);
      });
    }

    // res returns error 

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

     downloadPics = () => {
      let jsonUrl = <a href="root/frame-www.json" download> JSON </a>;
      let ppmUrl = <a href="root/frame-www.ppm" download> PPM </a>;
      let spacer = <span style={{display:'block', height:'2px'}}></span>
      let downloadButtons = [jsonUrl, spacer, ppmUrl];
      let linkButtons = {label:downloadButtons, onClick:''};

      //swap buttons
      this.state.generalButtons[1] = linkButtons;
      this.forceUpdate();

     }
 

     // done functions
    togglePowerOff = () => {           
       let { togglePoweroffRedux } = this.props; 
       let poweroffOngoing = !this.props.poweroffOngoing; 
       togglePoweroffRedux(poweroffOngoing);
     }

    toggleReboot = () => {           
      let { toggleRebootRedux } = this.props; 
      let rebootOngoing = !this.props.rebootOngoing; 
      toggleRebootRedux(rebootOngoing);
    }

    render(){
      let {rebootOngoing, poweroffOngoing} = this.props;
      let {limitSwitchTestButtons, leftSwitchesArr, rightSwitchesArr, generalButtons, plateGripperButtons, elevButtons }  = this.state;
      
      return (
          <div>
           {
            rebootOngoing ? <RebootView reboot={this.toggleReboot} /> :
            poweroffOngoing ? <PoweroffView reboot={this.togglePowerOff}/> : 
            
            <QuickCommandsContainer>
             
              <CommandButtonsContainer>
                <ButtonsGroup btnsArr={elevButtons}></ButtonsGroup>
                <ButtonsGroup btnsArr={plateGripperButtons}></ButtonsGroup>
                <ButtonsGroup btnsArr={generalButtons}> </ButtonsGroup>
              </CommandButtonsContainer>
            
              <LedButtonsContainer>
                <ButtonsGroup btnsArr={limitSwitchTestButtons} border="none" width={limitSwitchTestButtons.width} bgColor={limitSwitchTestButtons.bgColor}></ButtonsGroup>
                <SwitchList>
                    <span> Left Switch Sensor </span>
                    <LedsGroup switchesArr={leftSwitchesArr} backgroundColor={leftSwitchesArr.limitSwitchStatus}></LedsGroup>
                </SwitchList>
                <SwitchList>
                    <span> Right Switch Sensor </span>
                    <LedsGroup switchesArr={rightSwitchesArr} backgroundColor={rightSwitchesArr.limitSwitchStatus}></LedsGroup>
                </SwitchList>
              </LedButtonsContainer>
          </QuickCommandsContainer>
         }
         </div>
        );
    }
}


const mapStateToProps = (state) => {
  let props = {
    rebootOngoing:state.rebootReducer.rebootOngoing,
    poweroffOngoing:state.rebootReducer.poweroffOngoing
    }   
    return props;
  }

  const mapDispatchToProps = (dispatch) => ({  
    toggleRebootRedux: (rebootOngoing) => dispatch(toggleRebootAction(rebootOngoing)),
    togglePoweroffRedux: (poweroffOngoing) => dispatch(togglePoweroffAction(poweroffOngoing))
  });

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (quickCommandsView)

const QuickCommandsContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-top:10px;
    justify-content:center;
    margin-left: 12.5%;
    width: 77%;
`;

const CommandButtonsContainer = styled.div`
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    margin-right: 4rem;
`;

const LedButtonsContainer = styled.div`
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    width: 50%;
    border:1px solid grey;
    border-radius: 1rem;
    padding: 10px 2px;
`;

const SwitchList = styled.div`
    display: inline-flex;
    flex-direction: column;
    color:#444444;
    font-size: 18px;
    line-height: 24px;
    font-family:Arial;
    margin: 0px 6px;
    width: 30%;
`;