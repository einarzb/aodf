import React, { Component } from 'react';
import styled from 'styled-components';
import {OButton, FormRow} from './settings/styled';
import {Heading} from 'grommet/components/Heading'

class RebootView extends Component{
    constructor(){
        super()
        this.state = {
            rebootInProgress:false,
            rebootStartTime:false
        }
    }
    confirm= ()=>{
        this.props.reboot();
        let d = new Date();
        this.setState({rebootInProgress:true, rebootStartTime:d.toDateString()})
        this.props.reboot()
    }
    render(){
        let {rebootInProgress, rebootStartTime} = this.state
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
                <OButton label={'CANCEL'} onClick={this.toggle} ></OButton>
                </ButtonsFlexer>
            }
            {
            rebootInProgress&&<Heading textAlign={'center'}>
                Reboot command sent to machine at {rebootStartTime} 
                <br/>
                <br/>
                You can refresh this page after ~ 1 minute
                </Heading>

            }

        </RebootDiv>);
    }
}
export default RebootView;

const RebootDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top:250px;
`;

const ButtonsFlexer = styled.div`
    display: flex;
    flex-direction: row;
    width: 500px;
    justify-content:space-evenly;
`;