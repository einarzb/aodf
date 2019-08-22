import React, { Component } from 'react';
import styled from 'styled-components';
import {OButton} from './styled';
import {Heading} from 'grommet/components/Heading'

class RebootView extends Component{
    constructor(){
        super()
        //init
        this.state = {
            rebootInProgress:false,
            rebootStartTime:false,
            minutes: 1,
            seconds: 0
        }   
    }
    componentDidMount() {
        this.myInterval = setInterval(() => {
          
          let { seconds, minutes } = this.state
       
          if (seconds > 0) {
            this.setState(({ seconds }) => ({
              seconds: seconds - 1
            }))
          }

          if (seconds === 0) {
            if (minutes === 0) {
              clearInterval(this.myInterval);
              window.location.reload();
            } else {
              this.setState(({ minutes }) => ({
                minutes: minutes - 1,
                seconds: 59
              }))
            }
          }
        }, 1000)
      }

    confirm = () => {        
        this.props.reboot();        
        let d = new Date();
        // maybe I should update redux cause I have reboot reducer 
        this.setState({rebootInProgress:true, rebootStartTime:d.toDateString()})
        this.props.reboot(); // why twice? 
    }

    render(){
        let { rebootInProgress, rebootStartTime, minutes, seconds } = this.state        
        return (
        <RebootDiv>
               
            { 
            !rebootInProgress&&<Heading textAlign={'center'}>
                Are you sure? 
                <br/>
                <br/>
                
            </Heading>
            }
            {
                !rebootInProgress&& <ButtonsFlexer>
                <OButton label={'CONFIRM REBOOT'} onClick={this.confirm} ></OButton>
                <OButton label={'CANCEL'} onClick={this.props.toggle} ></OButton>
                </ButtonsFlexer>
            }
            {
            rebootInProgress&&<Heading textAlign={'center'}>
                Reboot command sent to machine at {rebootStartTime} 
                <br/>
                <br/>
               Page will refresh in { minutes }:{ seconds < 10 ? `0${ seconds }` : seconds } seconds
                <br/>
                </Heading>
            }

        </RebootDiv>
        );
    }
}

export default RebootView;

const RebootDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top:0px auto;
`;

const ButtonsFlexer = styled.div`
    display: flex;
    flex-direction: row;
    width: 500px;
    justify-content:space-evenly;
`;